import { SUPPORTED_LOCALES, localeMeta, buildLocalePath } from '../src/i18n/config.js';
import { SITE_URL, INDEXABLE_PATHS } from '../src/content/site.js';
import { getServicesHubContent } from '../src/content/servicePages.js';
import { escapeHtml } from '../src/lib/seoDocument.js';

export function buildSitemap() {
  const urls = INDEXABLE_PATHS.flatMap((path) => SUPPORTED_LOCALES.map((locale) => {
    const alternates = [...SUPPORTED_LOCALES.map((code) => ({ lang: localeMeta[code].htmlLang, href: SITE_URL + buildLocalePath(code, path) })), { lang: 'x-default', href: SITE_URL + buildLocalePath('pt', path) }];
    return `  <url>\n    <loc>${SITE_URL}${buildLocalePath(locale, path)}</loc>\n${alternates.map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${escapeHtml(alternate.href)}" />`).join('\n')}\n  </url>`;
  }));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
}
export const robots = `# Public content can be indexed by search and AI search crawlers.\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
export function buildLlms() {
  return `# Vidare — Ricardo Correa\n\n> Psicoterapia online para adultos. Ricardo Correa, psicólogo clínico, CRP 05/40839. Atendimento em português, inglês, espanhol e sueco.\n\nAbordagens apresentadas no site: EMDR, Terapia Cognitivo-Comportamental e Terapia do Esquema. Atendimento online no Brasil e na Europa.\n\n## Páginas principais\n${SUPPORTED_LOCALES.map((locale) => `- [${localeMeta[locale].nativeLabel}](${SITE_URL}/${locale})`).join('\n')}\n\n## Serviços\n${getServicesHubContent('pt').items.map((item) => `- [${item.label}](${SITE_URL}/pt${item.routePath})`).join('\n')}\n\n## Contato profissional\n- [E-mail](mailto:ricardo@vidare.eu)\n- [WhatsApp](https://wa.me/5522988583868)\n\nAs páginas do site são a fonte principal. Este arquivo não substitui avaliação clínica.\n`;
}
