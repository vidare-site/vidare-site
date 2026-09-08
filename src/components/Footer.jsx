import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Email from './icons/Email';
// Ensure correct case: the svgr generated them as Whatsapp.js, Email.js, Instagram.js
import Whatsapp from './icons/Whatsapp';
import InstagramIcon from './icons/Instagram'; 
import InstagramFeedEmbed from './InstagramFeedEmbed';
import { useI18n } from '../i18n/LanguageProvider';

const Footer = () => {
  const { content, buildPath } = useI18n();
  const footer = content.footer;
  const [status, setStatus] = useState('');
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { label: content.navigation.home, to: '#inicio' },
    { label: content.navigation.expertise, to: '#expertise' },
    { label: content.navigation.process, to: '#como-funciona' },
    { label: content.navigation.philosophy, to: '#sobre' },
    { label: content.navigation.resources, to: '#recursos' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus('SUCCESS');
        setTimeout(() => {
          form.reset();
          setStatus('');
        }, 10000);
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  return (
    <footer id="contato" className="bg-bg py-2xl border-t border-border">
      <div className="container mx-auto px-lg">
        {/* Top Instagram & Resources (from resources block just above footer) */}
        <div id="recursos" className="grid md:grid-cols-2 gap-xl mb-3xl">
          <div>
            <h2 className="text-2xl sm:text-3xl mb-sm font-title">{footer.resourcesTitle}</h2>
            <p className="text-muted mb-md text-base leading-relaxed">
              {footer.resourcesDescription}
            </p>
            <div className="flex flex-wrap gap-sm">
              <a 
                href="https://subscribepage.io/vidare" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-xl py-md border border-border-hover text-title uppercase tracking-widest text-xs font-medium hover:bg-surface transition-colors"
              >
                {footer.resourcesButton}
              </a>
              <a 
                href={content.hero.ctaHref} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-xl py-md bg-title text-light uppercase tracking-widest text-xs font-medium hover:bg-transparent hover:text-title hover:border hover:border-title transition-all border border-transparent"
              >
                {footer.infoButton}
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-title mb-xs">{footer.instagramTitle}</h3>
            <p className="text-xs text-muted tracking-wide mb-md">{footer.instagramSubtitle}</p>
            <InstagramFeedEmbed />
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-xl lg:gap-2xl">
          {/* Brand & Links */}
          <div className="md:col-span-5 lg:col-span-4 space-y-xl">
            <section className="max-w-[30rem] pr-4 md:pr-6 lg:pr-8">
              <h3 className="text-xl font-title mb-xs">{footer.brandName}</h3>
              <p className="text-xs text-muted tracking-wider uppercase mb-xs">{footer.availability}</p>
              <p className="text-sm text-body leading-relaxed max-w-[28rem]">
                {footer.brandDescription}
              </p>
            </section>
            
            <nav aria-label={footer.quickLinksAria}>
              <h4 className="text-lg font-title mb-sm">{footer.quickLinksTitle}</h4>
              <ul className="space-y-sm text-body">
                {quickLinks.map((item) => (
                  <li key={item.to}>
                    <Link to={buildPath(item.to)} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contacts */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="mb-md text-base font-title tracking-[0.02em] text-title">{footer.contactsTitle}</h4>
            <ul className="space-y-md">
              <li>
                <a href="mailto:ricardo@vidare.eu" className="flex items-center gap-sm text-body text-base transition-colors hover:text-primary group">
                  <span className="flex w-10 h-10 rounded bg-surface items-center justify-center border border-border group-hover:border-primary transition-colors">
                    <Email className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                  </span>
                  <span>ricardo@vidare.eu</span>
                </a>
              </li>
              <li>
                <a href={content.hero.ctaHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-sm text-body text-base transition-colors hover:text-primary group">
                  <span className="flex w-10 h-10 rounded bg-surface items-center justify-center border border-border group-hover:border-primary transition-colors">
                    <Whatsapp className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                  </span>
                  <span>{footer.contactPhone}</span>
                </a>
              </li>
              <li>
                <a href="https://instagram.com/ricardocorrea.psi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-sm text-body text-base transition-colors hover:text-primary group">
                  <span className="flex w-10 h-10 rounded bg-surface items-center justify-center border border-border group-hover:border-primary transition-colors">
                    <InstagramIcon className="w-5 h-5 opacity-70 group-hover:opacity-100" />
                  </span>
                  <span>@ricardocorrea.psi</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-4 lg:col-span-5">
            <h4 className="text-lg font-title mb-md">{footer.messageTitle}</h4>
            {status === 'SUCCESS' ? (
              <div className="text-center p-xl bg-surface border border-border">
                <h4 className="font-title text-xl text-title mb-sm">{footer.successTitle}</h4>
                <p className="text-muted text-sm relative">{footer.successBody}</p>
              </div>
            ) : (
              <form action="https://formspree.io/f/xojnavvb" method="POST" onSubmit={handleSubmit} className="flex flex-col gap-sm">
                <input type="hidden" name="_next" value="" />
                <input type="hidden" name="_subject" value={footer.formSubject} />
                
                <input type="text" name="full_name" placeholder={footer.form.fullName} required className="w-full p-sm border border-border bg-bg text-body focus:outline-none focus:border-title transition-colors placeholder-muted" />
                <input type="tel" name="whatsapp" placeholder={footer.form.whatsapp} required className="w-full p-sm border border-border bg-bg text-body focus:outline-none focus:border-title transition-colors placeholder-muted" />
                <input type="email" name="email" placeholder={footer.form.email} required className="w-full p-sm border border-border bg-bg text-body focus:outline-none focus:border-title transition-colors placeholder-muted" />
                
                <div className="flex flex-col">
                  <textarea name="message" rows="4" maxLength="500" placeholder={footer.form.message} required className="w-full p-sm border border-border bg-bg text-body focus:outline-none focus:border-title transition-colors placeholder-muted resize-y min-h-[120px]"></textarea>
                  <span className="text-[10px] text-muted text-right mt-1">{footer.form.maxChars}</span>
                </div>
                
                {status === 'ERROR' && <p className="text-xs text-red-500">{footer.form.error}</p>}
                
                <button type="submit" className="self-start mt-sm px-xl py-md bg-title text-light text-xs font-medium uppercase tracking-[0.12em] hover:bg-transparent hover:text-title border border-transparent hover:border-title transition-all">
                  {footer.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Crisis Alert */}
        <div className="mt-2xl p-lg bg-surface border border-border flex flex-col sm:flex-row items-center sm:items-start gap-md text-sm text-body leading-relaxed">
          <div className="w-12 h-12 flex-shrink-0 opacity-50">
            <img src="/assets/13.webp" alt={footer.crisisImageAlt} loading="lazy" className="w-full h-full object-cover rounded" />
          </div>
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[0.18em] text-muted">
              {footer.crisisTitle}
            </p>
            <p>
              {footer.crisisText}
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-xl pt-lg border-t border-border-subtle text-xs text-muted text-center sm:text-left">
          <p>© {currentYear} {footer.legal}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
