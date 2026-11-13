import { getRouteSeo, getSiteSeoDefaults } from '../content/seo.js';

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

export function getSeoElements(locale, routePath) {
  const page = getRouteSeo(locale, routePath);
  const site = getSiteSeoDefaults(locale);
  const meta = (key, value) => ({ tag: 'meta', attributes: { [key.includes(':') && !key.startsWith('twitter:') ? 'property' : 'name']: key, content: value } });
  return [
    { tag: 'title', text: page.title },
    meta('description', page.description), meta('author', 'Ricardo Correa'), meta('robots', page.robots),
    meta('og:type', page.ogType), meta('og:title', page.title), meta('og:description', page.description),
    ...(page.canonical ? [meta('og:url', page.canonical)] : []),
    meta('og:site_name', site.siteName), meta('og:locale', site.locale),
    ...site.localeAlternates.map((code) => meta('og:locale:alternate', code)),
    meta('og:image', page.image), meta('og:image:secure_url', page.image), meta('og:image:type', 'image/png'),
    meta('og:image:width', '1200'), meta('og:image:height', '630'), meta('og:image:alt', page.imageAlt),
    meta('twitter:card', site.twitterCard), meta('twitter:title', page.title), meta('twitter:description', page.description),
    meta('twitter:image', page.twitterImage), meta('twitter:image:alt', page.imageAlt),
    ...(page.canonical ? [{ tag: 'link', attributes: { rel: 'canonical', href: page.canonical } }, meta('twitter:url', page.canonical)] : []),
    ...page.alternates.map((alternate) => ({ tag: 'link', attributes: { rel: 'alternate', ...alternate } })),
    ...(page.structuredData ? [{ tag: 'script', attributes: { type: 'application/ld+json', id: 'vidare-structured-data', 'data-cfasync': 'false' }, text: JSON.stringify(page.structuredData).replace(/</g, '\\u003c') }] : []),
  ];
}

export function renderSeoHead(locale, routePath) {
  return getSeoElements(locale, routePath).map(({ tag, attributes = {}, text = '' }) => {
    const attrs = Object.entries({ 'data-vidare-seo': '', ...attributes }).map(([key, value]) => `${key}="${escapeHtml(value)}"`).join(' ');
    if (tag === 'meta' || tag === 'link') return `<${tag} ${attrs}>`;
    return `<${tag} ${attrs}>${tag === 'script' ? text : escapeHtml(text)}</${tag}>`;
  }).join('\n    ');
}
