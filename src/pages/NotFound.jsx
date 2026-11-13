import { Link } from 'react-router-dom';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, localeMeta } from '../i18n/config.js';

export const notFoundText = {
  pt: ['Página não encontrada | Vidare', 'Página não encontrada', 'O endereço pode ter mudado ou não existir.', 'Voltar ao início'],
  en: ['Page not found | Vidare', 'Page not found', 'This address may have moved or may not exist.', 'Back to home'],
  es: ['Página no encontrada | Vidare', 'Página no encontrada', 'La dirección puede haber cambiado o no existir.', 'Volver al inicio'],
  sv: ['Sidan hittades inte | Vidare', 'Sidan hittades inte', 'Adressen kan ha ändrats eller kanske inte finns.', 'Till startsidan'],
};

export default function NotFound({ locale = DEFAULT_LOCALE }) {
  const text = notFoundText[locale] || notFoundText.pt;
  return (
    <section className="bg-surface px-lg py-3xl text-center">
      <p className="text-muted">404</p>
      <h1 className="mt-md font-title text-4xl text-title">{text[1]}</h1>
      <p className="my-lg text-body">{text[2]}</p>
      <Link reloadDocument to={`/${locale}`} className="text-title underline">{text[3]}</Link>
      <nav aria-label="Languages" className="mt-xl flex justify-center gap-md">
        {SUPPORTED_LOCALES.map((code) => <Link reloadDocument key={code} to={`/${code}`} hrefLang={localeMeta[code].htmlLang}>{localeMeta[code].nativeLabel}</Link>)}
      </nav>
    </section>
  );
}
