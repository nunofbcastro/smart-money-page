
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr';
type Theme = 'light' | 'dark' | 'system';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Hero
    heroTitle: "Domina as tuas Finanças com Clareza e Confiança",
    heroSubtitle: "A solução completa para gerir o teu dinheiro, acompanhar gastos e alcançar os teus objetivos financeiros.",
    startNow: "Começar Agora",
    watchDemo: "Ver Demo",

    // Header
    home: "Início",
    features: "Funcionalidades", 
    pricing: "Preços",
    about: "Sobre",
    contact: "Contacto",
    login: "Entrar",
    dashboard: "Dashboard",
    language: "Idioma",
    theme: "Tema",

    // Dashboard
    overview: "Visão Geral",
    transactions: "Transações",
    accounts: "Contas",
    categories: "Categorias", 
    family: "Família",
    analytics: "Análises",
    totalAssets: "Patrimônio Total",
    monthlyBalance: "Saldo Mensal",
    income: "Receitas",
    expenses: "Despesas",
    positive: "Positivo",
    negative: "Negativo",
    recentTransactions: "Transações Recentes",
    profile: "Perfil",
    logout: "Sair",

    // Profile
    personalInfo: "Informações Pessoais",
    updateProfile: "Atualize suas informações de perfil",
    username: "Nome de usuário",
    fullName: "Nome completo",
    email: "Email",
    saveChanges: "Salvar alterações",
    preferences: "Preferências",
    languageTheme: "Configurações de idioma e tema",
    accountActions: "Ações da conta",
    changePassword: "Alterar senha",
    logoutAccount: "Sair da conta",

    // Common
    currency: "Moeda",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    add: "Adicionar",
    create: "Criar",
    update: "Atualizar"
  },
  en: {
    // Hero  
    heroTitle: "Master Your Finances with Clarity and Confidence",
    heroSubtitle: "The complete solution to manage your money, track expenses and achieve your financial goals.",
    startNow: "Start Now",
    watchDemo: "Watch Demo",

    // Header
    home: "Home",
    features: "Features",
    pricing: "Pricing", 
    about: "About",
    contact: "Contact",
    login: "Login",
    dashboard: "Dashboard",
    language: "Language",
    theme: "Theme",

    // Dashboard
    overview: "Overview",
    transactions: "Transactions",
    accounts: "Accounts", 
    categories: "Categories",
    family: "Family",
    analytics: "Analytics",
    totalAssets: "Total Assets",
    monthlyBalance: "Monthly Balance",
    income: "Income",
    expenses: "Expenses",
    positive: "Positive",
    negative: "Negative", 
    recentTransactions: "Recent Transactions",
    profile: "Profile",
    logout: "Logout",

    // Profile
    personalInfo: "Personal Information",
    updateProfile: "Update your profile information",
    username: "Username",
    fullName: "Full name",
    email: "Email", 
    saveChanges: "Save changes",
    preferences: "Preferences",
    languageTheme: "Language and theme settings",
    accountActions: "Account actions",
    changePassword: "Change password",
    logoutAccount: "Logout",

    // Common
    currency: "Currency",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    create: "Create",
    update: "Update"
  },
  es: {
    // Hero
    heroTitle: "Domina tus Finanzas con Claridad y Confianza", 
    heroSubtitle: "La solución completa para gestionar tu dinero, seguir gastos y alcanzar tus objetivos financieros.",
    startNow: "Empezar Ahora",
    watchDemo: "Ver Demo",

    // Header
    home: "Inicio",
    features: "Características",
    pricing: "Precios",
    about: "Acerca de",
    contact: "Contacto", 
    login: "Iniciar sesión",
    dashboard: "Panel",
    language: "Idioma",
    theme: "Tema",

    // Dashboard
    overview: "Resumen",
    transactions: "Transacciones",
    accounts: "Cuentas",
    categories: "Categorías",
    family: "Familia", 
    analytics: "Análisis",
    totalAssets: "Activos Totales",
    monthlyBalance: "Balance Mensual",
    income: "Ingresos",
    expenses: "Gastos",
    positive: "Positivo",
    negative: "Negativo",
    recentTransactions: "Transacciones Recientes",
    profile: "Perfil",
    logout: "Cerrar sesión",

    // Profile
    personalInfo: "Información Personal",
    updateProfile: "Actualiza tu información de perfil",
    username: "Nombre de usuario",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    saveChanges: "Guardar cambios",
    preferences: "Preferencias", 
    languageTheme: "Configuración de idioma y tema",
    accountActions: "Acciones de cuenta",
    changePassword: "Cambiar contraseña",
    logoutAccount: "Cerrar sesión",

    // Common
    currency: "Moneda",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    add: "Agregar",
    create: "Crear",
    update: "Actualizar"
  },
  fr: {
    // Hero
    heroTitle: "Maîtrisez vos Finances avec Clarté et Confiance",
    heroSubtitle: "La solution complète pour gérer votre argent, suivre les dépenses et atteindre vos objectifs financiers.",
    startNow: "Commencer Maintenant", 
    watchDemo: "Voir la Démo",

    // Header
    home: "Accueil",
    features: "Fonctionnalités",
    pricing: "Tarifs",
    about: "À propos",
    contact: "Contact",
    login: "Connexion",
    dashboard: "Tableau de bord",
    language: "Langue",
    theme: "Thème",

    // Dashboard  
    overview: "Aperçu",
    transactions: "Transactions", 
    accounts: "Comptes",
    categories: "Catégories",
    family: "Famille",
    analytics: "Analyses",
    totalAssets: "Actifs Totaux",
    monthlyBalance: "Solde Mensuel",
    income: "Revenus",
    expenses: "Dépenses", 
    positive: "Positif",
    negative: "Négatif",
    recentTransactions: "Transactions Récentes",
    profile: "Profil",
    logout: "Déconnexion",

    // Profile
    personalInfo: "Informations Personnelles",
    updateProfile: "Mettez à jour vos informations de profil",
    username: "Nom d'utilisateur",
    fullName: "Nom complet",
    email: "E-mail",
    saveChanges: "Sauvegarder les modifications",
    preferences: "Préférences",
    languageTheme: "Paramètres de langue et de thème", 
    accountActions: "Actions du compte",
    changePassword: "Changer le mot de passe",
    logoutAccount: "Se déconnecter",

    // Common
    currency: "Devise",
    save: "Sauvegarder",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    add: "Ajouter",
    create: "Créer",
    update: "Mettre à jour"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const getSystemLanguage = (): Language => {
  const systemLang = navigator.language.slice(0, 2) as Language;
  return ['pt', 'en', 'es', 'fr'].includes(systemLang) ? systemLang : 'pt';
};

const getSystemTheme = (): Theme => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return saved ? (saved as Language) : getSystemLanguage();
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? (saved as Theme) : 'system';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = getSystemTheme();
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
