
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTransactions } from '@/contexts/TransactionContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';
import AddTransactionForm from '@/components/AddTransactionForm';
import TransactionList from '@/components/TransactionList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { transactions } = useTransactions();
  const navigate = useNavigate();

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const stats = [
    {
      title: "Saldo Total",
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
    {
      title: "Total de Transações",
      value: transactions.length.toString(),
      change: "Registros",
      trend: "neutral",
      icon: CreditCard,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">€</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <div className="mb-8">
          <AddTransactionForm />
        </div>

        {/* Transactions List */}
        <TransactionList />
      </main>
    </div>
  );
};

export default Dashboard;
