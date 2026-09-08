import React, { useRef, useEffect, useState } from 'react';
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

function useDraggableScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    const onMouseDown = (e) => {
      isDown = true;
      slider.classList.add('cursor-grabbing');
      slider.classList.remove('cursor-grab');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      slider.classList.remove('cursor-grabbing');
      slider.classList.add('cursor-grab');
    };
    const onMouseUp = () => {
      isDown = false;
      slider.classList.remove('cursor-grabbing');
      slider.classList.add('cursor-grab');
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2.5; // Smooth fast scrolling
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.classList.add('cursor-grab');
    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return ref;
}

const SectionBlock = ({ kicker, title, image, items, bgClass, slideLabel }) => {
  const scrollRef = useDraggableScroll();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className={`mb-0 ${bgClass || 'bg-light'}`}>
      {/* Wide Photo with Title Overlay */}
      <div className="relative w-full max-w-[1003px] mx-auto h-[60vh] md:h-[55vh] lg:h-[600px] xl:h-[650px] group overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-[center_20%] transition-transform duration-[2000ms] group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/40 p-xl pb-8 text-center md:pb-10">
          {kicker && (
            <p className="text-light/90 tracking-[0.2em] text-xs sm:text-sm font-medium mb-md md:mb-lg uppercase">
              {kicker}
            </p>
          )}
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-light font-title max-w-4xl px-4 leading-[1.2]">
            {title}
          </h2>
        </div>
      </div>

      {/* Draggable Carousel of Text Columns */}
      <div className="py-2xl md:py-3xl" ref={ref}>
        <div className="container mx-auto px-lg">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-xl xl:gap-2xl snap-x snap-mandatory pt-md pb-2xl select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                className="w-full md:w-[320px] lg:w-[350px] flex-shrink-0 snap-start flex flex-col px-[clamp(0.75rem,4vw,1rem)] md:px-0"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
              >
                <div className="w-full h-[1px] bg-title/20 mb-lg"></div>
                <h3 className="text-xl md:text-2xl font-title text-title mb-sm">{item.title}</h3>
                <p className="text-body text-sm md:text-base leading-relaxed text-muted pointer-events-none">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          <ProgressDots scrollRef={scrollRef} itemCount={items.length} slideLabel={slideLabel} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
};

const HowItWorks = () => {
  const { content } = useI18n();
  const slides = content.process.slides;

  return (
    <section id="como-funciona" className="overflow-hidden">
      {slides.map((slide, idx) => (
        <SectionBlock
          key={idx}
          {...slide}
          slideLabel={content.common.slideLabel}
        />
      ))}
    </section>
  );
};

export default HowItWorks;
