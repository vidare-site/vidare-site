import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import { normalizeRoutePath } from '../i18n/config';

const ScrollJourneyCTA = () => {
  const location = useLocation();
  const { content, buildPath } = useI18n();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const nearTop = latest < 180;
    const goingUp = latest < previous;

    setVisible(!nearTop && goingUp);
  });

  if (normalizeRoutePath(location.pathname) !== '/') {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 sm:bottom-8"
      initial={false}
      animate={{
        y: visible ? 0 : 120,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={buildPath('/cadastro')}
        className="pointer-events-auto inline-flex min-h-[58px] items-center justify-between gap-4 rounded-full border border-title/15 bg-[rgba(249,248,244,0.84)] px-5 py-3 text-title shadow-[0_8px_30px_rgba(30,24,20,0.08)] backdrop-blur-md transition-all hover:bg-[rgba(249,248,244,0.92)]"
      >
        <span className="font-title text-[1rem] italic tracking-[-0.01em] sm:text-[1.08rem]">
          {content.floatingCta.label}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-title/20">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="translate-x-[1px]"
            aria-hidden="true"
          >
            <path
              d="M7 17L17 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M9 7H17V15"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
};

export default ScrollJourneyCTA;
