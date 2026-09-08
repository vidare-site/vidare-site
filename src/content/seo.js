import { localizedContent } from './locales';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  buildLocalePath,
  localeMeta,
} from '../i18n/config';

const SITE_URL = 'https://www.vidare.eu';
const DEFAULT_IMAGE = `${SITE_URL}/assets/600.webp`;
const SITE_LOGO = `${SITE_URL}/assets/logo-dark1.webp`;
const SITE_EMAIL = 'ricardo@vidare.eu';
const SITE_PHONE = '+5522988583868';
const SITE_PHONE_SV = '+46721524084';
const SITE_INSTAGRAM = 'https://www.instagram.com/ricardocorrea.psi';
const ORGANIZATION_ID = `${SITE_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}#website`;
const PERSON_ID = `${SITE_URL}#ricardo-correa`;
const SERVICE_ID = `${SITE_URL}#online-psychotherapy`;
const SITE_FOUNDER = 'Ricardo Correa';
const SITE_PROFESSION = 'Clinical psychologist';
const PROFESSIONAL_REGISTRATION = 'CRP 05/40839';
const PRACTICE_START_YEAR = '2008';
const CREDENTIALS = [
  'EMDRIA and EMDR Europe certification',
  'ISST international certification in Schema Therapy',
  'Training by Beck Institute',
];
const SITE_SAME_AS = [SITE_INSTAGRAM];
const AVAILABLE_LANGUAGES = ['pt-BR', 'en', 'es', 'sv-SE'];

