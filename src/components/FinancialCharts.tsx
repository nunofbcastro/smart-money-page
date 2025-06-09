
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { useTransactions } from '@/contexts/TransactionContext';

const FinancialCharts = () => {
  const { transactions, categories, accounts } = useTransactions();

  // Dados para gráfico de receitas vs despesas por mês
  const monthlyData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, income: 0, expense: 0 };
    }
    
    if (transaction.type === 'income') {
      acc[monthKey].income += transaction.amount;
    } else {
      acc[monthKey].expense += transaction.amount;
    }
    
    return acc;
  }, {} as Record<string, { month: string; income: number; expense: number }>);

  const monthlyChartData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  // Dados para gráfico de pizza por categoria
  const categoryData = categories.map(category => {
    const total = transactions
      .filter(t => t.categoryId === category.id)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      name: category.name,
      value: total,
      type: category.type
    };
  }).filter(item => item.value > 0);

  // Dados para gráfico de contas
  const accountData = accounts.map(account => ({
    name: account.name,
    balance: account.balance,
    type: account.type
  }));

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const chartConfig = {
    income: {
      label: "Receitas",
      color: "hsl(var(--primary))",
    },
    expense: {
      label: "Despesas",
      color: "hsl(var(--destructive))",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Receitas vs Despesas */}
      <Card>
        <CardHeader>
          <CardTitle>Receitas vs Despesas Mensais</CardTitle>
          <CardDescription>Comparação mensal de entradas e saídas</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={monthlyChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="income" fill="var(--color-income)" />
              <Bar dataKey="expense" fill="var(--color-expense)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Pizza - Despesas por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
          <CardDescription>Distribuição dos gastos por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData.filter(item => item.type === 'expense')}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: R$ ${value.toFixed(2)}`}
                >
                  {categoryData.filter(item => item.type === 'expense').map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Saldos das Contas */}
      <Card>
        <CardHeader>
          <CardTitle>Saldos por Conta</CardTitle>
          <CardDescription>Distribuição do patrimônio por tipo de conta</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={accountData} layout="horizontal">
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="balance" fill="hsl(var(--primary))" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Simulação de Crescimento */}
      <Card>
        <CardHeader>
          <CardTitle>Projeção de Crescimento</CardTitle>
          <CardDescription>Simulação de crescimento patrimonial em 5 anos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  { year: 2024, conservative: 26350, moderate: 26350, aggressive: 26350 },
                  { year: 2025, conservative: 27668, moderate: 28458, aggressive: 29512 },
                  { year: 2026, conservative: 29051, moderate: 30735, aggressive: 33053 },
                  { year: 2027, conservative: 30504, moderate: 33194, aggressive: 37019 },
                  { year: 2028, conservative: 32029, moderate: 35849, aggressive: 41461 },
                  { year: 2029, conservative: 33630, moderate: 38717, aggressive: 46437 }
                ]}
              >
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip />
                <Line type="monotone" dataKey="conservative" stroke="#82ca9d" name="Conservador" />
                <Line type="monotone" dataKey="moderate" stroke="#8884d8" name="Moderado" />
                <Line type="monotone" dataKey="aggressive" stroke="#ff7300" name="Agressivo" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialCharts;
