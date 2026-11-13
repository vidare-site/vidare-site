import { SERVICE_ROUTE_PATHS } from './servicePages.js';
import { SUPPORTED_LOCALES, buildLocalePath } from '../i18n/config.js';

export const SITE_URL = 'https://vidare.eu';
export const INDEXABLE_PATHS = ['/', '/blog', ...Object.values(SERVICE_ROUTE_PATHS)];
export const PAGE_PATHS = [...INDEXABLE_PATHS, '/cadastro'];
export const PAGE_URLS = SUPPORTED_LOCALES.flatMap((locale) =>
  PAGE_PATHS.map((routePath) => buildLocalePath(locale, routePath)),
);
