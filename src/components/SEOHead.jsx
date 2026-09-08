import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo, getSiteSeoDefaults } from '../content/seo';
import { useI18n } from '../i18n/LanguageProvider';
import { localeMeta, normalizeRoutePath } from '../i18n/config';

const ensureMetaTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
};

const ensureLinkTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });

  return element;
};

const SEOHead = () => {
  const location = useLocation();
  const { locale } = useI18n();
  const routePath = normalizeRoutePath(location.pathname);
  const seo = getRouteSeo(locale, routePath);
  const siteSeoDefaults = getSiteSeoDefaults(locale);

  useEffect(() => {
    document.documentElement.lang = localeMeta[locale]?.htmlLang ?? localeMeta.en.htmlLang;
    document.title = seo.title;

    ensureMetaTag('meta[name="author"]', {
      name: 'author',
      content: siteSeoDefaults.author,
    });
    ensureMetaTag('meta[name="keywords"]', {
      name: 'keywords',
      content: seo.keywords ?? '',
    });
    ensureMetaTag('meta[name="description"]', {
      name: 'description',
      content: seo.description,
    });
    ensureMetaTag('meta[name="robots"]', {
      name: 'robots',
      content: siteSeoDefaults.robots,
    });
    ensureMetaTag('meta[property="og:type"]', {
      property: 'og:type',
      content: seo.ogType,
    });
    ensureMetaTag('meta[property="og:title"]', {
      property: 'og:title',
      content: seo.title,
    });
    ensureMetaTag('meta[property="og:description"]', {
      property: 'og:description',
      content: seo.description,
    });
    ensureMetaTag('meta[property="og:url"]', {
      property: 'og:url',
      content: seo.canonical,
    });
    ensureMetaTag('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: siteSeoDefaults.siteName,
    });
    ensureMetaTag('meta[property="og:locale"]', {
      property: 'og:locale',
      content: siteSeoDefaults.locale,
    });
    ensureMetaTag('meta[property="og:image"]', {
      property: 'og:image',
      content: seo.image,
    });
    ensureMetaTag('meta[property="og:image:type"]', {
      property: 'og:image:type',
      content: 'image/webp',
    });
    ensureMetaTag('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: seo.imageAlt,
    });
    ensureMetaTag('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: siteSeoDefaults.twitterCard,
    });
    ensureMetaTag('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: seo.title,
    });
    ensureMetaTag('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: seo.description,
    });
    ensureMetaTag('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: seo.image,
    });
    ensureMetaTag('meta[name="twitter:url"]', {
      name: 'twitter:url',
      content: seo.canonical,
    });
    ensureMetaTag('meta[name="twitter:image:alt"]', {
      name: 'twitter:image:alt',
      content: seo.imageAlt,
    });

    ensureLinkTag('link[rel="canonical"]', {
      rel: 'canonical',
      href: seo.canonical,
    });

    seo.alternates.forEach((alternate) => {
      ensureLinkTag(`link[rel="alternate"][hreflang="${alternate.hreflang}"]`, {
        rel: 'alternate',
        hreflang: alternate.hreflang,
        href: alternate.href,
      });
    });

    document.head
      .querySelectorAll('meta[data-og-locale-alternate="true"]')
      .forEach((element) => element.remove());

    seo.alternates
      .filter((alternate) => alternate.hreflang !== 'x-default')
      .filter((alternate) => alternate.hreflang !== (localeMeta[locale]?.htmlLang ?? locale))
      .forEach((alternate) => {
        const element = document.createElement('meta');
        element.setAttribute('property', 'og:locale:alternate');
        element.setAttribute('content', alternate.hreflang.replace('-', '_'));
        element.setAttribute('data-og-locale-alternate', 'true');
        document.head.appendChild(element);
      });

    let structuredDataTag = document.head.querySelector('#vidare-structured-data');
    if (!structuredDataTag) {
      structuredDataTag = document.createElement('script');
      structuredDataTag.type = 'application/ld+json';
      structuredDataTag.id = 'vidare-structured-data';
      document.head.appendChild(structuredDataTag);
    }

    structuredDataTag.textContent = JSON.stringify(seo.structuredData ?? []);
  }, [locale, seo, siteSeoDefaults]);

  return null;
};

export default SEOHead;
