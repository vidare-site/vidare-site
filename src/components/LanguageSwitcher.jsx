import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { saveStoredLocalePreference, switchLocalePath } from '../i18n/config';
import { useI18n } from '../i18n/LanguageProvider';

const toneStyles = {
  dark: {
    wrapper: 'border border-title/15 bg-surface/80 text-title backdrop-blur-md',
    button: 'text-title/70 hover:text-title',
    active: 'bg-title text-light',
  },
  light: {
    wrapper: 'border border-light/20 bg-[rgba(255,255,255,0.08)] text-light backdrop-blur-md',
    button: 'text-light/70 hover:text-light',
    active: 'bg-light text-title',
  },
};

const LanguageSwitcher = ({ tone = 'dark', className = '' }) => {
  const location = useLocation();
  const { locale, locales, content } = useI18n();
  const styles = toneStyles[tone] ?? toneStyles.dark;

  return (
    <nav
      aria-label={content.languageSwitcher.ariaLabel}
      className={`inline-flex items-center gap-1 rounded-full px-1 py-1 ${styles.wrapper} ${className}`.trim()}
    >
      {locales.map((item) => {
        const isActive = item.code === locale;
        const to = `${switchLocalePath(location.pathname, item.code)}${location.hash}`;

        return (
          <Link
            key={item.code}
            to={to}
            onClick={() => saveStoredLocalePreference(item.code)}
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-full px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.16em] transition-colors ${
              isActive ? styles.active : styles.button
            }`}
          >
            {item.shortLabel}
          </Link>
        );
      })}
    </nav>
  );
};

export default LanguageSwitcher;
