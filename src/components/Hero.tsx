
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
    <section className="pt-20 pb-16 hero-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6 px-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('heroTitle')}
            </h1>
          </div>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
