import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from '../i18n/LanguageProvider';

const FAQ = () => {
  const { content } = useI18n();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const faq = content.faq;
  const faqs = faq.items;

  return (
    <section id="faq" className="py-3xl bg-section-sage">
      <div className="container mx-auto px-lg max-w-[800px]">
        <motion.div 
          ref={ref}
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-title text-light mb-sm">{faq.title}</h2>
          <p className="text-lg text-light/80 max-w-prose mx-auto">
            {faq.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Accordion type="single" collapsible className="w-full bg-surface/95 backdrop-blur rounded p-lg md:p-xl shadow-lg border border-border/10">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-title hover:text-primary transition-colors text-left font-title text-xl md:text-2xl py-md">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-body text-base leading-relaxed pt-2 pb-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
