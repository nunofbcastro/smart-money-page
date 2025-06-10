
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
    heroSubtitle: "Ferramentas e formação para controlares o teu dinheiro como um profissional. Gestão inteligente e educação financeira.",
    startNow: "Começar Agora",
    watchDemo: "Ver Demo",

    // Header
    home: "Início",
    features: "Funcionalidades", 
    pricing: "Preços",
    about: "Sobre",
    contact: "Contacto",
    login: "Entrar",
    dashboard: "Painel",
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
    welcome: "Bem-vindo",
    noTransactionsFound: "Nenhuma transação encontrada",
    addFirstTransaction: "Adiciona a tua primeira transação usando o formulário acima.",
    accountManagement: "Gestão de Contas",
    manageAccounts: "Gere as tuas contas e tipos de investimento",
    newAccount: "Nova Conta",
    yourAccounts: "As tuas Contas",
    allAccountsList: "Lista de todas as tuas contas registadas",
    name: "Nome",
    type: "Tipo",
    balance: "Saldo",
    actions: "Ações",

    // Login
    financialManagement: "Gestão de Finanças",
    enterCredentials: "Introduz as tuas credenciais para aceder ao painel",
    username: "Utilizador",
    enterUsername: "Introduz o teu utilizador",
    password: "Palavra-passe",
    enterPassword: "Introduz a tua palavra-passe",
    enter: "Entrar",
    entering: "A entrar...",
    testCredentials: "Credenciais de teste:",
    user: "Utilizador: user123",
    pass: "Palavra-passe: user123",

    // Profile
    personalInfo: "Informações Pessoais",
    updateProfile: "Actualiza as tuas informações de perfil",
    fullName: "Nome completo",
    email: "Email",
    saveChanges: "Guardar alterações",
    preferences: "Preferências",
    languageTheme: "Configurações de idioma e tema",
    accountActions: "Acções da conta",
    changePassword: "Alterar palavra-passe",
    logoutAccount: "Sair da conta",

    // Landing Page
    aboutTitle: "Porque escolher a nossa plataforma?",
    aboutDescription: "Transformamos a gestão financeira numa experiência simples e intuitiva. Com tecnologia de ponta e educação financeira de qualidade, ajudamos-te a tomar o controlo total das tuas finanças.",
    featuresTitle: "Funcionalidades Poderosas",
    featuresDescription: "Descobre as funcionalidades que vão transformar a tua gestão financeira",
    automationTitle: "Automatização Inteligente",
    automationDesc: "Categorização automática de despesas e sincronização com os teus bancos",
    analysisTitle: "Análises Avançadas",
    analysisDesc: "Relatórios detalhados e insights personalizados sobre os teus hábitos financeiros",
    planningTitle: "Planeamento Financeiro",
    planningDesc: "Define objetivos e acompanha o progresso das tuas metas financeiras",
    educationTitle: "Educação Financeira",
    educationDesc: "Cursos e conteúdos educativos para melhorares a tua literacia financeira",
    testimonialsTitle: "O que dizem os nossos clientes",
    testimonial1: "Esta plataforma revolucionou a forma como giro as minhas finanças. Finalmente tenho controlo total!",
    testimonial2: "Interface intuitiva e funcionalidades incríveis. Recomendo a todos os meus amigos.",
    testimonial3: "O melhor investimento que fiz foi começar a usar esta ferramenta. As minhas poupanças duplicaram!",
    pricingTitle: "Planos para todos",
    free: "Gratuito",
    premium: "Premium",
    business: "Empresarial",
    monthly: "/mês",
    mostPopular: "Mais Popular",
    subscribe: "Subscrever",

    // Common
    currency: "Moeda",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    add: "Adicionar",
    create: "Criar",
    update: "Actualizar",

    // Theme options
    system: "Sistema",
    light: "Claro",
    dark: "Escuro"
  },
  en: {
    // Hero  
    heroTitle: "Master Your Finances with Clarity and Confidence",
    heroSubtitle: "Tools and training to control your money like a professional. Smart management and financial education.",
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
    welcome: "Welcome",
    noTransactionsFound: "No transactions found",
    addFirstTransaction: "Add your first transaction using the form above.",
    accountManagement: "Account Management",
    manageAccounts: "Manage your accounts and investment types",
    newAccount: "New Account",
    yourAccounts: "Your Accounts",
    allAccountsList: "List of all your registered accounts",
    name: "Name",
    type: "Type",
    balance: "Balance",
    actions: "Actions",

    // Login
    financialManagement: "Financial Management",
    enterCredentials: "Enter your credentials to access the dashboard",
    username: "Username",
    enterUsername: "Enter your username",
    password: "Password",
    enterPassword: "Enter your password",
    enter: "Login",
    entering: "Logging in...",
    testCredentials: "Test credentials:",
    user: "User: user123",
    pass: "Password: user123",

    // Profile
    personalInfo: "Personal Information",
    updateProfile: "Update your profile information",
    fullName: "Full name",
    email: "Email", 
    saveChanges: "Save changes",
    preferences: "Preferences",
    languageTheme: "Language and theme settings",
    accountActions: "Account actions",
    changePassword: "Change password",
    logoutAccount: "Logout",

    // Landing Page
    aboutTitle: "Why choose our platform?",
    aboutDescription: "We transform financial management into a simple and intuitive experience. With cutting-edge technology and quality financial education, we help you take complete control of your finances.",
    featuresTitle: "Powerful Features",
    featuresDescription: "Discover the features that will transform your financial management",
    automationTitle: "Smart Automation",
    automationDesc: "Automatic expense categorization and synchronization with your banks",
    analysisTitle: "Advanced Analysis",
    analysisDesc: "Detailed reports and personalized insights about your financial habits",
    planningTitle: "Financial Planning",
    planningDesc: "Set goals and track the progress of your financial targets",
    educationTitle: "Financial Education",
    educationDesc: "Courses and educational content to improve your financial literacy",
    testimonialsTitle: "What our clients say",
    testimonial1: "This platform revolutionized the way I manage my finances. I finally have complete control!",
    testimonial2: "Intuitive interface and incredible features. I recommend it to all my friends.",
    testimonial3: "The best investment I made was starting to use this tool. My savings doubled!",
    pricingTitle: "Plans for everyone",
    free: "Free",
    premium: "Premium",
    business: "Business",
    monthly: "/month",
    mostPopular: "Most Popular",
    subscribe: "Subscribe",

    // Common
    currency: "Currency",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    create: "Create",
    update: "Update",

    // Theme options
    system: "System",
    light: "Light",
    dark: "Dark"
  },
  es: {
    // Hero
    heroTitle: "Domina tus Finanzas con Claridad y Confianza", 
    heroSubtitle: "Herramientas y formación para controlar tu dinero como un profesional. Gestión inteligente y educación financiera.",
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
    welcome: "Bienvenido",
    noTransactionsFound: "No se encontraron transacciones",
    addFirstTransaction: "Añade tu primera transacción usando el formulario de arriba.",
    accountManagement: "Gestión de Cuentas",
    manageAccounts: "Gestiona tus cuentas y tipos de inversión",
    newAccount: "Nueva Cuenta",
    yourAccounts: "Tus Cuentas",
    allAccountsList: "Lista de todas tus cuentas registradas",
    name: "Nombre",
    type: "Tipo",
    balance: "Saldo",
    actions: "Acciones",

    // Login
    financialManagement: "Gestión Financiera",
    enterCredentials: "Introduce tus credenciales para acceder al panel",
    username: "Usuario",
    enterUsername: "Introduce tu usuario",
    password: "Contraseña",
    enterPassword: "Introduce tu contraseña",
    enter: "Entrar",
    entering: "Entrando...",
    testCredentials: "Credenciales de prueba:",
    user: "Usuario: user123",
    pass: "Contraseña: user123",

    // Profile
    personalInfo: "Información Personal",
    updateProfile: "Actualiza tu información de perfil",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    saveChanges: "Guardar cambios",
    preferences: "Preferencias", 
    languageTheme: "Configuración de idioma y tema",
    accountActions: "Acciones de cuenta",
    changePassword: "Cambiar contraseña",
    logoutAccount: "Cerrar sesión",

    // Landing Page
    aboutTitle: "¿Por qué elegir nuestra plataforma?",
    aboutDescription: "Transformamos la gestión financiera en una experiencia simple e intuitiva. Con tecnología de vanguardia y educación financiera de calidad, te ayudamos a tomar el control total de tus finanzas.",
    featuresTitle: "Características Poderosas",
    featuresDescription: "Descubre las características que transformarán tu gestión financiera",
    automationTitle: "Automatización Inteligente",
    automationDesc: "Categorización automática de gastos y sincronización con tus bancos",
    analysisTitle: "Análisis Avanzado",
    analysisDesc: "Reportes detallados e insights personalizados sobre tus hábitos financieros",
    planningTitle: "Planificación Financiera",
    planningDesc: "Define objetivos y sigue el progreso de tus metas financieras",
    educationTitle: "Educación Financiera",
    educationDesc: "Cursos y contenidos educativos para mejorar tu educación financiera",
    testimonialsTitle: "Lo que dicen nuestros clientes",
    testimonial1: "Esta plataforma revolucionó la forma en que gestiono mis finanzas. ¡Finalmente tengo control total!",
    testimonial2: "Interfaz intuitiva y características increíbles. Lo recomiendo a todos mis amigos.",
    testimonial3: "¡La mejor inversión que hice fue empezar a usar esta herramienta. Mis ahorros se duplicaron!",
    pricingTitle: "Planes para todos",
    free: "Gratuito",
    premium: "Premium",
    business: "Empresarial",
    monthly: "/mes",
    mostPopular: "Más Popular",
    subscribe: "Suscribirse",

    // Common
    currency: "Moneda",
    save: "Guardar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    add: "Agregar",
    create: "Crear",
    update: "Actualizar",

    // Theme options
    system: "Sistema",
    light: "Claro",
    dark: "Oscuro"
  },
  fr: {
    // Hero
    heroTitle: "Maîtrisez vos Finances avec Clarté et Confiance",
    heroSubtitle: "Outils et formation pour contrôler votre argent comme un professionnel. Gestion intelligente et éducation financière.",
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
    welcome: "Bienvenue",
    noTransactionsFound: "Aucune transaction trouvée",
    addFirstTransaction: "Ajoutez votre première transaction en utilisant le formulaire ci-dessus.",
    accountManagement: "Gestion des Comptes",
    manageAccounts: "Gérez vos comptes et types d'investissement",
    newAccount: "Nouveau Compte",
    yourAccounts: "Vos Comptes",
    allAccountsList: "Liste de tous vos comptes enregistrés",
    name: "Nom",
    type: "Type",
    balance: "Solde",
    actions: "Actions",

    // Login
    financialManagement: "Gestion Financière",
    enterCredentials: "Entrez vos identifiants pour accéder au tableau de bord",
    username: "Nom d'utilisateur",
    enterUsername: "Entrez votre nom d'utilisateur",
    password: "Mot de passe",
    enterPassword: "Entrez votre mot de passe",
    enter: "Se connecter",
    entering: "Connexion...",
    testCredentials: "Identifiants de test:",
    user: "Utilisateur: user123",
    pass: "Mot de passe: user123",

    // Profile
    personalInfo: "Informations Personnelles",
    updateProfile: "Mettez à jour vos informations de profil",
    fullName: "Nom complet",
    email: "E-mail",
    saveChanges: "Sauvegarder les modifications",
    preferences: "Préférences",
    languageTheme: "Paramètres de langue et de thème", 
    accountActions: "Actions du compte",
    changePassword: "Changer le mot de passe",
    logoutAccount: "Se déconnecter",

    // Landing Page
    aboutTitle: "Pourquoi choisir notre plateforme?",
    aboutDescription: "Nous transformons la gestion financière en une expérience simple et intuitive. Avec une technologie de pointe et une éducation financière de qualité, nous vous aidons à prendre le contrôle total de vos finances.",
    featuresTitle: "Fonctionnalités Puissantes",
    featuresDescription: "Découvrez les fonctionnalités qui transformeront votre gestion financière",
    automationTitle: "Automatisation Intelligente",
    automationDesc: "Catégorisation automatique des dépenses et synchronisation avec vos banques",
    analysisTitle: "Analyse Avancée",
    analysisDesc: "Rapports détaillés et insights personnalisés sur vos habitudes financières",
    planningTitle: "Planification Financière",
    planningDesc: "Définissez des objectifs et suivez le progrès de vos cibles financières",
    educationTitle: "Éducation Financière",
    educationDesc: "Cours et contenu éducatif pour améliorer votre littératie financière",
    testimonialsTitle: "Ce que disent nos clients",
    testimonial1: "Cette plateforme a révolutionné la façon dont je gère mes finances. J'ai enfin le contrôle total!",
    testimonial2: "Interface intuitive et fonctionnalités incroyables. Je le recommande à tous mes amis.",
    testimonial3: "Le meilleur investissement que j'ai fait était de commencer à utiliser cet outil. Mes économies ont doublé!",
    pricingTitle: "Plans pour tous",
    free: "Gratuit",
    premium: "Premium",
    business: "Entreprise",
    monthly: "/mois",
    mostPopular: "Plus Populaire",
    subscribe: "S'abonner",

    // Common
    currency: "Devise",
    save: "Sauvegarder",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    add: "Ajouter",
    create: "Créer",
    update: "Mettre à jour",

    // Theme options
    system: "Système",
    light: "Clair",
    dark: "Sombre"
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
