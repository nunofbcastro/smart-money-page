
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
    },
    es: {
      title: "¿Listo para transformar tus finanzas?",
      subtitle: "Únete a miles de usuarios que ya tienen control total de su dinero.",
      cta: "Agendar Demo",
      trial: "Prueba gratuita de 14 días"
    },
    fr: {
      title: "Prêt à transformer vos finances?",
      subtitle: "Rejoignez des milliers d'utilisateurs qui ont déjà le contrôle total de leur argent.",
      cta: "Planifier une Démo",
      trial: "Essai gratuit de 14 jours"
    }
  };

  const text = content[language] || content.pt;

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-primary-foreground mb-6">
          {text.title}
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          {text.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-background text-foreground hover:bg-background/90 hover:text-foreground px-8 py-3 text-lg font-semibold transition-colors"
          >
            {text.cta}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3 text-lg font-semibold bg-transparent transition-colors"
          >
            {text.trial}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
