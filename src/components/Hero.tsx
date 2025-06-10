
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-primary/20 via-transparent to-primary/20 bg-[length:200%_200%]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-primary/15 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-primary/20 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
          {/* Left Column - Text Content */}
          <div className="flex-1 text-center lg:text-left mb-12 lg:mb-0 pt-20 lg:pt-0">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                {t('heroTitle')}
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
                {t('heroSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse-green"
                  onClick={handleGetStarted}
                >
                  {t('startNow')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-3 text-lg font-semibold border-2 hover:bg-accent transition-colors text-foreground border-border hover:text-accent-foreground"
                >
                  <Play className="mr-2 w-5 h-5" />
                  {t('watchDemo')}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-muted-foreground">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5,000+</div>
                  <div className="text-sm">Utilizadores</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9★</div>
                  <div className="text-sm">Avaliação</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm">Satisfação</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Preview */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="bg-card rounded-2xl shadow-2xl border border-border p-6 animate-fade-in-up">
                {/* Mock Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
                    <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
                  </div>
                  <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
                </div>

                {/* Mock Chart Area */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex items-end space-x-2 h-32">
                    <div className="bg-primary rounded-t w-8 h-16 animate-pulse"></div>
                    <div className="bg-primary/80 rounded-t w-8 h-24 animate-pulse delay-100"></div>
                    <div className="bg-primary/60 rounded-t w-8 h-20 animate-pulse delay-200"></div>
                    <div className="bg-primary/90 rounded-t w-8 h-28 animate-pulse delay-300"></div>
                    <div className="bg-primary rounded-t w-8 h-32 animate-pulse delay-400"></div>
                  </div>
                </div>

                {/* Mock Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="h-3 bg-primary/60 rounded w-16 mb-2 animate-pulse"></div>
                    <div className="h-5 bg-foreground/80 rounded w-20 animate-pulse delay-100"></div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="h-3 bg-primary/60 rounded w-14 mb-2 animate-pulse delay-200"></div>
                    <div className="h-5 bg-foreground/80 rounded w-18 animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>

              {/* Floating Elements Around Dashboard */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-primary/30 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
