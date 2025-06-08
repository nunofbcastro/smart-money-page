
import React from 'react';
import { LanguageProvider } from '@/components/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <About />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
