
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X, Sun, Moon, Monitor, User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLanguage } from './LanguageContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { language, setLanguage, theme, setTheme, t } = useLanguage();
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

  const languageOptions = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' }
  ];

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor
  };

  const ThemeIcon = themeIcons[theme];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">€</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              Gestão de Finanças
            </span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('about')}
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('features')}
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('pricing')}
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('testimonials')}
            </button>
          </nav>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-auto">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Theme Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ThemeIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  <Monitor className="w-4 h-4 mr-2" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              size="sm"
              onClick={handleLoginClick}
            >
              {t('startNow')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
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
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('about')} 
                className="block w-full text-left py-3 px-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                {t('about')}
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left py-3 px-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                {t('features')}
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left py-3 px-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                {t('pricing')}
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="block w-full text-left py-3 px-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
              >
                {t('testimonials')}
              </button>
              
              <div className="pt-4 border-t border-border space-y-3">
                {/* Mobile Language Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Idioma</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-full">
                      <Globe className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Theme Selector */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tema</label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-full">
                      <ThemeIcon className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center">
                          <Sun className="w-4 h-4 mr-2" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center">
                          <Moon className="w-4 h-4 mr-2" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center">
                          <Monitor className="w-4 h-4 mr-2" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
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
