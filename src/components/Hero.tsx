
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark animate-gradient">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
      </div>
      
      {/* Animated circles */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              {t('heroSubtitle')}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 text-lg animate-pulse-green"
              >
                {t('startNow')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
              >
                <Play className="mr-2 w-5 h-5" />
                Ver Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-gray-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5,000+</div>
                <div className="text-sm">Utilizadores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-sm">Avaliação</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm">Satisfação</div>
              </div>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative animate-fade-in-up delay-300">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-primary rounded-lg h-4 w-3/4 mb-4"></div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="bg-gray-100 rounded h-3 w-1/3"></div>
                  <div className="bg-primary rounded h-3 w-1/4"></div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-primary/10 rounded h-16"></div>
                    <div className="bg-primary/20 rounded h-16"></div>
                    <div className="bg-primary/30 rounded h-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-gray-100 rounded h-2 w-full"></div>
                  <div className="bg-gray-100 rounded h-2 w-4/5"></div>
                  <div className="bg-gray-100 rounded h-2 w-3/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
