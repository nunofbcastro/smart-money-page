
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, PlusCircle, Menu, User, LogOut, Globe, Monitor, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransactionList from '@/components/TransactionList';
import AddTransactionForm from '@/components/AddTransactionForm';
import AccountsManager from '@/components/AccountsManager';
import CategoriesManager from '@/components/CategoriesManager';
import FamilyManager from '@/components/FamilyManager';
import FinancialCharts from '@/components/FinancialCharts';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t, language, setLanguage, theme, setTheme } = useLanguage();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = React.useState('overview');

  const menuItems = [
    { id: 'overview', label: t('overview'), icon: '📊' },
    { id: 'transactions', label: t('transactions'), icon: '💳' },
    { id: 'accounts', label: t('accounts'), icon: '🏦' },
    { id: 'categories', label: t('categories'), icon: '📂' },
    { id: 'family', label: t('family'), icon: '👥' },
    { id: 'analytics', label: t('analytics'), icon: '📈' },
  ];

  const languageOptions = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' }
  ];

  const themeOptions = [
    { value: 'system', label: t('system'), icon: Monitor },
    { value: 'light', label: t('light'), icon: Sun },
    { value: 'dark', label: t('dark'), icon: Moon }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('totalAssets')}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€12,543.21</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('monthlyBalance')}</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€1,234.56</div>
                  <p className="text-xs text-muted-foreground">
                    {t('positive')}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('income')}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">€3,456.78</div>
                  <p className="text-xs text-muted-foreground">
                    +15% este mês
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('expenses')}</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">€2,222.22</div>
                  <p className="text-xs text-muted-foreground">
                    -5% este mês
                  </p>
                </CardContent>
              </Card>
            </div>

            <FinancialCharts />

            <Card>
              <CardHeader>
                <CardTitle>{t('recentTransactions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList />
              </CardContent>
            </Card>
          </div>
        );

      case 'transactions':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('transactions')}</CardTitle>
                <CardDescription>
                  {t('welcome')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddTransactionForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('recentTransactions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList />
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-lg font-medium">{t('noTransactionsFound')}</p>
                  <p className="text-sm">{t('addFirstTransaction')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'accounts':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('accountManagement')}</CardTitle>
              <CardDescription>
                {t('manageAccounts')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AccountsManager />
            </CardContent>
          </Card>
        );

      case 'categories':
        return <CategoriesManager />;

      case 'family':
        return <FamilyManager />;

      case 'analytics':
        return (
          <div className="space-y-6">
            <FinancialCharts />
            <Card>
              <CardHeader>
                <CardTitle>{t('analytics')}</CardTitle>
                <CardDescription>
                  Análises detalhadas das suas finanças
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Funcionalidade em desenvolvimento...
                </p>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">€</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground hidden sm:block">{t('dashboard')}</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[130px]">
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
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themeOptions.map(option => {
                    const Icon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center">
                          <Icon className="w-4 h-4 mr-2" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* Mobile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {menuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={activeSection === item.id ? 'bg-accent' : ''}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    {t('profile')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
