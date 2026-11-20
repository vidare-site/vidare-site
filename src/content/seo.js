import { localizedContent } from './locales.js';
import { servicePages, getServicesHubContent } from './servicePages.js';
import { SITE_URL, INDEXABLE_PATHS, PAGE_PATHS } from './site.js';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  buildLocalePath,
} from '../i18n/config.js';

const DEFAULT_IMAGE = `${SITE_URL}/assets/og-home-pt.png`;
const SITE_LOGO = `${SITE_URL}/assets/logo-dark1.webp`;
const SITE_EMAIL = 'ricardo@vidare.eu';
const SITE_PHONE = '+5522988583868';
const SITE_INSTAGRAM = 'https://www.instagram.com/ricardocorrea.psi';
const ORGANIZATION_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;
const PRACTITIONER_ID = `${SITE_URL}#ricardo-correa`;
const PRACTITIONER_IMAGE = `${SITE_URL}/assets/optimized/07-640.webp`;
const PRACTITIONER_LICENSE = 'CRP 05/40839';
const localeSeoTargets = {
  pt: {
    htmlLang: 'pt-BR',
    hreflang: 'pt-BR',
    ogLocale: 'pt_BR',
  },
  en: {
    htmlLang: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
  },
  sv: {
    htmlLang: 'sv',
    hreflang: 'sv',
    ogLocale: 'sv_SE',
  },
};