const seoByLocale = {
  pt: {
    siteName: 'Vidare Psicologia Integral',
    routes: {
      '/': {
        title: 'Ricardo Correa, Psicólogo Clínico | Psicoterapia online (TCC e EMDR)',
        description:
          'Ricardo Correa, psicólogo clínico (CRP 05/40839). Psicoterapia online (TCC, EMDR e Esquemas) para ansiedade, depressão, trauma e autoconhecimento. Atendimento para pacientes no Brasil e expatriados na Europa.',
        imageAlt: 'Vidare Psicologia Integral',
        keywords: 'psicoterapia online, psicólogo online brasil, terapia online brasil, tcc, terapia cognitivo comportamental, ansiedade, depressão, autoconhecimento, psicólogo brasileiro na europa, emdr online, trauma, psicólogo na suécia, terapeuta para expatriados',
      },
      '/blog': {
        title: 'Ricardo Correa, Psicólogo Clínico | Blog sobre psicologia, ansiedade e EMDR',
        description:
          'Textos de Ricardo Correa sobre saúde mental, ansiedade, depressão, TCC, EMDR, relacionamentos e psicoterapia online para brasileiros no Brasil e na Europa.',
        imageAlt: 'Blog Vidare Psicologia Integral',
        keywords: 'psicologia, ansiedade, depressão, autoconhecimento, tcc, emdr, trauma, psicoterapia online, terapia para expatriados, saúde mental, psicólogo brasileiro',
      },
      '/cadastro': {
        title: 'Ricardo Correa, Psicólogo Clínico | Agendar psicoterapia online',
        description:
          'Formulário confidencial para iniciar psicoterapia online com Ricardo Correa. Sigilo clínico para acompanhamento de ansiedade, depressão e traumas. Atendimento para todo o Brasil e Europa.',
        imageAlt: 'Agendamento confidencial Vidare',
        keywords: 'agendar psicoterapia online, psicólogo online brasil, marcar consulta psicólogo online, terapia brasileiros europa, atendimento confidencial, consulta psicológica online tcc',
      },
    },
    knowsAbout: [
      'Ansiedade',
      'Depressão',
      'Estresse',
      'Autoconhecimento',
      'Terapia Cognitivo-Comportamental (TCC)',
      'EMDR',
      'Psicoterapia informada por trauma',
      'Trauma complexo',
      'Psicoterapia online',
      'Terapia do Esquema',
      'Psicologia para expatriados',
      'Adaptação cultural'
    ],
    areaServed: ['Brasil', 'São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Suécia', 'Portugal', 'Reino Unido', 'Europa', 'Atendimento Online'],
  },
  en: {
    siteName: 'Vidare Integral Psychology',
    routes: {
      '/': {
        title: 'Ricardo Correa, Clinical Psychologist | Online Psychotherapy (CBT & EMDR)',
        description:
          'Ricardo Correa, clinical psychologist. Online psychotherapy (CBT, EMDR) for anxiety, depression, trauma, and personal growth. Therapy for expats in Sweden, Europe, and adults in Brazil.',
        imageAlt: 'Vidare Integral Psychology',
        keywords: 'online psychotherapy, CBT online, cognitive behavioral therapy, anxiety, depression, english speaking therapist, therapy for expats sweden, EMDR online europe, trauma therapy for internationals, psychologist brazil',
      },
      '/blog': {
        title: 'Ricardo Correa, Clinical Psychologist | Mental health, CBT & trauma blog',
        description:
          'Articles by Ricardo Correa on anxiety, depression, CBT, trauma, EMDR, online therapy, and psychotherapy for expats and internationally mobile adults.',
        imageAlt: 'Vidare Integral Psychology blog',
        keywords: 'CBT blog, anxiety, depression, mental health blog, EMDR blog, expat therapy, online psychotherapy, mental health abroad',
      },
      '/cadastro': {
        title: 'Ricardo Correa, Clinical Psychologist | Book confidential online therapy',
        description:
          'Confidential intake to start online psychotherapy with Ricardo Correa for anxiety, depression, and trauma. Support for adults living in Sweden, Europe, and Brazil.',
        imageAlt: 'Vidare Integral Psychology intake form',
        keywords: 'book online therapy, confidential psychotherapy, CBT therapist online, expat psychologist sweden, english speaking therapist online',
      },
    },
    knowsAbout: [
      'Anxiety',
      'Depression',
      'Stress management',
      'Personal growth',
      'Cognitive Behavioral Therapy (CBT)',
      'EMDR',
      'Trauma-informed psychotherapy',
      'Complex trauma',
      'Online psychotherapy',
      'Schema Therapy',
      'Expat mental health',
      'Cultural adaptation'
    ],
    areaServed: ['Brazil', 'Sweden', 'Stockholm', 'Europe', 'United Kingdom', 'Germany', 'Spain', 'Online care'],
  },
  es: {
    siteName: 'Vidare Psicologia Integral',
    routes: {
      '/': {
        title: 'Ricardo Correa, Psicólogo clínico | Psicoterapia online (TCC y EMDR)',
        description:
          'Ricardo Correa, psicólogo clínico. Psicoterapia online (TCC, EMDR) para ansiedad, depresión, trauma y autoconocimiento. Atención para personas en Europa, Suecia y Brasil.',
        imageAlt: 'Vidare Psicología Integral',
        keywords: 'psicoterapia online, terapia cognitivo conductual, tcc, ansiedad, depresión, psicólogo online brasil, psicólogo en español, europeos en movilidad, expatriados, psicólogo online europa',
      },
      '/blog': {
        title: 'Ricardo Correa, Psicólogo clínico | Blog de salud mental, TCC y trauma',
        description:
          'Artículos de Ricardo Correa sobre ansiedad, depresión, trauma, EMDR, psicoterapia online y bienestar emocional.',
        imageAlt: 'Blog Vidare Psicología Integral',
        keywords: 'ansiedad, depresión, salud mental, tcc, EMDR, trauma, psicoterapia online, terapia expatriados, salud mental en el extranjero',
      },
      '/cadastro': {
        title: 'Ricardo Correa, Psicólogo clínico | Contacto confidencial para terapia online',
        description:
          'Contacto confidencial para iniciar psicoterapia online con Ricardo Correa para ansiedad, depresión o trauma. Atención para Europa, Suecia y Brasil.',
        imageAlt: 'Formulario de admisión Vidare',
        keywords: 'reservar psicoterapia online, psicólogo online tcc, consulta psicológica confidencial, terapia online europa, psicólogo online brasil',
      },
    },
    knowsAbout: [
      'Ansiedad',
      'Depresión',
      'Manejo del estrés',
      'Autoconocimiento',
      'Terapia Cognitivo-Conductual (TCC)',
      'EMDR',
      'Psicoterapia informada por trauma',
      'Trauma complejo',
      'Psicoterapia online',
      'Terapia de esquemas',
      'Salud mental para expatriados'
    ],
    areaServed: ['Brasil', 'España', 'Suecia', 'Alemania', 'Europa', 'América Latina', 'Atención online'],
  },
  sv: {
    siteName: 'Vidare Integrerad Psykologi',
    routes: {
      '/': {
        title: 'Ricardo Correa, Leg. psykolog | Onlineterapi (KBT & EMDR)',
        description:
          'Ricardo Correa, legitimerad psykolog. Onlineterapi (KBT, EMDR) för ångest, depression, trauma och personlig utveckling för vuxna i Sverige, Europa och Brasilien.',
        imageAlt: 'Vidare Integrerad Psykologi',
        keywords: 'onlineterapi, KBT online, kognitiv beteendeterapi, ångest, depression, EMDR sverige, traumaterapi online, psykolog online sverige, terapi för expats, engelsktalande psykolog',
      },
      '/blog': {
        title: 'Ricardo Correa, Leg. psykolog | Blogg om mental hälsa, KBT och trauma',
        description:
          'Texter av Ricardo Correa om ångest, depression, KBT, trauma, EMDR och onlineterapi för vuxna i Sverige och utomlands.',
        imageAlt: 'Vidare Integrerad Psykologi blogg',
        keywords: 'ångest, depression, mental hälsa, KBT blogg, EMDR blogg, onlineterapi sverige, terapi för internationella',
      },
      '/cadastro': {
        title: 'Ricardo Correa, Leg. psykolog | Boka konfidentiell onlineterapi',
        description:
          'Ta kontakt för konfidentiell onlineterapi med Ricardo Correa gällande ångest, depression eller trauma. Stöd för vuxna i Sverige, Europa och Brasilien.',
        imageAlt: 'Vidares inskrivningsformulär',
        keywords: 'boka onlineterapi, KBT psykolog online, psykolog online sverige, terapi europa, konfidentiell terapi',
      },
    },
    knowsAbout: [
      'Ångest',
      'Depression',
      'Stresshantering',
      'Personlig utveckling',
      'Kognitiv beteendeterapi (KBT)',
      'EMDR',
      'Traumainformerad psykoterapi',
      'Komplext trauma',
      'Onlineterapi',
      'Schematerapi',
      'Psykologi för expats'
    ],
    areaServed: ['Brasilien', 'Sverige', 'Stockholm', 'Göteborg', 'Europa', 'Onlinebehandling'],
  },
};

