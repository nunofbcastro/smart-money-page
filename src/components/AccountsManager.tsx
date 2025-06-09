
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { useToast } from '@/hooks/use-toast';

const AccountsManager = () => {
  const { accounts, addAccount, removeAccount, updateAccount } = useTransactions();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'cash' as 'cash' | 'check' | 'crypto' | 'savings' | 'investment',
    balance: 0,
    currency: 'BRL'
  });

  const accountTypes = [
    { value: 'cash', label: 'Dinheiro' },
    { value: 'check', label: 'Conta Corrente' },
    { value: 'savings', label: 'Poupança' },
    { value: 'crypto', label: 'Criptomoeda' },
    { value: 'investment', label: 'Investimento' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAccount) {
      updateAccount(editingAccount, formData);
      toast({
        title: "Conta atualizada",
        description: `A conta "${formData.name}" foi atualizada com sucesso.`,
      });
      setEditingAccount(null);
    } else {
      addAccount(formData);
      toast({
        title: "Conta adicionada",
        description: `A conta "${formData.name}" foi criada com sucesso.`,
      });
    }
    
    setFormData({ name: '', type: 'cash', balance: 0, currency: 'BRL' });
    setShowForm(false);
  };

  const handleEdit = (account: any) => {
    setFormData({
      name: account.name,
      type: account.type,
      balance: account.balance,
      currency: account.currency
    });
    setEditingAccount(account.id);
    setShowForm(true);
  };

  const handleRemove = (id: string, name: string) => {
    removeAccount(id);
    toast({
      title: "Conta removida",
      description: `A conta "${name}" foi removida com sucesso.`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const getAccountTypeLabel = (type: string) => {
    return accountTypes.find(t => t.value === type)?.label || type;
  };

  const getAccountTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'cash': return 'default';
      case 'check': return 'secondary';
      case 'savings': return 'outline';
      case 'crypto': return 'destructive';
      case 'investment': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestão de Contas</CardTitle>
            <CardDescription>
              Gerencie suas contas e tipos de investimento
            </CardDescription>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Conta</span>
          </Button>
        </CardHeader>

        {showForm && (
          <CardContent className="border-t">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="name">Nome da Conta</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Conta Corrente Banco X"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Tipo de Conta</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="balance">Saldo Inicial</Label>
                <Input
                  id="balance"
                  type="number"
                  step="0.01"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit">
                  {editingAccount ? 'Atualizar' : 'Criar'} Conta
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingAccount(null);
                    setFormData({ name: '', type: 'cash', balance: 0, currency: 'BRL' });
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Suas Contas ({accounts.length})</CardTitle>
          <CardDescription>
            Lista de todas as suas contas registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Nenhuma conta encontrada. Adicione sua primeira conta.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">
                      {account.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getAccountTypeBadgeVariant(account.type)}>
                        {getAccountTypeLabel(account.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(account.balance)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(account)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(account.id, account.name)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsManager;
