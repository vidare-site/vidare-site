import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';

const CTA = () => {
  const { content } = useI18n();
  const cta = content.cta;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-3xl bg-surface relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-lg">
        
        <div className="flex flex-col md:flex-row items-center gap-xl md:gap-2xl">
          <motion.div 
            className="w-full md:w-1/2 relative aspect-[3/2] overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src="/assets/35.webp" 
              alt={cta.imageAlt} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-title text-title mb-sm leading-tight">{cta.title}</h2>
            <p className="text-lg md:text-xl text-muted mb-md font-normal leading-relaxed">
              {cta.lead}
            </p>
            <p className="text-body leading-relaxed mb-xl">
              {cta.body}
            </p>
            
            <a 
              href="https://wa.me/5522988583868?text=Oi%20Ricardo%2C%20quero%20saber%20como%20come%C3%A7ar%20a%20minha%20jornada%20com%20a%20Vidare." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex px-2xl py-md bg-title text-light text-xs font-medium uppercase tracking-[0.12em] hover:bg-transparent hover:text-title border border-bg hover:border-title transition-all"
            >
              {cta.button}
            </a>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default CTA;
