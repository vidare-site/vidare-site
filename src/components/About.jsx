import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';

const About = () => {
  const { content } = useI18n();
  const about = content.about;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="sobre" ref={containerRef} className="py-3xl bg-section-warm relative overflow-hidden">
      <div className="container mx-auto px-lg">
        <div className="flex flex-col lg:flex-row gap-2xl lg:items-center">

          {/* Text Content */}
          <motion.div
            className="lg:w-3/5"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-xs uppercase tracking-[0.2em] font-medium text-muted mb-sm">{about.eyebrow}</h2>
            <h3 className="text-3xl sm:text-4xl font-title text-title mb-lg leading-tight">{about.title}</h3>

            <div className="space-y-md text-body text-sm sm:text-base leading-relaxed mb-xl">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="p-lg bg-surface/50 border-l-[3px] border-primary">
              <h4 className="text-lg font-title text-title mb-xs">{about.meaningTitle}</h4>
              <p className="text-body text-sm leading-relaxed">
                {about.meaningText}
              </p>
            </div>
          </motion.div>

          {/* Image Content — photo + golden thin frame + green frame (outside) */}
          <motion.div
            className="lg:w-2/5 flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-w-[350px] lg:max-w-[320px]">
              <div className="p-9 sm:p-11 bg-[#d5ddd0] rounded-sm">
                <div className="border-[1.5px] border-[#c9a959]">
                  <img
                    src="/assets/07.webp"
                    alt={about.imageAlt}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="mt-5 px-2 text-center font-title text-base leading-relaxed text-title italic sm:text-lg">
                {about.quote}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
