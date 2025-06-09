
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions } from '@/contexts/TransactionContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, TrendingUp, TrendingDown, DollarSign, CreditCard, Users, PiggyBank } from 'lucide-react';
import AddTransactionForm from '@/components/AddTransactionForm';
import TransactionList from '@/components/TransactionList';
import FinancialCharts from '@/components/FinancialCharts';
import AccountsManager from '@/components/AccountsManager';
import CategoriesManager from '@/components/CategoriesManager';
import FamilyManager from '@/components/FamilyManager';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { transactions, accounts } = useTransactions();
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
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const stats = [
    {
      title: "Patrimônio Total",
      value: formatCurrency(totalAssets),
      change: totalAssets >= 0 ? "Positivo" : "Negativo",
      trend: totalAssets >= 0 ? "up" : "down",
      icon: PiggyBank,
    },
    {
      title: "Saldo Mensal",
      value: formatCurrency(balance),
      change: balance >= 0 ? "Positivo" : "Negativo",
      trend: balance >= 0 ? "up" : "down",
      icon: DollarSign,
    },
    {
      title: "Receitas",
      value: formatCurrency(totalIncome),
      change: `${transactions.filter(t => t.type === 'income').length} transações`,
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Despesas",
      value: formatCurrency(totalExpenses),
      change: `${transactions.filter(t => t.type === 'expense').length} transações`,
      trend: "down",
      icon: TrendingDown,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">€</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Financeiro</h1>
                <p className="text-sm text-gray-500">Bem-vindo, {user?.username}!</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="accounts">Contas</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="family">Família</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-gray-400" />
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
                <CardTitle>Transações Recentes</CardTitle>
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
