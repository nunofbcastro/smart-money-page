
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const CTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-dark animate-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            {t('ctaSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold animate-pulse-green"
            >
              {t('startNow')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
            >
              Agendar Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>{t('security')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Sem compromisso</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Cancelamento grátis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
