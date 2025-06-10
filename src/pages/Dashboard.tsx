
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions } from '@/contexts/TransactionContext';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, TrendingUp, TrendingDown, DollarSign, PiggyBank, User, Settings, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AddTransactionForm from '@/components/AddTransactionForm';
import TransactionList from '@/components/TransactionList';
import FinancialCharts from '@/components/FinancialCharts';
import AccountsManager from '@/components/AccountsManager';
import CategoriesManager from '@/components/CategoriesManager';
import FamilyManager from '@/components/FamilyManager';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { transactions, accounts } = useTransactions();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calculate statistics from real transactions
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const totalAssets = accounts.reduce((sum, account) => sum + account.balance, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const stats = [
    {
      title: t('totalAssets'),
      value: formatCurrency(totalAssets),
      change: totalAssets >= 0 ? t('positive') : t('negative'),
      trend: totalAssets >= 0 ? "up" : "down",
      icon: PiggyBank,
    },
    {
      title: t('monthlyBalance'),
      value: formatCurrency(balance),
      change: balance >= 0 ? t('positive') : t('negative'),
      trend: balance >= 0 ? "up" : "down",
      icon: DollarSign,
    },
    {
      title: t('income'),
      value: formatCurrency(totalIncome),
      change: `${transactions.filter(t => t.type === 'income').length} transações`,
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: t('expenses'),
      value: formatCurrency(totalExpenses),
      change: `${transactions.filter(t => t.type === 'expense').length} transações`,
      trend: "down",
      icon: TrendingDown,
    },
  ];

  const tabItems = [
    { value: 'overview', label: t('overview') },
    { value: 'transactions', label: t('transactions') },
    { value: 'accounts', label: t('accounts') },
    { value: 'categories', label: t('categories') },
    { value: 'family', label: t('family') },
    { value: 'analytics', label: t('analytics') },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg sm:text-xl">€</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">Dashboard Financeiro</h1>
                <p className="text-sm text-muted-foreground">Bem-vindo, {user?.username}!</p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user?.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Settings className="w-4 h-4 mr-2" />
                  {t('profile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Desktop/Tablet Tabs */}
          <div className="hidden sm:block">
            <TabsList className="grid w-full grid-cols-6">
              {tabItems.map((item) => (
                <TabsTrigger key={item.value} value={item.value} className="text-sm">
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Mobile Dropdown */}
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {tabItems.find(item => item.value === activeTab)?.label}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full min-w-[200px]">
                {tabItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.value} 
                    onClick={() => setActiveTab(item.value)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Badge 
                          variant={stat.trend === 'up' ? 'default' : stat.trend === 'down' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {stat.change}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Add Transaction Form */}
            <AddTransactionForm />

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('recentTransactions')}</CardTitle>
                <CardDescription>Últimas 5 movimentações</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionList limit={5} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionList />
          </TabsContent>

          <TabsContent value="accounts">
            <AccountsManager />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManager />
          </TabsContent>

          <TabsContent value="family">
            <FamilyManager />
          </TabsContent>

          <TabsContent value="analytics">
            <FinancialCharts />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
