
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'pt' | 'en' | 'es' | 'fr';
  setLanguage: (lang: 'pt' | 'en' | 'es' | 'fr') => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Navigation
    about: 'Sobre',
    features: 'Funcionalidades',
    pricing: 'Preços',
    testimonials: 'Testemunhos',
    faq: 'FAQ',
    contact: 'Contacto',
    
    // Hero Section
    heroTitle: 'Domina as tuas Finanças com Clareza e Confiança',
    heroSubtitle: 'Ferramentas e formação para controlares o teu dinheiro como um profissional.',
    startNow: 'Começar Agora',
    
    // About Section
    aboutTitle: 'Sobre o Nosso Serviço',
    aboutDescription: 'Oferecemos uma plataforma completa de gestão financeira que combina automação inteligente com educação prática, ajudando-te a alcançar os teus objetivos financeiros.',
    
    // Features
    featuresTitle: 'Funcionalidades Principais',
    automationTitle: 'Automação de Finanças',
    automationDesc: 'Categorização automática de despesas e receitas para poupares tempo.',
    analysisTitle: 'Análise Inteligente',
    analysisDesc: 'Relatórios detalhados que te ajudam a entender os teus hábitos financeiros.',
    planningTitle: 'Planeamento de Objetivos',
    planningDesc: 'Define e acompanha os teus objetivos financeiros com facilidade.',
    educationTitle: 'Educação Contínua',
    educationDesc: 'Cursos em vídeo e conteúdo educativo sobre literacia financeira.',
    
    // Testimonials
    testimonialsTitle: 'O Que Dizem os Nossos Utilizadores',
    testimonial1: 'Transformou completamente a minha relação com o dinheiro. Agora tenho controlo total sobre as minhas finanças.',
    testimonial2: 'A plataforma é intuitiva e os relatórios são muito úteis. Recomendo a todos os empreendedores.',
    testimonial3: 'Finalmente consigo poupar dinheiro de forma consistente. O planeamento de objetivos é fantástico!',
    
    // Pricing
    pricingTitle: 'Escolhe o Teu Plano',
    free: 'Gratuito',
    premium: 'Premium',
    business: 'Empresas',
    monthly: '/mês',
    subscribe: 'Subscrever',
    mostPopular: 'Mais Popular',
    
    // FAQ
    faqTitle: 'Perguntas Frequentes',
    
    // CTA
    ctaTitle: 'Estás pronto para transformar a tua vida financeira?',
    ctaSubtitle: 'Junta-te a milhares de pessoas que já tomaram controlo das suas finanças.',
    
    // Footer
    terms: 'Termos de Serviço',
    privacy: 'Política de Privacidade',
    security: 'Os teus dados são protegidos',
    copyright: '© 2025 Gestão de Finanças. Todos os direitos reservados.',
  },
  en: {
    // Navigation
    about: 'About',
    features: 'Features',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Master Your Finances with Clarity and Confidence',
    heroSubtitle: 'Tools and training to manage your money like a pro.',
    startNow: 'Get Started Now',
    
    // About Section
    aboutTitle: 'About Our Service',
    aboutDescription: 'We offer a complete financial management platform that combines intelligent automation with practical education, helping you achieve your financial goals.',
    
    // Features
    featuresTitle: 'Key Features',
    automationTitle: 'Financial Automation',
    automationDesc: 'Automatic categorization of expenses and income to save you time.',
    analysisTitle: 'Smart Analysis',
    analysisDesc: 'Detailed reports that help you understand your financial habits.',
    planningTitle: 'Goal Planning',
    planningDesc: 'Set and track your financial goals with ease.',
    educationTitle: 'Continuous Education',
    educationDesc: 'Video courses and educational content on financial literacy.',
    
    // Testimonials
    testimonialsTitle: 'What Our Users Say',
    testimonial1: 'Completely transformed my relationship with money. I now have total control over my finances.',
    testimonial2: 'The platform is intuitive and the reports are very useful. I recommend it to all entrepreneurs.',
    testimonial3: 'I can finally save money consistently. The goal planning is fantastic!',
    
    // Pricing
    pricingTitle: 'Choose Your Plan',
    free: 'Free',
    premium: 'Premium',
    business: 'Business',
    monthly: '/month',
    subscribe: 'Subscribe',
    mostPopular: 'Most Popular',
    
    // FAQ
    faqTitle: 'Frequently Asked Questions',
    
    // CTA
    ctaTitle: 'Ready to transform your financial life?',
    ctaSubtitle: 'Join thousands of people who have already taken control of their finances.',
    
    // Footer
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    security: 'Your data is protected',
    copyright: '© 2025 Financial Management. All rights reserved.',
  },
  es: {
    // Navigation
    about: 'Acerca de',
    features: 'Características',
    pricing: 'Precios',
    testimonials: 'Testimonios',
    faq: 'FAQ',
    contact: 'Contacto',
    
    // Hero Section
    heroTitle: 'Domina tus Finanzas con Claridad y Confianza',
    heroSubtitle: 'Herramientas y formación para manejar tu dinero como un profesional.',
    startNow: 'Comenzar Ahora',
    
    // About Section
    aboutTitle: 'Sobre Nuestro Servicio',
    aboutDescription: 'Ofrecemos una plataforma completa de gestión financiera que combina automatización inteligente con educación práctica.',
    
    // Features
    featuresTitle: 'Características Principales',
    automationTitle: 'Automatización Financiera',
    automationDesc: 'Categorización automática de gastos e ingresos para ahorrarte tiempo.',
    analysisTitle: 'Análisis Inteligente',
    analysisDesc: 'Informes detallados que te ayudan a entender tus hábitos financieros.',
    planningTitle: 'Planificación de Objetivos',
    planningDesc: 'Define y rastrea tus objetivos financieros con facilidad.',
    educationTitle: 'Educación Continua',
    educationDesc: 'Cursos en vídeo y contenido educativo sobre alfabetización financiera.',
    
    // Testimonials
    testimonialsTitle: 'Lo Que Dicen Nuestros Usuarios',
    testimonial1: 'Transformó completamente mi relación con el dinero. Ahora tengo control total sobre mis finanzas.',
    testimonial2: 'La plataforma es intuitiva y los informes son muy útiles. La recomiendo a todos los emprendedores.',
    testimonial3: 'Finalmente puedo ahorrar dinero de manera consistente. ¡La planificación de objetivos es fantástica!',
    
    // Pricing
    pricingTitle: 'Elige tu Plan',
    free: 'Gratis',
    premium: 'Premium',
    business: 'Empresas',
    monthly: '/mes',
    subscribe: 'Suscribirse',
    mostPopular: 'Más Popular',
    
    // FAQ
    faqTitle: 'Preguntas Frecuentes',
    
    // CTA
    ctaTitle: '¿Listo para transformar tu vida financiera?',
    ctaSubtitle: 'Únete a miles de personas que ya han tomado control de sus finanzas.',
    
    // Footer
    terms: 'Términos de Servicio',
    privacy: 'Política de Privacidad',
    security: 'Tus datos están protegidos',
    copyright: '© 2025 Gestión Financiera. Todos los derechos reservados.',
  },
  fr: {
    // Navigation
    about: 'À propos',
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    testimonials: 'Témoignages',
    faq: 'FAQ',
    contact: 'Contact',
    
    // Hero Section
    heroTitle: 'Maîtrisez vos Finances avec Clarté et Confiance',
    heroSubtitle: 'Outils et formation pour gérer votre argent comme un pro.',
    startNow: 'Commencer Maintenant',
    
    // About Section
    aboutTitle: 'À propos de Notre Service',
    aboutDescription: 'Nous offrons une plateforme complète de gestion financière qui combine automatisation intelligente et éducation pratique.',
    
    // Features
    featuresTitle: 'Fonctionnalités Principales',
    automationTitle: 'Automatisation Financière',
    automationDesc: 'Catégorisation automatique des dépenses et revenus pour vous faire gagner du temps.',
    analysisTitle: 'Analyse Intelligente',
    analysisDesc: 'Rapports détaillés qui vous aident à comprendre vos habitudes financières.',
    planningTitle: 'Planification d\'Objectifs',
    planningDesc: 'Définissez et suivez vos objectifs financiers avec facilité.',
    educationTitle: 'Éducation Continue',
    educationDesc: 'Cours vidéo et contenu éducatif sur la littératie financière.',
    
    // Testimonials
    testimonialsTitle: 'Ce Que Disent Nos Utilisateurs',
    testimonial1: 'A complètement transformé ma relation avec l\'argent. J\'ai maintenant un contrôle total sur mes finances.',
    testimonial2: 'La plateforme est intuitive et les rapports sont très utiles. Je la recommande à tous les entrepreneurs.',
    testimonial3: 'Je peux enfin économiser de l\'argent de manière cohérente. La planification d\'objectifs est fantastique!',
    
    // Pricing
    pricingTitle: 'Choisissez votre Plan',
    free: 'Gratuit',
    premium: 'Premium',
    business: 'Entreprises',
    monthly: '/mois',
    subscribe: 'S\'abonner',
    mostPopular: 'Le Plus Populaire',
    
    // FAQ
    faqTitle: 'Questions Fréquemment Posées',
    
    // CTA
    ctaTitle: 'Prêt à transformer votre vie financière?',
    ctaSubtitle: 'Rejoignez des milliers de personnes qui ont déjà pris le contrôle de leurs finances.',
    
    // Footer
    terms: 'Conditions de Service',
    privacy: 'Politique de Confidentialité',
    security: 'Vos données sont protégées',
    copyright: '© 2025 Gestion Financière. Tous droits réservés.',
  }
};

// Detect system language
const getSystemLanguage = (): 'pt' | 'en' | 'es' | 'fr' => {
  const systemLang = navigator.language.toLowerCase();
  if (systemLang.startsWith('pt')) return 'pt';
  if (systemLang.startsWith('es')) return 'es';
  if (systemLang.startsWith('fr')) return 'fr';
  return 'en'; // Default to English
};

// Detect system theme
const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'pt' | 'en' | 'es' | 'fr'>(() => {
    const saved = localStorage.getItem('language');
    if (saved && ['pt', 'en', 'es', 'fr'].includes(saved)) {
      return saved as 'pt' | 'en' | 'es' | 'fr';
    }
    return getSystemLanguage();
  });

  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved as 'light' | 'dark' | 'system';
    }
    return 'system';
  });

  const setLanguage = (lang: 'pt' | 'en' | 'es' | 'fr') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key;
  };

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    if (theme === 'system') {
      const systemIsDark = getSystemTheme() === 'dark';
      applyTheme(systemIsDark);
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme === 'dark');
    }
  }, [theme]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
