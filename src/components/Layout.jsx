import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import ScrollJourneyCTA from './ScrollJourneyCTA';
import SEOHead from './SEOHead';
import HomeStickyHeader from './HomeStickyHeader';
import { normalizeRoutePath } from '../i18n/config';

const Layout = ({ children }) => {
  const location = useLocation();
  const isHomePage = normalizeRoutePath(location.pathname) === '/';

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const target = document.querySelector(location.hash);
    if (!target) {
      return;
    }

    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col font-sans bg-bg text-body overflow-x-hidden ${isHomePage ? '' : 'pt-[var(--header-offset,80px)]'}`}>
      <SEOHead />
      <Header />
      {isHomePage && <HomeStickyHeader />}
      <ScrollJourneyCTA />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Layout;
