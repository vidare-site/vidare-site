import React, { createContext, useContext } from 'react';
import { localizedContent } from '../content/locales';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  buildLocalePath,
  isSupportedLocale,
  localeMeta,
} from './config';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ locale, children }) => {
  const resolvedLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;

  return (
    <LanguageContext.Provider
      value={{
        locale: resolvedLocale,
        localeInfo: localeMeta[resolvedLocale],
        locales: SUPPORTED_LOCALES.map((code) => localeMeta[code]),
        content: localizedContent[resolvedLocale],
        buildPath: (path = '/') => buildLocalePath(resolvedLocale, path),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useI18n must be used within a LanguageProvider');
  }

  return context;
};
