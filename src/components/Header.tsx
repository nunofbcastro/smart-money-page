
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">€</span>
            </div>
            <span className="text-xl font-bold text-dark gradient-text">
              Gestão de Finanças
            </span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">
              {t('about')}
            </a>
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">
              {t('features')}
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">
              {t('pricing')}
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">
              {t('testimonials')}
            </a>
          </nav>

          {/* Language Toggle & CTA */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="flex items-center space-x-1"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </Button>
            <Button 
              className="bg-gradient-primary hover:bg-primary-dark text-white font-medium"
              size="sm"
            >
              {t('startNow')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