const buildAbsoluteUrl = (locale, routePath) => `${SITE_URL}${buildLocalePath(locale, routePath)}`;

const buildBrandVariants = (siteName) => ([
  'Vidare',
  'Vidare Psicologia Integral',
  'Vidare Integral Psychology',
  'Vidare Psicología Integral',
  'Vidare Integrerad Psykologi',
]).filter((name) => name !== siteName);

const getAlternateHreflangs = (routePath) => ([
  ...SUPPORTED_LOCALES.map((code) => ({
    hreflang: localeMeta[code]?.htmlLang ?? code,
    href: buildAbsoluteUrl(code, routePath),
  })),
  {
    hreflang: 'x-default',
    href: buildAbsoluteUrl('en', routePath),
  },
]);

const buildOrganizationStructuredData = (locale) => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const homeSeo = seoByLocale[safeLocale].routes['/'];
  const siteName = seoByLocale[safeLocale].siteName;
  const phone = safeLocale === 'sv' ? SITE_PHONE_SV : SITE_PHONE;

  const areaServedObjects = seoByLocale[safeLocale].areaServed.map(area => ({
    '@type': 'Place',
    name: area
  }));

  return {
    '@type': ['MedicalBusiness', 'Organization'],
    '@id': ORGANIZATION_ID,
    name: siteName,
    alternateName: buildBrandVariants(siteName),
    url: SITE_URL,
    logo: SITE_LOGO,
    image: DEFAULT_IMAGE,
    description: homeSeo.description,
    email: SITE_EMAIL,
    telephone: phone,
    medicalSpecialty: 'Psychotherapy',
    founder: {
      '@id': PERSON_ID,
    },
    foundingDate: PRACTICE_START_YEAR,
    availableLanguage: AVAILABLE_LANGUAGES,
    areaServed: areaServedObjects,
    location: {
      '@type': 'VirtualLocation',
      url: SITE_URL
    },
    knowsAbout: seoByLocale[safeLocale].knowsAbout,
    sameAs: SITE_SAME_AS,
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE_EMAIL,
      telephone: phone,
      availableLanguage: AVAILABLE_LANGUAGES,
      areaServed: areaServedObjects,
    }],
  };
};

