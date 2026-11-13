import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/LanguageProvider';

export default function CookieConsent() {
  const { content } = useI18n();
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const sensitivePage = pathname.endsWith('/cadastro');
  useEffect(() => {
    if (sensitivePage) return;
    const open = () => setIsVisible(true);
    const timer = setTimeout(() => {
      if (!window.__vidareConsent?.read()) open();
    }, 1200);
    window.addEventListener('vidare:cookie-settings', open);
    return () => { clearTimeout(timer); window.removeEventListener('vidare:cookie-settings', open); };
  }, [sensitivePage]);
  if (!isVisible || sensitivePage) return null;
  const decide = (choice) => {
    window.__vidareConsent?.update(choice === 'accept' ? 'granted' : 'denied');
    setIsVisible(false);
  };
  const consent = content.cookieConsent;
  return (
    <aside role="region" aria-labelledby="cookie-title" className="fixed bottom-0 left-0 w-full z-[1100] p-md">
      <div className="container mx-auto max-w-5xl bg-surface border border-border shadow-2xl p-xl flex flex-col md:flex-row items-center gap-xl">
        <div className="flex-1">
          <h2 id="cookie-title" className="font-title text-title text-lg md:text-xl font-semibold mb-sm">{consent.title}</h2>
          <p className="text-body text-sm md:text-base leading-relaxed">{consent.body}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-md w-full md:w-auto shrink-0">
          <button type="button" onClick={() => decide('reject')} className="w-full sm:w-auto px-lg py-sm border border-border text-title uppercase text-xs tracking-widest">{consent.reject}</button>
          <button type="button" onClick={() => decide('accept')} className="w-full sm:w-auto px-lg py-sm bg-title text-light border border-title uppercase text-xs tracking-widest">{consent.accept}</button>
        </div>
      </div>
    </aside>
  );
}
