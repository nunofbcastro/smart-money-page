
import React from 'react';
import { useLanguage } from './LanguageContext';
import { Button } from './ui/button';

const CTA = () => {
  const { language } = useLanguage();

  const content = {
    pt: {
      title: "Pronto para transformar suas finanças?",
      subtitle: "Junte-se a milhares de usuários que já estão no controle total de seu dinheiro.",
      cta: "Agendar Demo",
      trial: "Teste grátis por 14 dias"
    },
    en: {
      title: "Ready to transform your finances?",
      subtitle: "Join thousands of users who are already in complete control of their money.",
      cta: "Schedule Demo",
      trial: "14-day free trial"
    }
  };

  const text = content[language];

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          {text.title}
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {text.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
          >
            {text.cta}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold"
          >
            {text.trial}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
