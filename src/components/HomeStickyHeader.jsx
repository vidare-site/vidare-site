import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import LanguageSwitcher from './LanguageSwitcher';

const HomeStickyHeader = () => {
  const { content } = useI18n();
  const heroContent = content.hero;
  const navigation = content.navigation;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    { label: navigation.home, target: '#inicio' },
    { label: navigation.expertise, target: '#expertise' },
    { label: navigation.process, target: '#como-funciona' },
    { label: navigation.philosophy, target: '#sobre' },
    { label: navigation.resources, target: '#recursos' },
    { label: navigation.contact, target: '#contato' },
  ];

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const closeMenu = () => {
      setMenuOpen(false);
    };

    window.addEventListener('scroll', closeMenu, { passive: true });
    window.addEventListener('wheel', closeMenu, { passive: true });
    window.addEventListener('touchmove', closeMenu, { passive: true });

    return () => {
      window.removeEventListener('scroll', closeMenu);
      window.removeEventListener('wheel', closeMenu);
      window.removeEventListener('touchmove', closeMenu);
    };
  }, [menuOpen]);

  const handleMenuNavigation = (targetId) => {
    setMenuOpen(false);
    const element = document.querySelector(targetId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex w-full items-start justify-between bg-[rgba(12,10,8,0.08)] px-6 py-8 backdrop-blur-md sm:px-8 md:px-12 lg:px-16">
        <button
          type="button"
          aria-label={menuOpen ? navigation.closeMenu : navigation.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center bg-transparent text-light"
        >
          <span className="relative block h-5 w-6">
            <span className={`absolute left-0 top-1/2 h-px w-full -translate-y-[7px] bg-current transition-transform duration-200 ${menuOpen ? 'translate-y-0 rotate-45' : ''}`} />
            <span className={`absolute left-0 top-1/2 h-px w-full bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 top-1/2 h-px w-full translate-y-[7px] bg-current transition-transform duration-200 ${menuOpen ? 'translate-y-0 -rotate-45' : ''}`} />
          </span>
        </button>

        <div className="mx-auto hidden w-full max-w-[min(92vw,1200px)] md:block" />

        <div className="flex items-center gap-3 text-light">
          <LanguageSwitcher tone="light" />
          <a
            href={heroContent.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-end text-right text-xs font-medium uppercase tracking-[0.16em] text-light transition-opacity hover:opacity-70"
          >
            {heroContent.ctaLabel}
          </a>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="pointer-events-none fixed left-6 top-24 z-[60] sm:left-8 md:left-12 lg:left-16"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <nav
              aria-label={navigation.mainMenuAria}
              className="pointer-events-auto w-fit rounded-[22px] border border-light/12 bg-[rgba(10,8,7,0.32)] px-5 py-5 backdrop-blur-md"
            >
              <ul className="flex flex-col gap-3">
                {menuItems.map((item) => (
                  <li key={item.target}>
                    <button
                      type="button"
                      onClick={() => handleMenuNavigation(item.target)}
                      className="font-title text-xl leading-none tracking-[-0.03em] text-light transition-opacity hover:opacity-70 sm:text-2xl md:text-3xl"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeStickyHeader;
