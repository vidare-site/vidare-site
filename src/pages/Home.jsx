import React from 'react';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import About from '../components/About';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Expertise />
      <HowItWorks />
      <FAQ />
      <About />
      <CTA />
    </>
  );
};

export default Home;
