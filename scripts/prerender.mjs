import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { PAGE_PATHS, PAGE_URLS, SITE_URL } from '../src/content/site.js';
import { SUPPORTED_LOCALES, buildLocalePath, localeMeta } from '../src/i18n/config.js';
import { renderSeoHead } from '../src/lib/seoDocument.js';
import { buildSitemap, robots, buildLlms } from './discovery.mjs';
import { createHandler } from '../deployment/handler.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = path.join(root, 'dist');
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--seo:start-->') || !template.includes('<div id="root"></div>')) throw new Error('HTML build markers are missing; refusing to publish an empty page.');
const server = await import(pathToFileURL(path.join(dist, 'server/entry-server.js')).href);

function documentFor(locale, routePath, markup) {
  let html = template
    .replace(/<html lang="[^"]+">/, `<html lang="${localeMeta[locale].htmlLang}">`)
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, renderSeoHead(locale, routePath))
    .replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`)
    .replace(/<script\b(?![^>]*data-cfasync)/g, '<script data-cfasync="false"');
  if (routePath === '/cadastro' || routePath === '/404') html = html.replace(/\s*<script[^>]*src="\/analytics\.js"[^>]*><\/script>/, '');
  if (routePath === '/404') html = html.replace(/<script[^>]*type="module"[^>]*><\/script>/g, '').replace(/<link[^>]*rel="modulepreload"[^>]*>/g, '');
  if (routePath === '/') html = html.replace('</head>', '<link rel="preload" as="image" href="/assets/optimized/hero-mobile.webp" media="(max-width: 767px)">\n<link rel="preload" as="image" href="/assets/optimized/hero-desktop.webp" media="(min-width: 768px)">\n</head>');
  if (!markup.includes('<h1')) throw new Error(`No H1: ${locale}${routePath}`);
  return html;
}
for (const locale of SUPPORTED_LOCALES) {
  for (const routePath of PAGE_PATHS) {
    const url = buildLocalePath(locale, routePath);
    const html = documentFor(locale, routePath, server.render(url));
    const directory = path.join(dist, url);
    await fs.mkdir(directory, { recursive: true });
    await fs.writeFile(path.join(directory, 'index.html'), html);
    if (url === '/pt') await fs.writeFile(path.join(dist, 'index.html'), html);
  }
}
// A top-level 404.html also disables Cloudflare Pages' automatic SPA fallback.
await fs.writeFile(path.join(dist, '404.html'), documentFor('pt', '/404', server.render('/pt/404')));
await fs.writeFile(path.join(dist, 'sitemap.xml'), buildSitemap());
await fs.writeFile(path.join(dist, 'robots.txt'), robots);
await fs.writeFile(path.join(dist, 'llms.txt'), buildLlms());
await fs.writeFile(path.join(dist, '_worker.js'), `// Generated; edit deployment/handler.mjs instead.\n${createHandler.toString()}\nexport default createHandler(${JSON.stringify({ pages: PAGE_URLS, origin: SITE_URL })});\n`);
await fs.writeFile(path.join(dist, '_routes.json'), JSON.stringify({ version: 1, include: ['/*'], exclude: [] }, null, 2));
// These files are build inputs, never public assets.
await fs.rm(path.join(dist, 'server'), { recursive: true, force: true });
for (const name of ['videohorizontal-original.mp4', 'videovertical-original.mp4']) await fs.rm(path.join(dist, 'assets', name), { force: true });
console.log(`Prerender: ${PAGE_URLS.length} pages + root HTML + 404. Sitemap: ${SUPPORTED_LOCALES.length * (PAGE_PATHS.length - 1)} URLs.`);
