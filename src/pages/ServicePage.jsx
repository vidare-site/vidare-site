import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { useI18n } from '../i18n/LanguageProvider';
import { getServiceContent, getServicesHubContent } from '../content/servicePages.js';

const ServicePage = () => {
  const { serviceSlug } = useParams();
  const { locale, buildPath, content } = useI18n();
  const service = getServiceContent(locale, serviceSlug);

  if (!service) {
    return <NotFound locale={locale} />;
  }

  const hub = getServicesHubContent(locale);
  const related = hub.items.filter((item) => item.slug !== serviceSlug).slice(0, 3);

  return (
    <div className="bg-section-cream">
      <section className="border-b border-border-subtle bg-surface py-2xl sm:py-3xl">
        <div className="container mx-auto px-lg md:px-xl xl:px-[3.5rem]">
          <p className="mb-sm text-xs font-medium uppercase tracking-[0.18em] text-muted">
            {service.label}
          </p>
          <h1 className="max-w-4xl font-title text-3xl leading-tight text-title sm:text-4xl lg:text-5xl">
            {service.title}
          </h1>
          <p className="mt-md max-w-3xl text-base leading-relaxed text-body sm:text-lg">
            {service.intro}
          </p>
        </div>
      </section>

      <section className="py-2xl sm:py-3xl">
        <div className="container mx-auto grid gap-xl px-lg md:px-xl lg:grid-cols-2 xl:px-[3.5rem]">
          <article className="rounded-sm border border-border bg-surface p-xl">
            <h2 className="font-title text-2xl text-title">{service.forWhoTitle}</h2>
            <ul className="mt-md space-y-sm text-base leading-relaxed text-body">
              {service.forWhoItems.map((item) => (
                <li key={item} className="border-l border-title/30 pl-sm">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-sm border border-border bg-surface p-xl">
            <h2 className="font-title text-2xl text-title">{service.approachTitle}</h2>
            <p className="mt-md text-base leading-relaxed text-body sm:text-lg">
              {service.approachText}
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-surface py-2xl">
        <div className="container mx-auto px-lg md:px-xl xl:px-[3.5rem]">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-title text-3xl leading-tight text-title sm:text-4xl">
              {service.ctaTitle}
            </h2>
            <p className="mt-sm text-base leading-relaxed text-body sm:text-lg">
              {service.ctaBody}
            </p>
            <Link reloadDocument
              to={buildPath('/cadastro')}
              className="mt-lg inline-flex items-center justify-center border border-title bg-title px-xl py-md text-xs font-medium uppercase tracking-[0.14em] text-light transition-all hover:bg-transparent hover:text-title"
            >
              {content.hero.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-2xl sm:py-3xl">
        <div className="container mx-auto px-lg md:px-xl xl:px-[3.5rem]">
          <h2 className="font-title text-2xl text-title sm:text-3xl">{hub.title}</h2>
          <div className="mt-lg grid gap-lg md:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="rounded-sm border border-border bg-surface p-lg">
                <h3 className="font-title text-xl text-title">{item.label}</h3>
                <p className="mt-sm text-base leading-relaxed text-muted">{item.description}</p>
                <Link reloadDocument
                  to={buildPath(item.routePath)}
                  className="mt-md inline-flex text-sm font-medium uppercase tracking-[0.12em] text-title transition-colors hover:text-primary"
                >
                  {hub.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePage;