const buildPersonStructuredData = (locale) => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const homeSeo = seoByLocale[safeLocale].routes['/'];
  const phone = safeLocale === 'sv' ? SITE_PHONE_SV : SITE_PHONE;

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_FOUNDER,
    jobTitle: SITE_PROFESSION,
    image: SITE_LOGO,
    url: SITE_URL,
    sameAs: SITE_SAME_AS,
    description: homeSeo.description,
    identifier: PROFESSIONAL_REGISTRATION,
    worksFor: {
      '@id': ORGANIZATION_ID,
    },
    hasCredential: CREDENTIALS.map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional certification',
      name: credential,
    })),
    knowsAbout: seoByLocale[safeLocale].knowsAbout,
    knowsLanguage: AVAILABLE_LANGUAGES,
    alumniOf: [
      {
        '@type': 'Organization',
        name: 'Beck Institute',
      },
    ],
    memberOf: [
      {
        '@type': 'Organization',
        name: 'EMDR Europe',
      },
      {
        '@type': 'Organization',
        name: 'ISST',
      },
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: SITE_PROFESSION,
      occupationalCategory: 'Psychology',
    },
    email: SITE_EMAIL,
    telephone: phone,
    startDate: PRACTICE_START_YEAR,
  };
};

const buildServiceStructuredData = (locale) => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const homeSeo = seoByLocale[safeLocale].routes['/'];

  const areaServedObjects = seoByLocale[safeLocale].areaServed.map(area => ({
    '@type': 'Place',
    name: area
  }));

  return {
    '@type': 'Service',
    '@id': SERVICE_ID,
    name: homeSeo.title,
    description: homeSeo.description,
    url: buildAbsoluteUrl(safeLocale, '/'),
    serviceType: 'Online psychotherapy',
    areaServed: areaServedObjects,
    availableLanguage: AVAILABLE_LANGUAGES,
    provider: {
      '@id': ORGANIZATION_ID,
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Adults, expats, internationally mobile professionals, and Portuguese-speaking adults in Europe',
    },
  };
};

const buildWebsiteStructuredData = (locale) => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const siteName = seoByLocale[safeLocale].siteName;

  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: `${SITE_FOUNDER} | ${siteName}`,
    alternateName: [SITE_FOUNDER, siteName, ...buildBrandVariants(siteName)],
    inLanguage: localeMeta[safeLocale]?.htmlLang ?? localeMeta[DEFAULT_LOCALE].htmlLang,
    publisher: {
      '@id': ORGANIZATION_ID,
    },
  };
};

