import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/LanguageProvider';

const labels = {
  pt: ['Carregar Instagram', 'Ao carregar o feed, você permite a conexão com Instagram e Elfsight, que podem receber dados técnicos e usar cookies.'],
  en: ['Load Instagram', 'Loading the feed connects to Instagram and Elfsight, which may receive technical data and use cookies.'],
  es: ['Cargar Instagram', 'Al cargar el feed, permites la conexión con Instagram y Elfsight, que pueden recibir datos técnicos y usar cookies.'],
  sv: ['Ladda Instagram', 'När flödet laddas ansluts du till Instagram och Elfsight, som kan ta emot tekniska uppgifter och använda cookies.'],
};
export default function InstagramFeedEmbed() {
  const hostRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const { locale } = useI18n();
  const { pathname } = useLocation();
  const sensitivePage = pathname.endsWith('/cadastro');
  useEffect(() => {
    if (!enabled || sensitivePage) return;
    const host = hostRef.current;
    const widget = document.createElement('div');
    widget.className = 'elfsight-app-09955748-449b-400a-b403-d9c18968e354';
    widget.setAttribute('data-elfsight-app-lazy', '');
    host.replaceChildren(widget);
    if (!document.querySelector('script[data-elfsight-platform]')) {
      const script = document.createElement('script');
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      script.dataset.elfsightPlatform = 'true';
      document.head.appendChild(script);
    }
    return () => host.replaceChildren();
  }, [enabled, sensitivePage]);
  return <div className="min-h-[240px] text-center flex flex-col justify-center gap-md">
    <div ref={hostRef} />
    {(!enabled || sensitivePage) && <>
      <a className="text-title underline" href="https://www.instagram.com/ricardocorrea.psi" target="_blank" rel="noopener noreferrer">@ricardocorrea.psi</a>
      {!sensitivePage && <>
        <p className="text-sm text-muted">{labels[locale][1]}</p>
        <button type="button" className="mx-auto px-lg py-sm border border-border text-title" onClick={() => setEnabled(true)}>{labels[locale][0]}</button>
      </>}
    </>}
  </div>;
}
