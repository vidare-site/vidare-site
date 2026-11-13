import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/LanguageProvider';
import { localeMeta, normalizeRoutePath } from '../i18n/config';
import { getSeoElements } from '../lib/seoDocument.js';

export default function SEOHead() {
  const { pathname } = useLocation();
  const { locale } = useI18n();
  useEffect(() => {
    document.documentElement.lang = localeMeta[locale].htmlLang;
    document.head.querySelectorAll('[data-vidare-seo]').forEach((element) => element.remove());
    for (const { tag, attributes = {}, text = '' } of getSeoElements(locale, normalizeRoutePath(pathname))) {
      const element = document.createElement(tag);
      element.setAttribute('data-vidare-seo', '');
      Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
      element.textContent = text;
      document.head.appendChild(element);
    }
  }, [locale, pathname]);
  return null;
}
