import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';
import { BRAND_NAME } from '../content/brand';

const Hero = ({
  videoDesktop = "/assets/videohorizontal.mp4",
  videoMobile = "/assets/videovertical.mp4"
}) => {
  const { content } = useI18n();
  const heroContent = content.hero;
  const [desktopPlaying, setDesktopPlaying] = useState(false);
  const [mobilePlaying, setMobilePlaying] = useState(false);
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityRange = useTransform(scrollY, [0, 600], [1, 0]);
  
  const videoDesktopRef = useRef(null);
  const videoMobileRef = useRef(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const start = () => {
      clearTimeout(timer);
      [videoDesktopRef.current, videoMobileRef.current].forEach((video) => {
        if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
      });
      setDesktopPlaying(false);
      setMobilePlaying(false);
      if (reducedMotion.matches || navigator.connection?.saveData) return;
      timer = setTimeout(() => {
        const video = desktop.matches ? videoDesktopRef.current : videoMobileRef.current;
        if (!video) return;
        video.muted = true;
        video.src = desktop.matches ? videoDesktop : videoMobile;
        video.play().catch(() => { /* Keep the poster when autoplay is unavailable. */ });
      }, 1500);
    };
    start();
    desktop.addEventListener('change', start);
    reducedMotion.addEventListener('change', start);
    return () => {
      clearTimeout(timer);
      desktop.removeEventListener('change', start);
      reducedMotion.removeEventListener('change', start);
    };
  }, [videoDesktop, videoMobile]);

  return (
    <section id="inicio" className="relative min-h-screen w-full overflow-hidden bg-bg text-light">
      {/* Background Videos */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: yRange }}
      >
        <picture className="absolute inset-0">
          <source media="(min-width: 768px)" srcSet="/assets/optimized/hero-desktop.webp" width="1440" height="866" />
          <img src="/assets/optimized/hero-mobile.webp" alt="" aria-hidden="true" width="720" height="1280" fetchPriority="high" className="w-full h-full object-cover" />
        </picture>
        <video ref={videoDesktopRef} aria-hidden="true" width="1184" height="712"
          className={`absolute inset-0 hidden md:block w-full h-full object-cover transition-opacity duration-500 ${desktopPlaying ? 'opacity-100' : 'opacity-0'}`}
          muted loop playsInline preload="none" onPlaying={() => setDesktopPlaying(true)} />
        <video ref={videoMobileRef} aria-hidden="true" width="720" height="1280"
          className={`absolute inset-0 block md:hidden w-full h-full object-cover transition-opacity duration-500 ${mobilePlaying ? 'opacity-100' : 'opacity-0'}`}
          muted loop playsInline preload="none" onPlaying={() => setMobilePlaying(true)} />

        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(12,10,8,0.3)_0%,rgba(12,10,8,0.16)_30%,rgba(12,10,8,0.24)_58%,rgba(12,10,8,0.82)_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top,rgba(255,247,238,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(245,224,200,0.12),transparent_35%)] pointer-events-none" />
      </motion.div>

      <motion.div 
        className="relative z-20 flex min-h-screen flex-col"
        style={{ opacity: opacityRange }}
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-10 md:flex lg:px-14">
          <p className="text-[0.8rem] uppercase tracking-[0.22em] text-light/78">
            {heroContent.sideLabels.left}
          </p>
          <p className="text-[0.8rem] uppercase tracking-[0.22em] text-light/78">
            {heroContent.sideLabels.right}
          </p>
        </div>

        <div className="flex min-h-screen flex-col justify-end px-6 pb-4 pt-28 sm:px-8 sm:pb-5 md:px-12 md:pb-6 lg:px-16">
          <div className="flex justify-center">
            <div className="w-full">
              <h1 className="w-full text-center font-title text-[8.4vw] leading-[0.9] tracking-[-0.05em] text-light sm:text-[7.2vw] lg:text-[6.3vw]">
                {BRAND_NAME}
              </h1>
            </div>
          </div>

          <div className="mt-6 flex justify-center md:hidden">
            <a
              href={heroContent.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-light/80 bg-transparent px-7 text-xs font-medium uppercase tracking-[0.16em] text-light transition-all hover:bg-light hover:text-title"
            >
              {heroContent.ctaLabel}
            </a>
          </div>

          <p className="mx-auto mt-8 w-full max-w-[min(96vw,1500px)] text-center font-body text-[0.78rem] font-light leading-relaxed text-light/90 sm:text-[0.86rem] md:mt-10 md:text-[0.95rem]">
            {heroContent.tagline}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

