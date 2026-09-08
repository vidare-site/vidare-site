import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';

const CookieConsent = () => {
  const { content } = useI18n();
  const consent = content.cookieConsent;
  const storageKey = 'vidareConsentChoice';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedChoice = localStorage.getItem(storageKey);
    if (!savedChoice) {
      // Small delay to prevent layout shift flash
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Re-apply if already saved across reloads
      const status = savedChoice === 'accept' ? 'granted' : 'denied';
      if (window.__vidareConsent && typeof window.__vidareConsent.update === 'function') {
        window.__vidareConsent.update(status);
      }
    }
  }, []);

  const handleDecision = (choice) => {
    try {
      localStorage.setItem(storageKey, choice);
    } catch (e) {
      console.warn("Could not save consent preference.");
    }
    
    const status = choice === 'accept' ? 'granted' : 'denied';
    if (window.__vidareConsent && typeof window.__vidareConsent.update === 'function') {
      window.__vidareConsent.update(status);
    }
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 w-full z-50 p-md"
        >
          <div className="container mx-auto max-w-5xl bg-surface border border-border shadow-2xl p-xl flex flex-col md:flex-row items-center gap-xl">
            <div className="flex-1">
              <h3 className="font-title text-title text-lg md:text-xl font-semibold mb-sm">{consent.title}</h3>
              <p className="text-body text-sm md:text-base leading-relaxed">
                {consent.body}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-md w-full md:w-auto shrink-0">
              <button 
                onClick={() => handleDecision('reject')}
                className="w-full sm:w-auto px-lg py-sm border border-border text-muted uppercase text-xs tracking-widest hover:border-title hover:text-title transition-colors"
              >
                {consent.reject}
              </button>
              <button 
                onClick={() => handleDecision('accept')}
                className="w-full sm:w-auto px-lg py-sm bg-title text-light border border-title uppercase text-xs tracking-widest hover:bg-transparent hover:text-title transition-colors"
              >
                {consent.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
