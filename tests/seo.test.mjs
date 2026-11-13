import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createHandler } from '../deployment/handler.mjs';
import { PAGE_URLS, SITE_URL } from '../src/content/site.js';

const app = createHandler({ pages: PAGE_URLS, origin: SITE_URL });
const env = { ASSETS: { fetch: async (req) => {
  const path = new URL(req.url).pathname;
  return new Response(path === '/404.html' ? '<h1>Página não encontrada</h1>' : '<h1>Conteúdo estático</h1>', { headers: { 'content-type': 'text/html' } });
} } };

test('www, HTTPS, root, legacy routes and trailing slashes use permanent redirects with query parameters intact', async () => {
  const cases = [
    ['https://www.vidare.eu/pt?source=example', 'https://vidare.eu/pt?source=example'],
    ['http://vidare.eu/pt/services/emdr', 'https://vidare.eu/pt/services/emdr'],
    ['https://vidare.eu/', 'https://vidare.eu/pt'],
    ['https://vidare.eu/en/', 'https://vidare.eu/en'],
    ['https://vidare.eu/sv/index.html', 'https://vidare.eu/sv'],
    ['https://vidare.eu/services/emdr', 'https://vidare.eu/pt/services/emdr'],
  ];
  for (const [source, target] of cases) {
    const response = await app.fetch(new Request(source), env);
    assert.equal(response.status, 301); assert.equal(response.headers.get('location'), target);
  }
});
test('every real page returns HTML and missing pages/assets return 404 instead of the home page', async () => {
  for (const path of PAGE_URLS) assert.equal((await app.fetch(new Request(SITE_URL + path), env)).status, 200);
  const missingEnv = { ASSETS: { fetch: async (req) => new URL(req.url).pathname === '/404.html' ? new Response('<h1>404</h1>') : new Response('Missing', { status: 404 }) } };
  for (const path of ['/missing', '/pt/missing', '/pt/services/missing', '/fr', '/server/entry-server.js', '/assets/missing.js', '/_worker.js']) {
    const response = await app.fetch(new Request(SITE_URL + path), missingEnv);
    assert.equal(response.status, 404, path); assert.match(await response.text(), /404/);
  }
});
test('intake responses are not cached or indexed; preview host is kept on localhost', async () => {
  const response = await app.fetch(new Request('http://localhost/pt/cadastro'), env);
  assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, follow');
  assert.equal(response.headers.get('referrer-policy'), 'no-referrer');
});
test('asset normalization by Cloudflare is followed internally without creating redirect loops', async () => {
  const response = await app.fetch(new Request(SITE_URL + '/pt'), { ASSETS: { fetch: async (req) => new URL(req.url).pathname === '/pt' ? new Response(null, { status: 301, headers: { location: '/pt/' } }) : new Response('<h1>OK</h1>') } });
  assert.equal(response.status, 200); assert.match(await response.text(), /OK/);
});

function analytics(path = '/pt', saved = null) {
  const storage = new Map(saved ? [['vidareConsentV2', JSON.stringify(saved)]] : []);
  const scripts = [], events = {}, erased = [];
  const document = { head: { appendChild: (s) => scripts.push(s) }, createElement: () => ({ setAttribute() {} }), addEventListener: (name, fn) => { events[name] = fn; } };
  Object.defineProperty(document, 'cookie', { get: () => '_ga=example; _ga_7QMVYD805R=example', set: (value) => erased.push(value) });
  const window = { dispatchEvent() {} };
  const context = vm.createContext({ window, document, location: { hostname: 'vidare.eu', pathname: path }, localStorage: { getItem: (key) => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) }, CustomEvent: class {}, Event: class {} });
  vm.runInContext(fs.readFileSync('public/analytics.js', 'utf8'), context);
  return { window, scripts, events, storage, erased };
}
test('no analytics script or events before opt-in, on rejection, or with expired consent', () => {
  for (const saved of [null, { version: 2, choice: 'reject', expires: Date.now() + 99999 }, { version: 2, choice: 'accept', expires: Date.now() - 1 }]) {
    const state = analytics('/pt', saved);
    state.window.__vidareTrack('whatsapp_click');
    assert.equal(state.scripts.length, 0); assert.equal(state.window.dataLayer.length, 0);
  }
});
test('accepted contact events have only allowlisted fields; advertising remains off; withdrawal stops future events', () => {
  const state = analytics();
  state.window.__vidareConsent.update('granted');
  assert.equal(state.scripts.length, 1);
  state.window.__vidareTrack('whatsapp_click');
  state.window.__vidareTrack('arbitrary_event');
  const contact = state.window.dataLayer.filter((item) => item[0] === 'event');
  assert.equal(contact.length, 1);
  assert.deepEqual(Object.keys(contact[0][2]).sort(), ['contact_method', 'page_location', 'page_referrer', 'page_title', 'send_to']);
  assert.equal(contact[0][2].page_location, 'https://vidare.eu/');
  assert.equal(state.window.dataLayer[0][2].ad_storage, 'denied');
  state.window.__vidareConsent.update('denied');
  const count = state.window.dataLayer.length;
  state.window.__vidareTrack('email_click');
  assert.equal(state.window.dataLayer.length, count); assert.ok(state.erased.length > 0);
});
test('clinical intake never loads analytics even with saved acceptance', () => {
  const state = analytics('/pt/cadastro', { version: 2, choice: 'accept', expires: Date.now() + 99999 });
  state.window.__vidareConsent.update('granted'); state.window.__vidareTrack('contact_form_success');
  assert.equal(state.scripts.length, 0); assert.equal(state.window.dataLayer.length, 0);
});

test('the generated production Worker serves real built HTML and a 404 response from the delivered files', async () => {
  const production = (await import('../dist/_worker.js')).default;
  const realAssets = { ASSETS: { fetch: async (request) => {
    const pathname = new URL(request.url).pathname;
    let file = `dist${pathname}`;
    if (PAGE_URLS.includes(pathname)) file += '/index.html';
    try { return new Response(fs.readFileSync(file), { headers: { 'content-type': 'text/html' } }); }
    catch { return new Response('Missing', { status: 404 }); }
  } } };
  for (const path of ['/pt', '/en/services/emdr', '/es/cadastro']) {
    const response = await production.fetch(new Request(SITE_URL + path), realAssets);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, /Ricardo Correa/);
  }
  const missing = await production.fetch(new Request(SITE_URL + '/pagina-inexistente'), realAssets);
  assert.equal(missing.status, 404); assert.match(await missing.text(), /Página não encontrada/);
});
