import { DEFAULT_LOCALE } from '../i18n/config.js';
import pt from './articles/pt.json' with { type: 'json' };
import en from './articles/en.json' with { type: 'json' };
import sv from './articles/sv.json' with { type: 'json' };

export const SERVICE_ROUTE_PATHS = {
  ONLINE_PSYCHOTHERAPY_ADULTS: '/services/online-psychotherapy-adults',
  TRAUMA: '/services/trauma',
  ANXIETY: '/services/anxiety',
  BURNOUT: '/services/burnout',
  EMDR: '/services/emdr',
  SCHEMA_THERAPY: '/services/schema-therapy',
  EMDR_SCHEMA_THERAPY: '/services/emdr-schema-therapy',
};
const copy = {
  pt: { title: 'Temas clínicos frequentes', description: 'Conheça os temas e as possibilidades de acompanhamento, que dependem de avaliação individual.', ctaLabel: 'Ver página completa', faqTitle: 'Perguntas frequentes', ctaTitle: 'Se fizer sentido para você, podemos conversar.', ctaBody: 'O contato inicial permite esclarecer sua demanda e conhecer o funcionamento do atendimento.', contactLabel: 'Conversar pelo WhatsApp' },
  en: { title: 'Clinical themes', description: 'Explore themes and possibilities for care, which depend on individual assessment.', ctaLabel: 'View full page', faqTitle: 'Frequently asked questions', ctaTitle: 'If this feels relevant, we can talk.', ctaBody: 'Initial contact offers a chance to clarify your concerns and learn how care works.', contactLabel: 'Talk via WhatsApp' },
  sv: { title: 'Kliniska teman', description: 'Läs om teman och möjliga arbetssätt, som utgår från individuell bedömning.', ctaLabel: 'Läs hela sidan', faqTitle: 'Vanliga frågor', ctaTitle: 'Om det känns relevant kan vi prata.', ctaBody: 'En första kontakt ger möjlighet att beskriva dina behov och förstå hur kontakten fungerar.', contactLabel: 'Samtala via WhatsApp' },
};
export const servicePages = Object.fromEntries(Object.entries({ pt, en, sv }).map(([locale, services]) => [locale, { hub: copy[locale], services }]));
export const isServiceSlug = (slug) => Object.values(SERVICE_ROUTE_PATHS).includes(`/services/${slug}`);
export const getServiceAnchorId = (slug) => `servico-${slug}`;
export const getServiceContent = (locale, slug) => (servicePages[locale] || servicePages[DEFAULT_LOCALE]).services[slug] ?? null;
export const getServicesHubContent = (locale) => {
  const { hub, services } = servicePages[locale] || servicePages[DEFAULT_LOCALE];
  return { ...hub, items: Object.entries(services).map(([slug, item]) => ({ slug, anchorId: getServiceAnchorId(slug), label: item.label, description: item.description, routePath: `/services/${slug}` })) };
};
