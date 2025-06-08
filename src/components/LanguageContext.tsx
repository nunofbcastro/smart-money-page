
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
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
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
