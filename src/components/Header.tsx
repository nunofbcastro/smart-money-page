
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('about')}
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('features')}
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('pricing')}
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {t('testimonials')}
            </button>
          </nav>

          {/* Desktop Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
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
              className="bg-primary hover:bg-primary-dark text-white font-medium"
              size="sm"
              onClick={handleLoginClick}
            >
              {t('startNow')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left py-2 text-gray-600 hover:text-primary transition-colors"
              >
                {t('about')}
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left py-2 text-gray-600 hover:text-primary transition-colors"
              >
                {t('features')}
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left py-2 text-gray-600 hover:text-primary transition-colors"
              >
                {t('pricing')}
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="block w-full text-left py-2 text-gray-600 hover:text-primary transition-colors"
              >
                {t('testimonials')}
              </button>
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
                  className="w-full justify-start"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{language.toUpperCase()}</span>
                </Button>
                <Button 
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium"
                  onClick={handleLoginClick}
                >
                  {t('startNow')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
