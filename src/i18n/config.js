export const SUPPORTED_LOCALES = ['pt', 'en', 'es', 'sv'];
export const DEFAULT_LOCALE = 'pt';
export const AUTO_FALLBACK_LOCALE = 'en';
export const LOCALE_PREFERENCE_KEY = 'vidarePreferredLocale';

export const localeMeta = {
  pt: {
    code: 'pt',
    label: 'Portuguese',
    nativeLabel: 'Português',
    shortLabel: 'PT',
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
  },
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    shortLabel: 'EN',
    htmlLang: 'en',
    ogLocale: 'en_US',
  },
  es: {
    code: 'es',
    label: 'Spanish',
    nativeLabel: 'Español',
    shortLabel: 'ES',
    htmlLang: 'es',
    ogLocale: 'es_ES',
  },
  sv: {
    code: 'sv',
    label: 'Swedish',
    nativeLabel: 'Svenska',
    shortLabel: 'SV',
    htmlLang: 'sv',
    ogLocale: 'sv_SE',
  },
};

export const isSupportedLocale = (locale) => SUPPORTED_LOCALES.includes(locale);

export const normalizeRoutePath = (pathname = '/') => {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  if (isSupportedLocale(segments[0])) {
    const normalized = `/${segments.slice(1).join('/')}`;
    return normalized === '/' ? '/' : normalized;
  }

  return pathname || '/';
};

export const buildLocalePath = (locale, path = '/') => {
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;

  if (!path || path === '/') {
    return `/${safeLocale}`;
  }

  if (path.startsWith('#')) {
    return `/${safeLocale}${path}`;
  }

  return `/${safeLocale}${path.startsWith('/') ? path : `/${path}`}`;
};

export const switchLocalePath = (pathname, targetLocale) =>
  buildLocalePath(targetLocale, normalizeRoutePath(pathname));

const SPANISH_SPEAKING_REGIONS = new Set([
  'AR',
  'BO',
  'CL',
  'CO',
  'CR',
  'CU',
  'DO',
  'EC',
  'ES',
  'GQ',
  'GT',
  'HN',
  'MX',
  'NI',
  'PA',
  'PE',
  'PR',
  'PY',
  'SV',
  'UY',
  'VE',
]);

const ENGLISH_SPEAKING_REGIONS = new Set([
  'AU',
  'CA',
  'GB',
  'IE',
  'NZ',
  'US',
  'ZA',
]);

const PORTUGUESE_TIMEZONES = new Set([
  'America/Araguaina',
  'America/Bahia',
  'America/Belem',
  'America/Boa_Vista',
  'America/Campo_Grande',
  'America/Cuiaba',
  'America/Eirunepe',
  'America/Fortaleza',
  'America/Maceio',
  'America/Manaus',
  'America/Noronha',
  'America/Porto_Velho',
  'America/Recife',
  'America/Rio_Branco',
  'America/Santarem',
  'America/Sao_Paulo',
  'Atlantic/Azores',
  'Atlantic/Madeira',
  'Europe/Lisbon',
]);

const parseLocaleTag = (tag = '') => {
  const segments = tag.replace('_', '-').split('-').filter(Boolean);
  const language = segments[0]?.toLowerCase();
  const regionCandidate = segments[1]?.length === 2 ? segments[1] : segments[2];
  const region = regionCandidate?.length === 2 ? regionCandidate.toUpperCase() : undefined;

  return { language, region };
};

export const readStoredLocalePreference = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(LOCALE_PREFERENCE_KEY);
    return isSupportedLocale(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const saveStoredLocalePreference = (locale) => {
  if (typeof window === 'undefined' || !isSupportedLocale(locale)) {
    return;
  }

  try {
    window.localStorage.setItem(LOCALE_PREFERENCE_KEY, locale);
  } catch {
    // Ignore storage failures and keep navigation flowing.
  }
};

const resolveFromLocaleHints = (localeTags = []) => {
  const parsedTags = localeTags.map(parseLocaleTag);

  for (const { language } of parsedTags) {
    if (language === 'sv') return 'sv';
    if (language === 'pt') return 'pt';
    if (language === 'es') return 'es';
  }

  for (const { region } of parsedTags) {
    if (region === 'SE') return 'sv';
    if (region === 'BR' || region === 'PT') return 'pt';
    if (region && SPANISH_SPEAKING_REGIONS.has(region)) return 'es';
  }

  for (const { language, region } of parsedTags) {
    if (language === 'en' || (region && ENGLISH_SPEAKING_REGIONS.has(region))) {
      return 'en';
    }
  }

  return null;
};

const resolveFromTimezone = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timeZone === 'Europe/Stockholm') {
    return 'sv';
  }

  if (PORTUGUESE_TIMEZONES.has(timeZone)) {
    return 'pt';
  }

  return null;
};

export const resolvePreferredLocale = () => {
  const stored = readStoredLocalePreference();

  if (stored) {
    return stored;
  }

  if (typeof window === 'undefined') {
    return AUTO_FALLBACK_LOCALE;
  }

  const browserLocales = Array.isArray(window.navigator.languages) && window.navigator.languages.length > 0
    ? window.navigator.languages
    : [window.navigator.language].filter(Boolean);

  return (
    resolveFromLocaleHints(browserLocales) ??
    resolveFromTimezone() ??
    AUTO_FALLBACK_LOCALE
  );
};
