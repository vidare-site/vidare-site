import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';

/* Instagram-style progress dots that show on mobile or when content overflows */
const ProgressDots = ({ scrollRef, itemCount, slideLabel }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const checkOverflow = () => {
      const hasOverflow = container.scrollWidth > container.clientWidth;
      setShowDots(hasOverflow);
    };

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.querySelector('.snap-start')?.offsetWidth || 0;
      const gap = 16; // xl gap
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, itemCount - 1));
    };

    checkOverflow();
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkOverflow);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [scrollRef, itemCount]);

  if (!showDots) return null;

  return (
    <div className="flex md:hidden items-center justify-center gap-2 mt-md">
      {Array.from({ length: itemCount }).map((_, i) => (
        <button
          key={i}
          aria-label={`${slideLabel} ${i + 1}`}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-title w-5' : 'bg-border'
            }`}
        />
      ))}
    </div>
  );
};

const ExpertiseCard = ({ title, description, certification }) => {
  return (
    <article className="flex flex-col">
      <div className="w-full h-[1px] bg-title/20 mb-lg"></div>
      <h3 className="text-xl md:text-2xl font-title text-title mb-sm">{title}</h3>
      <p className="text-body text-sm md:text-base leading-relaxed text-muted">
        {description}
      </p>
      <em className="text-xs text-muted font-normal mt-auto pt-sm border-t border-border-subtle inline-block">
        {certification}
      </em>
    </article>
  );
};

const Expertise = () => {
  const { content } = useI18n();
  const ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const expertise = content.expertise;
  const approaches = expertise.approaches;

  return (
    <section id="expertise" className="py-3xl bg-section-cream overflow-hidden">
      <div className="container mx-auto px-lg">
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-2xl w-full max-w-[800px] mx-auto px-sm"
        >
          <h2 className="text-3xl md:text-4xl font-title text-title mb-sm">{expertise.title}</h2>
          <p className="text-base text-muted w-full px-4">
            {expertise.subtitle}
          </p>
        </motion.div>

        {/* Horizontal scroll carousel */}
        <div className="flex overflow-x-auto gap-xl xl:gap-2xl snap-x snap-mandatory pt-md pb-2xl select-none cursor-grab" ref={scrollContainerRef} style={{ scrollbarWidth: 'none' }}>
          {approaches.map((item, index) => (
            <motion.div
              key={index}
              className="w-full md:w-[330px] lg:w-[320px] flex-shrink-0 snap-start px-[clamp(0.75rem,4vw,1rem)] md:px-0"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + (index * 0.15), ease: "easeOut" }}
              style={{ opacity: 1, transform: 'none' }}
            >
              <ExpertiseCard {...item} />
            </motion.div>
          ))}
        </div>
        <ProgressDots
          scrollRef={scrollContainerRef}
          itemCount={approaches.length}
          slideLabel={content.common.slideLabel}
        />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default Expertise;