const seoByLocale = {
  pt: {
    siteName: 'Vidare Psicologia Integral',
    routes: {
      '/': {
        title: 'Ricardo Correa | Psicólogo online | Vidare',
        description:
          'Ricardo Correa, psicólogo clínico (CRP 05/40839). Psicoterapia online para adultos no Brasil e na Europa: EMDR, TCC e Terapia do Esquema.',
        image: `${SITE_URL}/assets/og-home-pt.png`,
        twitterImage: `${SITE_URL}/assets/og-home-pt.png`,
        imageAlt: 'Ricardo Correa ,  Vidare Psicologia Integral',
      },
      '/blog': {
        title: 'Blog de psicologia | Ricardo Correa',
        description: 'Reflexões de Ricardo Correa sobre psicologia, ansiedade, relações, TCC, EMDR e psicoterapia online.',
        image: `${SITE_URL}/assets/og-home-pt.png`,
        twitterImage: `${SITE_URL}/assets/og-home-pt.png`,
        imageAlt: 'Vidare Psicologia Integral',
      },
      '/cadastro': {
        title: 'Cadastro para psicoterapia | Ricardo Correa',
        description:
          'Dê o primeiro passo com discrição, sigilo clínico e acolhimento. Entre em contato para iniciar seu acompanhamento com clareza e segurança.',
        image: `${SITE_URL}/assets/og-cadastro-pt.png`,
        twitterImage: `${SITE_URL}/assets/og-cadastro-pt.png`,
        imageAlt: 'Agendamento confidencial Vidare',
      },
      '/services/online-psychotherapy-adults': {
        title: 'Psicoterapia Online para Adultos | Vidare',
        description:
          'Psicoterapia online para adultos com confidencialidade e profundidade clínica. Atendimento internacional com continuidade terapêutica.',
        image: `${SITE_URL}/assets/og-home-pt.png`,
        twitterImage: `${SITE_URL}/assets/og-home-pt.png`,
        imageAlt: 'Psicoterapia online para adultos',
      },
      '/services/trauma': {
        title: 'Psicoterapia informada por trauma | Ricardo Correa',
        description:
          'Terapia para trauma com abordagem baseada em evidências. Foco em experiências dolorosas, regulação emocional e segurança interna.',
        image: `${SITE_URL}/assets/og-home-pt.png`,
        twitterImage: `${SITE_URL}/assets/og-home-pt.png`,
        imageAlt: 'Terapia para trauma',
      },
      '/services/anxiety': {
        title: 'Psicoterapia para Ansiedade | Vidare',
        description:
          'Psicoterapia para ansiedade com foco em regulação emocional, gatilhos e redução da sobrecarga interna.',
        image: `${SITE_URL}/assets/og-home-pt.png`,
        twitterImage: `${SITE_URL}/assets/og-home-pt.png`,
        imageAlt: 'Psicoterapia para ansiedade',
      },
      '/services/burnout': {
        title: 'Terapia Online para Burnout | Vidare',
        description:
          'Terapia online para burnout e exaustão emocional. Reorganize limites, reduza sobrecarga e recupere energia de forma sustentável.',
        image: `${SITE_URL}/assets/og-home-pt.png`,
        twitterImage: `${SITE_URL}/assets/og-home-pt.png`,
        imageAlt: 'Terapia online para burnout',
      },
      '/services/emdr': {
        title: 'EMDR para Trauma Relacional | Vidare',
        description:
          'EMDR para trauma relacional e experiências dolorosas. Método estruturado e baseado em evidências para processamento de memórias.',
        image: `${SITE_URL}/assets/og-home-pt.png`,
        twitterImage: `${SITE_URL}/assets/og-home-pt.png`,
        imageAlt: 'EMDR para trauma relacional',
      },
      '/services/schema-therapy': {
        title: 'Terapia do Esquema | Padrões Emocionais Repetitivos | Vidare',
        description:
          'Terapia do Esquema para padrões que se repetem em relacionamentos e autoestima. Trabalho clínico profundo e personalizado.',
        image: `${SITE_URL}/assets/og-home-pt.png`,
        twitterImage: `${SITE_URL}/assets/og-home-pt.png`,
        imageAlt: 'Terapia do Esquema',
      },
    },
    knowsAbout: [
      'EMDR',
      'Psicoterapia informada por trauma',
      'Trauma',
      'Psicoterapia online',
      'Terapia do Esquema',
      'Terapia Cognitivo-Comportamental',
      'Terapia de Aceitação e Compromisso',
    ],
    areaServed: ['Brasil', 'Suécia', 'Europa', 'Atendimento Online'],
  },
  en: {
    siteName: 'Vidare Psicologia Integral',
    routes: {
      '/': {
        title: 'Ricardo Correa | Online Psychologist | Vidare',
        description:
          'Ricardo Correa, clinical psychologist (CRP 05/40839). Online psychotherapy for adults in Brazil and Europe, with EMDR, CBT and Schema Therapy.',
        image: `${SITE_URL}/assets/og-home-en.png`,
        twitterImage: `${SITE_URL}/assets/og-home-en.png`,
        imageAlt: 'Ricardo Correa ,  Vidare Psicologia Integral',
      },
      '/blog': {
        title: 'Psychology blog | Ricardo Correa',
        description: 'Reflections by Ricardo Correa on psychology, anxiety, relationships, CBT, EMDR and online psychotherapy.',
        image: `${SITE_URL}/assets/og-home-en.png`,
        twitterImage: `${SITE_URL}/assets/og-home-en.png`,
        imageAlt: 'Vidare Psicologia Integral',
      },
      '/cadastro': {
        title: 'Psychotherapy intake form | Ricardo Correa',
        description:
          'Confidential online psychotherapy for adults. Get in touch to begin with clinical clarity, discretion, and care.',
        image: `${SITE_URL}/assets/og-cadastro-en.png`,
        twitterImage: `${SITE_URL}/assets/og-cadastro-en.png`,
        imageAlt: 'Vidare Psicologia Integral intake form',
      },
      '/services/online-psychotherapy-adults': {
        title: 'Online Psychotherapy for Adults | Vidare',
        description:
          'Confidential online psychotherapy for adults with clinical depth, consistency, and international continuity.',
        image: `${SITE_URL}/assets/og-home-en.png`,
        twitterImage: `${SITE_URL}/assets/og-home-en.png`,
        imageAlt: 'Online psychotherapy for adults',
      },
      '/services/trauma': {
        title: 'Therapy for Trauma | Trauma-Informed Psychotherapy | Vidare',
        description:
          'Therapy for trauma focused on emotional regulation, memory processing, and restoring internal safety with evidence-based care.',
        image: `${SITE_URL}/assets/og-home-en.png`,
        twitterImage: `${SITE_URL}/assets/og-home-en.png`,
        imageAlt: 'Therapy for trauma',
      },
      '/services/anxiety': {
        title: 'Psychotherapy for Anxiety | Vidare',
        description:
          'Psychotherapy for anxiety to reduce overactivation, understand triggers, and regain emotional steadiness.',
        image: `${SITE_URL}/assets/og-home-en.png`,
        twitterImage: `${SITE_URL}/assets/og-home-en.png`,
        imageAlt: 'Psychotherapy for anxiety',
      },
      '/services/burnout': {
        title: 'Online Therapy for Burnout | Vidare',
        description:
          'Online therapy for burnout and chronic exhaustion. Rebuild energy, boundaries, and sustainable emotional regulation.',
        image: `${SITE_URL}/assets/og-home-en.png`,
        twitterImage: `${SITE_URL}/assets/og-home-en.png`,
        imageAlt: 'Online therapy for burnout',
      },
      '/services/emdr': {
        title: 'EMDR for Relational Trauma | Vidare',
        description:
          'EMDR for relational trauma and distressing experiences, integrated into a personalized and evidence-based clinical plan.',
        image: `${SITE_URL}/assets/og-home-en.png`,
        twitterImage: `${SITE_URL}/assets/og-home-en.png`,
        imageAlt: 'EMDR for relational trauma',
      },
      '/services/schema-therapy': {
        title: 'Schema Therapy for Repeating Patterns | Vidare',
        description:
          'Schema Therapy for long-standing emotional and relational patterns, with personalized clinical depth and clarity.',
        image: `${SITE_URL}/assets/og-home-en.png`,
        twitterImage: `${SITE_URL}/assets/og-home-en.png`,
        imageAlt: 'Schema Therapy',
      },
    },
    knowsAbout: [
      'EMDR',
      'Trauma-informed psychotherapy',
      'Trauma',
      'Online psychotherapy',
      'Schema Therapy',
      'Cognitive Behavioral Therapy',
      'Acceptance and Commitment Therapy',
    ],
    areaServed: ['Brazil', 'Sweden', 'Europe', 'Online care'],
  },
  sv: {
    siteName: 'Vidare Psicologia Integral',
    routes: {
      '/': {
        title: 'Ricardo Correa | Psykolog online | Vidare',
        description:
          'Ricardo Correa, klinisk psykolog (CRP 05/40839). Onlineterapi för vuxna i Brasilien och Europa med EMDR, KBT och schematerapi.',
        image: `${SITE_URL}/assets/og-home-sv.png`,
        twitterImage: `${SITE_URL}/assets/og-home-sv.png`,
        imageAlt: 'Ricardo Correa ,  Vidare Psicologia Integral',
      },
      '/blog': {
        title: 'Psykologiblogg | Ricardo Correa',
        description: 'Reflektioner av Ricardo Correa om psykologi, ångest, relationer, KBT, EMDR och onlineterapi.',
        image: `${SITE_URL}/assets/og-home-sv.png`,
        twitterImage: `${SITE_URL}/assets/og-home-sv.png`,
        imageAlt: 'Vidare Psicologia Integral',
      },
      '/cadastro': {
        title: 'Boka ett första samtal | Vidare',
        description:
          'Onlineterapi för vuxna med sekretess, klinisk tydlighet och trygghet. Hör av dig för att komma igång.',
        image: `${SITE_URL}/assets/og-cadastro-sv.png`,
        twitterImage: `${SITE_URL}/assets/og-cadastro-sv.png`,
        imageAlt: 'Vidares inskrivningsformulär',
      },
      '/services/online-psychotherapy-adults': {
        title: 'Onlineterapi för vuxna | Vidare',
        description:
          'Onlineterapi för vuxna med klinisk tydlighet, sekretess och kontinuitet över länder och tidszoner.',
        image: `${SITE_URL}/assets/og-home-sv.png`,
        twitterImage: `${SITE_URL}/assets/og-home-sv.png`,
        imageAlt: 'Onlineterapi för vuxna',
      },
      '/services/trauma': {
        title: 'Terapi vid Trauma | Traumainformerad Psykoterapi | Vidare',
        description:
          'Terapi vid trauma med fokus på reglering, bearbetning av svåra erfarenheter och ökad inre trygghet.',
        image: `${SITE_URL}/assets/og-home-sv.png`,
        twitterImage: `${SITE_URL}/assets/og-home-sv.png`,
        imageAlt: 'Terapi vid trauma',
      },
      '/services/anxiety': {
        title: 'Psykoterapi vid Ångest | Vidare',
        description:
          'Psykoterapi vid ångest för att minska överaktivering, förstå triggers och återfå känslomässig balans.',
        image: `${SITE_URL}/assets/og-home-sv.png`,
        twitterImage: `${SITE_URL}/assets/og-home-sv.png`,
        imageAlt: 'Psykoterapi vid ångest',
      },
      '/services/burnout': {
        title: 'Onlineterapi vid Burnout | Vidare',
        description:
          'Onlineterapi vid burnout och långvarig utmattning med fokus på återhämtning, gränser och hållbar belastning.',
        image: `${SITE_URL}/assets/og-home-sv.png`,
        twitterImage: `${SITE_URL}/assets/og-home-sv.png`,
        imageAlt: 'Onlineterapi vid burnout',
      },
      '/services/emdr': {
        title: 'EMDR vid Relationstrauma | Vidare',
        description:
          'EMDR vid relationstrauma och smärtsamma minnen inom en personligt anpassad, evidensbaserad behandlingsplan.',
        image: `${SITE_URL}/assets/og-home-sv.png`,
        twitterImage: `${SITE_URL}/assets/og-home-sv.png`,
        imageAlt: 'EMDR vid relationstrauma',
      },
      '/services/schema-therapy': {
        title: 'Schematerapi för Upprepade Mönster | Vidare',
        description:
          'Schematerapi för långvariga känslomässiga och relationella mönster som återkommer.',
        image: `${SITE_URL}/assets/og-home-sv.png`,
        twitterImage: `${SITE_URL}/assets/og-home-sv.png`,
        imageAlt: 'Schematerapi',
      },
    },
    knowsAbout: [
      'EMDR',
      'Traumainformerad psykoterapi',
      'Trauma',
      'Onlineterapi',
      'Schematerapi',
      'Kognitiv beteendeterapi',
      'Acceptance and Commitment Therapy',
    ],
    areaServed: ['Brasilien', 'Sverige', 'Europa', 'Onlinebehandling'],
  },
};

