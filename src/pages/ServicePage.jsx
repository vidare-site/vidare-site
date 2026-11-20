import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { useI18n } from '../i18n/LanguageProvider';
import { getServiceContent, getServicesHubContent } from '../content/servicePages.js';

export default function ServicePage() {
  const { serviceSlug } = useParams();
  const { locale, buildPath, content } = useI18n();
  const service = getServiceContent(locale, serviceSlug);
  if (!service) return <NotFound locale={locale} />;
  const hub = getServicesHubContent(locale);
  const related = service.related.map((slug) => hub.items.find((item) => item.slug === slug));
  return (
    <div className="bg-section-cream">
      <section className="border-b border-border-subtle bg-surface py-2xl sm:py-3xl">
        <div className="container mx-auto px-lg md:px-xl xl:px-[3.5rem]">
          <p className="mb-sm text-xs font-medium uppercase tracking-[0.18em] text-muted">{service.label}</p>
          <h1 className="max-w-4xl font-title text-3xl leading-tight text-title sm:text-4xl lg:text-5xl">{service.title}</h1>
          {service.intro.map((paragraph) => <p key={paragraph} className="mt-md max-w-[48rem] text-base leading-relaxed text-body sm:text-lg">{paragraph}</p>)}
        </div>
      </section>
      <section className="py-2xl sm:py-3xl">
        <div className="container mx-auto grid gap-xl px-lg md:px-xl lg:grid-cols-2 xl:px-[3.5rem]">
          {service.sections.map((section) => (
            <article key={section.title} className="rounded-sm border border-border bg-surface p-xl">
              <h2 className="font-title text-2xl text-title">{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-md text-base leading-relaxed text-body sm:text-lg">{paragraph}</p>)}
            </article>
          ))}
        </div>
      </section>
      <section className="py-3xl bg-section-sage">
        <div className="container mx-auto max-w-[800px] px-lg md:px-xl xl:px-[3.5rem]">
          <h2 className="text-center text-3xl md:text-4xl font-title text-light mb-xl">{hub.faqTitle}</h2>
          <div className="w-full bg-surface/95 backdrop-blur rounded p-lg md:p-xl shadow-lg border border-border/10">
            {service.faqs.map(([question, answer], index) => (
              <details key={question} name="service-faq" className="group border-b border-border/50">
                <summary className="flex cursor-pointer list-none items-center justify-between py-md text-title hover:text-primary [&::-webkit-details-marker]:hidden">
                  <h3 className="font-title text-xl md:text-2xl text-left">{question}</h3>
                  <span aria-hidden="true" className="ml-4 shrink-0 text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-body text-base leading-relaxed pt-2 pb-lg">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="py-2xl sm:py-3xl">
        <nav aria-label={hub.title} className="container mx-auto px-lg md:px-xl xl:px-[3.5rem]">
          <h2 className="font-title text-2xl text-title sm:text-3xl">{hub.title}</h2>
          <div className="mt-lg grid gap-lg md:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="rounded-sm border border-border bg-surface p-lg">
                <h3 className="font-title text-xl text-title">{item.label}</h3>
                <p className="mt-sm text-base leading-relaxed text-muted">{item.description}</p>
                <Link reloadDocument to={buildPath(item.routePath)} className="mt-md inline-flex text-sm font-medium uppercase tracking-[0.12em] text-title transition-colors hover:text-primary">{hub.ctaLabel}</Link>
              </article>
            ))}
          </div>
        </nav>
      </section>
      <section className="border-y border-border-subtle bg-surface py-2xl">
        <div className="container mx-auto px-lg md:px-xl xl:px-[3.5rem]">
          <div className="mx-auto max-w-[48rem] text-center">
            <h2 className="font-title text-3xl leading-tight text-title sm:text-4xl">{hub.ctaTitle}</h2>
            <p className="mt-sm text-base leading-relaxed text-body sm:text-lg">{hub.ctaBody}</p>
            <a data-service-contact href={content.hero.ctaHref} target="_blank" rel="noopener noreferrer" className="mt-lg inline-flex items-center justify-center border border-title bg-title px-xl py-md text-xs font-medium uppercase tracking-[0.14em] text-light transition-all hover:bg-transparent hover:text-title">{hub.contactLabel}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
