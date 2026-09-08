import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import LogoDark from './icons/Logo';
import LogoLight from './icons/LogoClaro1';
import { useI18n } from '../i18n/LanguageProvider';
import { normalizeRoutePath } from '../i18n/config';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { content, buildPath } = useI18n();
  const navigation = content.navigation;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const routePath = normalizeRoutePath(location.pathname);
  const navItems = [
    { label: navigation.home, target: '#inicio' },
    { label: navigation.expertise, target: '#expertise' },
    { label: navigation.process, target: '#como-funciona' },
    { label: navigation.philosophy, target: '#sobre' },
    { label: navigation.resources, target: '#recursos' },
  ];

  // Scroll direction for header hide/show
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
    
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  if (routePath === '/') {
    return null;
  }

  // Handle hash navigation
  const handleNavClick = (e, targetId) => {
    setMobileMenuOpen(false);
    if (routePath === '/') {
      e.preventDefault();
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
       // Let the Link navigate to /#targetId normally
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 w-full z-[1000] border-b transition-colors duration-300 ${
        isScrolled 
          ? 'bg-surface/90 border-border backdrop-blur-md' 
          : 'bg-transparent border-transparent'
      }`}
      >
      <div className="container mx-auto px-lg py-sm min-h-[70px] flex items-center justify-between">
        
        {/* Logo */}
        <Link to={buildPath('/')} className="flex-shrink-0 mr-sm">
          {/* We will toggle these via CSS or handle SVGs correctly soon */}
          <div className="w-[140px] text-title hidden sm:block">
            <LogoDark width="100%" height="auto" />
          </div>
          <div className="w-[140px] text-title sm:hidden">
            <LogoLight width="100%" height="auto" /> 
            {/* assuming we might want light logo on mobile hero, adjust as needed */}
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-end items-center mr-sm">
          <ul className="flex items-center gap-md">
            {navItems.map((item) => (
              <li key={item.target}>
                <Link
                  to={buildPath(item.target)}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className="text-sm uppercase tracking-wider hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-sm">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <a 
            href={content.hero.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center gap-2 px-xl py-md bg-title text-light text-xs font-medium uppercase tracking-[0.12em] transition-all hover:bg-transparent hover:text-title border border-transparent hover:border-title"
          >
            {navigation.cta}
          </a>
          
          <button 
            className="md:hidden flex flex-col items-center justify-center p-xs w-[44px] h-[44px] text-title relative z-50 rounded bg-transparent hover:bg-surface-hover transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? navigation.closeMenu : navigation.openMenu}
          >
            <span className={`w-5 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${mobileMenuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`}></span>
            <span className={`w-5 h-[1.5px] bg-current rounded-full transition-opacity duration-300 mt-1 mb-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${mobileMenuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-[100%] right-sm w-[min(260px,calc(100vw-2rem))] bg-surface shadow-lg border border-border border-t-0 rounded-b-lg p-md flex flex-col items-end z-[999]">
            <ul className="flex flex-col items-end w-full">
              <li className="w-full py-sm flex justify-end">
                <LanguageSwitcher />
              </li>
              {navItems.map((item) => (
                <li key={item.target} className="w-full text-right py-sm">
                  <Link
                    to={buildPath(item.target)}
                    onClick={(e) => handleNavClick(e, item.target)}
                    className="block text-title hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="w-full mt-4">
                <a 
                  href={content.hero.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full px-lg py-sm bg-title text-light text-xs font-medium uppercase tracking-[0.12em] mt-sm"
                >
                  {navigation.cta}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
