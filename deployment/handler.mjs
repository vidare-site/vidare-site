/* Shared by the Cloudflare Pages worker and the local production preview. */
export function createHandler({ pages, origin = 'https://vidare.eu' }) {
  const knownPages = new Set(pages);
  const redirects = new Map([['/', '/pt'], ['/index.html', '/pt'], ['/cadastro', '/pt/cadastro'], ['/cadastro.html', '/pt/cadastro'], ['/blog', '/pt/blog']]);
  for (const page of pages.filter((path) => path.startsWith('/pt/services/'))) redirects.set(page.slice(3), page);
  const addHeaders = (response, pathname, status = response.status) => {
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    headers.set('Referrer-Policy', pathname.endsWith('/cadastro') ? 'no-referrer' : 'strict-origin-when-cross-origin');
    if (pathname.endsWith('/cadastro') || status === 404) {
      headers.set('X-Robots-Tag', 'noindex, follow');
      headers.set('Cache-Control', 'no-store');
    } else if (/\/assets\/.+-[A-Za-z0-9_-]{8,}\.(js|css)$/.test(pathname)) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (pathname === '/analytics.js') {
      headers.set('Cache-Control', 'no-store');
    } else if (/\.(js|css|webp|png|mp4|svg|ico)$/.test(pathname)) {
      headers.set('Cache-Control', 'public, max-age=86400, must-revalidate');
    } else if (headers.get('content-type')?.includes('text/html')) {
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }
    return new Response(response.body, { status, headers });
  };
  const asset = async (request, env, pathname) => {
    let url = new URL(request.url);
    url.pathname = pathname;
    // Pages may normalize /pt/index.html or /pt/ internally. Keep the public URL stable.
    for (let hop = 0; hop < 4; hop++) {
      const response = await env.ASSETS.fetch(new Request(url, request));
      const location = response.headers.get('location');
      if (![301, 302, 307, 308].includes(response.status) || !location) return response;
      const next = new URL(location, url);
      if (next.origin !== url.origin) return response;
      url = next;
    }
    return new Response('Asset routing error', { status: 500 });
  };
  return {
    async fetch(request, env) {
      const url = new URL(request.url);
      const primary = new URL(origin);
      let normalized = url.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/';
      normalized = redirects.get(normalized) || normalized;
      const productionHost = [primary.hostname, `www.${primary.hostname}`].includes(url.hostname);
      if ((productionHost && (url.hostname !== primary.hostname || url.protocol !== 'https:')) ||
          (knownPages.has(normalized) && url.pathname !== normalized)) {
        const target = new URL(request.url);
        if (productionHost) { target.protocol = 'https:'; target.hostname = primary.hostname; target.port = ''; }
        target.pathname = normalized;
        return new Response(null, { status: 301, headers: { Location: target.href } });
      }
      if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
      if (knownPages.has(url.pathname)) {
        const response = await asset(request, env, url.pathname);
        return addHeaders(response, url.pathname);
      }
      const isPublicAsset = !url.pathname.startsWith('/.') && !/^\/(server|_worker\.js|_routes\.json|_headers|_redirects)(\/|$)/.test(url.pathname) && /\.[a-z0-9]+$/i.test(url.pathname) && !/\.html$/i.test(url.pathname);
      if (isPublicAsset) {
        const response = await asset(request, env, url.pathname);
        if (response.status !== 404) return addHeaders(response, url.pathname);
      }
      const response = await asset(request, env, '/404.html');
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'text/html; charset=utf-8');
      return addHeaders(new Response(response.body, { status: 404, headers }), url.pathname, 404);
    },
  };
}
