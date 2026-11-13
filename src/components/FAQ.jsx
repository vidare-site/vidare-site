import { useI18n } from '../i18n/LanguageProvider';
import { getServicesHubContent } from '../content/servicePages.js';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const { content, locale, buildPath } = useI18n();
  const hub = getServicesHubContent(locale);
  const faqs = [...content.faq.items, { question: hub.title, answer: hub.description, relatedThemes: hub.items }];
  return (
    <section id="faq" className="py-3xl bg-section-sage">
      <div className="container mx-auto max-w-[800px] px-lg md:px-xl xl:px-[3.5rem]">
        <div className="text-center mb-2xl">
          <h2 className="text-3xl md:text-4xl font-title text-light mb-sm">{content.faq.title}</h2>
          <p className="text-lg text-light/80 max-w-prose mx-auto">{content.faq.subtitle}</p>
        </div>
        <div className="w-full bg-surface/95 backdrop-blur rounded p-lg md:p-xl shadow-lg border border-border/10">
          {faqs.map((faq, index) => (
            <details key={index} name="vidare-faq" className="group border-b border-border/50">
              <summary className="flex cursor-pointer list-none items-center justify-between py-md text-title hover:text-primary [&::-webkit-details-marker]:hidden">
                <h3 className="font-title text-xl md:text-2xl text-left">{faq.question}</h3>
                <span aria-hidden="true" className="ml-4 shrink-0 text-xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="text-body text-base leading-relaxed pt-2 pb-lg">
                <p>{faq.answer}</p>
                {faq.relatedThemes && <ul className="mt-sm space-y-xs">
                  {faq.relatedThemes.map((item) => (
                    <li id={item.anchorId} key={item.slug} className="border-l border-title/20 pl-sm">
                      <Link reloadDocument to={buildPath(item.routePath)} className="text-title underline underline-offset-4">{item.label}</Link>
                      <span className="text-muted"> — {item.description}</span>
                    </li>
                  ))}
                </ul>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
