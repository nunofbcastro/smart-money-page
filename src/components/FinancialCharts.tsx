
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useTransactions } from '@/contexts/TransactionContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = {
  income: 'hsl(var(--primary))',
  expense: 'hsl(var(--destructive))',
  savings: 'hsl(var(--success))',
  investments: 'hsl(var(--warning))',
};

const FinancialCharts = () => {
  const { transactions, accounts, categories } = useTransactions();

  // Monthly data
  const getMonthlyData = () => {
    const monthlyMap = new Map();
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { month: monthKey, income: 0, expense: 0 });
      }
      
      const monthData = monthlyMap.get(monthKey);
      if (transaction.type === 'income') {
        monthData.income += transaction.amount;
      } else {
        monthData.expense += transaction.amount;
      }
    });
    
    return Array.from(monthlyMap.values()).sort((a, b) => a.month.localeCompare(b.month));
  };

  // Category distribution
  const getCategoryData = () => {
    const categoryMap = new Map();
    
    transactions
      .filter(t => t.categoryId)
      .forEach(transaction => {
        const category = categories.find(c => c.id === transaction.categoryId);
        const categoryName = category?.name || 'Outros';
        
        if (!categoryMap.has(categoryName)) {
          categoryMap.set(categoryName, 0);
        }
        
        categoryMap.set(categoryName, categoryMap.get(categoryName) + transaction.amount);
      });
    
    return Array.from(categoryMap.entries()).map(([name, value]) => ({
      name,
      value,
      fill: COLORS.expense
    }));
  };

  // Account distribution
  const getAccountData = () => {
    return accounts.map(account => ({
      name: account.name,
      value: account.balance,
      fill: account.balance >= 0 ? COLORS.income : COLORS.expense
    }));
  };

  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData();
  const accountData = getAccountData();

  const chartConfig = {
    income: {
      label: "Receitas",
      color: COLORS.income,
    },
    expense: {
      label: "Despesas", 
      color: COLORS.expense,
    },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Receitas vs Despesas Mensais</CardTitle>
            <CardDescription>
              Comparação mensal das suas receitas e despesas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => {
                      const [year, month] = value.split('-');
                      return `${month}/${year.slice(-2)}`;
                    }}
                  />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="income" fill={COLORS.income} name="Receitas" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill={COLORS.expense} name="Despesas" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>
              Como seus gastos estão distribuídos por categoria
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.expense} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Account Balances */}
        <Card>
          <CardHeader>
            <CardTitle>Saldos das Contas</CardTitle>
            <CardDescription>
              Distribuição do patrimônio por conta
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accountData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill={COLORS.income} name="Saldo" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Savings Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Economia</CardTitle>
            <CardDescription>
              Evolução do seu saldo mensal ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-xs fill-muted-foreground"
                    tickFormatter={(value) => {
                      const [year, month] = value.split('-');
                      return `${month}/${year.slice(-2)}`;
                    }}
                  />
                  <YAxis className="text-xs fill-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="income" 
                    stroke={COLORS.income} 
                    strokeWidth={2}
                    name="Receitas"
                    dot={{ fill: COLORS.income, strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expense" 
                    stroke={COLORS.expense} 
                    strokeWidth={2}
                    name="Despesas"
                    dot={{ fill: COLORS.expense, strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialCharts;