const absoluteUrl = (locale, path = '/') => `${SITE_URL}${buildLocalePath(locale, path)}`;
const localeMetaFor = (locale) => localeSeoTargets[locale] || localeSeoTargets.pt;
const languages = SUPPORTED_LOCALES.map((code) => localeMetaFor(code).htmlLang);

export const getSiteSeoDefaults = (locale = DEFAULT_LOCALE) => ({
  siteName: (seoByLocale[locale] || seoByLocale.pt).siteName,
  locale: localeMetaFor(locale).ogLocale,
  localeAlternates: SUPPORTED_LOCALES.filter((code) => code !== locale).map((code) => localeMetaFor(code).ogLocale),
  twitterCard: 'summary_large_image',
});

function buildStructuredData(locale, path, page) {
  const home = absoluteUrl(locale);
  const hub = getServicesHubContent(locale);
  const person = {
    '@type': 'Person', '@id': PRACTITIONER_ID,
    name: 'Ricardo Correa', url: home, image: PRACTITIONER_IMAGE,
    jobTitle: { pt: 'Psicólogo clínico', en: 'Clinical psychologist', sv: 'Klinisk psykolog' }[locale],
    worksFor: { '@id': ORGANIZATION_ID },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional license',
      name: PRACTITIONER_LICENSE, identifier: PRACTITIONER_LICENSE,
      recognizedBy: { '@type': 'Organization', name: 'Conselho Regional de Psicologia' },
    },
    knowsLanguage: languages,
    knowsAbout: seoByLocale[locale].knowsAbout,
    sameAs: [SITE_INSTAGRAM],
  };
  const business = {
    '@type': 'ProfessionalService', '@id': ORGANIZATION_ID,
    name: seoByLocale[locale].siteName, url: home,
    logo: SITE_LOGO, image: PRACTITIONER_IMAGE,
    description: seoByLocale[locale].routes['/'].description,
    email: SITE_EMAIL, telephone: SITE_PHONE,
    areaServed: [{ '@type': 'Country', name: 'Brazil' }, { '@type': 'Country', name: 'Sweden' }, { '@type': 'Continent', name: 'Europe' }],
    founder: { '@id': PRACTITIONER_ID }, sameAs: [SITE_INSTAGRAM],
    contactPoint: {
      '@type': 'ContactPoint', contactType: 'Appointment enquiries',
      email: SITE_EMAIL, telephone: SITE_PHONE,
      url: 'https://wa.me/5522988583868', availableLanguage: languages,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog', name: hub.title,
      itemListElement: hub.items.map((item) => ({
        '@type': 'Offer', itemOffered: { '@id': `${absoluteUrl(locale, item.routePath)}#service` },
      })),
    },
  };
  const services = hub.items.map((item) => ({
    '@type': 'Service', '@id': `${absoluteUrl(locale, item.routePath)}#service`,
    name: item.label, description: item.description, url: absoluteUrl(locale, item.routePath),
    provider: { '@id': ORGANIZATION_ID }, areaServed: business.areaServed,
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: absoluteUrl(locale, item.routePath), availableLanguage: languages },
  }));
  const breadcrumb = {
    '@type': 'BreadcrumbList', '@id': `${page.canonical}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: seoByLocale[locale].siteName, item: home },
      ...(path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: page.title.split(' | ')[0], item: page.canonical }]),
    ],
  };
  const webpage = {
    '@type': 'WebPage', '@id': `${page.canonical}#webpage`,
    url: page.canonical, name: page.title, description: page.description,
    inLanguage: localeMetaFor(locale).htmlLang,
    isPartOf: { '@id': WEBSITE_ID }, about: { '@id': PRACTITIONER_ID },
    author: { '@id': PRACTITIONER_ID }, breadcrumb: { '@id': breadcrumb['@id'] },
    ...(path.startsWith('/services/') ? { mainEntity: { '@id': `${page.canonical}#service` } } : {}),
  };
  const graph = [
    person, business,
    { '@type': 'WebSite', '@id': WEBSITE_ID, url: SITE_URL, name: seoByLocale[locale].siteName, publisher: { '@id': ORGANIZATION_ID }, inLanguage: languages },
    breadcrumb, webpage, ...services,
  ];
  if (path === '/') {
    const faqs = [...localizedContent[locale].faq.items, {
      question: hub.title,
      answer: `${hub.description} ${hub.items.map((item) => `${item.label} ,  ${item.description}`).join(' ')}`,
    }];
    graph.push({
      '@type': 'FAQPage', '@id': `${home}#faq`,
      mainEntity: faqs.map((item) => ({
        '@type': 'Question', name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }
  if (path.startsWith('/services/')) {
    const article = servicePages[locale].services[path.slice('/services/'.length)];
    graph.push({
      '@type': 'FAQPage', '@id': page.canonical + '#faq',
      mainEntity: article.faqs.map(([question, answer]) => ({
        '@type': 'Question', name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

const missingPage = {
  pt: ['Página não encontrada | Vidare', 'O endereço solicitado não existe. Acesse as páginas da Vidare.'],
  en: ['Page not found | Vidare', 'The requested address does not exist. Visit the Vidare website.'],
  sv: ['Sidan hittades inte | Vidare', 'Adressen finns inte. Besök Vidares webbplats.'],
};

export const getRouteSeo = (locale = DEFAULT_LOCALE, routePath = '/') => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const article = routePath.startsWith('/services/') ? servicePages[safeLocale].services[routePath.slice('/services/'.length)] : null;
  const route = article ? {
    title: article.seoTitle || article.label + ' | Vidare',
    description: article.description,
    image: SITE_URL + '/assets/og-home-' + safeLocale + '.png',
    imageAlt: article.label,
  } : seoByLocale[safeLocale].routes[routePath];
  if (!PAGE_PATHS.includes(routePath) || !route) return {
    title: missingPage[safeLocale][0], description: missingPage[safeLocale][1],
    robots: 'noindex, follow', canonical: null, alternates: [], structuredData: null,
    image: DEFAULT_IMAGE, twitterImage: DEFAULT_IMAGE, imageAlt: 'Vidare', ogType: 'website',
  };
  const page = {
    ...route,
    robots: INDEXABLE_PATHS.includes(routePath) ? 'index, follow' : 'noindex, follow',
    canonical: absoluteUrl(safeLocale, routePath), ogType: 'website',
    image: route.image || DEFAULT_IMAGE, twitterImage: route.twitterImage || route.image || DEFAULT_IMAGE,
    alternates: [
      ...SUPPORTED_LOCALES.map((code) => ({ hreflang: localeMetaFor(code).hreflang, href: absoluteUrl(code, routePath) })),
      { hreflang: 'x-default', href: absoluteUrl(DEFAULT_LOCALE, routePath) },
    ],
  };
  return { ...page, structuredData: buildStructuredData(safeLocale, routePath, page) };
};