const buildBreadcrumbStructuredData = (locale, routePath = '/') => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const safeRoute = seoByLocale[safeLocale].routes[routePath] ? routePath : '/';
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: seoByLocale[safeLocale].siteName,
      item: buildAbsoluteUrl(safeLocale, '/'),
    },
  ];

  if (safeRoute !== '/') {
    const routeNames = {
      '/blog': 'Blog',
      '/cadastro': 'Cadastro',
    };
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: routeNames[safeRoute] ?? safeRoute,
      item: buildAbsoluteUrl(safeLocale, safeRoute),
    });
  }

  return {
    '@type': 'BreadcrumbList',
    '@id': `${buildAbsoluteUrl(safeLocale, safeRoute)}#breadcrumb`,
    itemListElement: items,
  };
};

const buildPageStructuredData = (locale, routePath = '/') => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const safeRoute = seoByLocale[safeLocale].routes[routePath] ? routePath : '/';
  const routeSeo = seoByLocale[safeLocale].routes[safeRoute];
  const canonical = buildAbsoluteUrl(safeLocale, safeRoute);
  const pageTypeByRoute = {
    '/': 'WebPage',
    '/blog': 'CollectionPage',
    '/cadastro': 'ContactPage',
  };

  return {
    '@type': pageTypeByRoute[safeRoute] ?? 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: routeSeo.title,
    description: routeSeo.description,
    inLanguage: localeMeta[safeLocale]?.htmlLang ?? localeMeta[DEFAULT_LOCALE].htmlLang,
    author: {
      '@id': PERSON_ID,
    },
    publisher: {
      '@id': ORGANIZATION_ID,
    },
    isPartOf: {
      '@id': WEBSITE_ID,
    },
    about: {
      '@id': ORGANIZATION_ID,
    },
    breadcrumb: {
      '@id': `${canonical}#breadcrumb`,
    },
  };
};

const buildFaqStructuredData = (locale) => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const content = localizedContent[safeLocale];
  const canonical = buildAbsoluteUrl(safeLocale, '/');

  return {
    '@type': 'FAQPage',
    '@id': `${canonical}#faq`,
    url: canonical,
    inLanguage: localeMeta[safeLocale]?.htmlLang ?? localeMeta[DEFAULT_LOCALE].htmlLang,
    mainEntity: content.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
};

const buildStructuredData = (locale, routePath = '/') => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const safeRoute = seoByLocale[safeLocale].routes[routePath] ? routePath : '/';
  const graph = [buildPageStructuredData(safeLocale, safeRoute)];
  graph.push(buildBreadcrumbStructuredData(safeLocale, safeRoute));

  if (safeRoute === '/') {
    graph.unshift(
      buildOrganizationStructuredData(safeLocale),
      buildPersonStructuredData(safeLocale),
      buildWebsiteStructuredData(safeLocale),
      buildServiceStructuredData(safeLocale),
    );
    graph.push(buildFaqStructuredData(safeLocale));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};

export const getSiteSeoDefaults = (locale = DEFAULT_LOCALE) => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;

  return {
    siteName: seoByLocale[safeLocale].siteName,
    locale: localeMeta[safeLocale]?.ogLocale ?? localeMeta[DEFAULT_LOCALE].ogLocale,
    twitterCard: 'summary_large_image',
    robots: 'index, follow',
    author: SITE_FOUNDER,
  };
};

export const getRouteSeo = (locale = DEFAULT_LOCALE, routePath = '/') => {
  const safeLocale = seoByLocale[locale] ? locale : DEFAULT_LOCALE;
  const safeRoute = seoByLocale[safeLocale].routes[routePath] ? routePath : '/';
  const routeSeo = seoByLocale[safeLocale].routes[safeRoute];

  return {
    ...routeSeo,
    canonical: buildAbsoluteUrl(safeLocale, safeRoute),
    ogType: 'website',
    image: DEFAULT_IMAGE,
    keywords: routeSeo.keywords,
    alternates: getAlternateHreflangs(safeRoute),
    structuredData: buildStructuredData(safeLocale, safeRoute),
  };
};
