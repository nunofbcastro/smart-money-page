
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Trash2 } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { useToast } from '@/hooks/use-toast';

const CategoriesManager = () => {
  const { categories, addCategory, removeCategory } = useTransactions();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'income' | 'expense',
    parentId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData = {
      name: formData.name,
      type: formData.type,
      parentId: formData.parentId || undefined
    };
    
    addCategory(categoryData);
    toast({
      title: "Categoria adicionada",
      description: `A categoria "${formData.name}" foi criada com sucesso.`,
    });
    
    setFormData({ name: '', type: 'expense', parentId: '' });
    setShowForm(false);
  };

  const handleRemove = (id: string, name: string) => {
    removeCategory(id);
    toast({
      title: "Categoria removida",
      description: `A categoria "${name}" foi removida com sucesso.`,
    });
  };

  const incomeCategories = categories.filter(cat => cat.type === 'income');
  const expenseCategories = categories.filter(cat => cat.type === 'expense');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gestão de Categorias</CardTitle>
            <CardDescription>
              Organize suas receitas e despesas por categorias
            </CardDescription>
          </div>
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Nova Categoria</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Nova Categoria</DialogTitle>
                <DialogDescription>
                  Crie uma nova categoria para organizar suas transações
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome da Categoria</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Alimentação, Salário"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: 'income' | 'expense') => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="parent">Categoria Pai (opcional)</Label>
                  <Select 
                    value={formData.parentId} 
                    onValueChange={(value) => setFormData({ ...formData, parentId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Nenhuma (categoria principal)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-parent">Nenhuma (categoria principal)</SelectItem>
                      {categories
                        .filter(cat => cat.type === formData.type && !cat.parentId)
                        .map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2">
                  <Button type="submit">Criar Categoria</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ name: '', type: 'expense', parentId: '' });
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categorias de Receita */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Categorias de Receita ({incomeCategories.length})</CardTitle>
            <CardDescription>
              Categorias para organizar suas fontes de renda
            </CardDescription>
          </CardHeader>
          <CardContent>
            {incomeCategories.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma categoria de receita encontrada.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        {category.parentId && '└ '}
                        {category.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(category.id, category.name)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Categorias de Despesa */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Categorias de Despesa ({expenseCategories.length})</CardTitle>
            <CardDescription>
              Categorias para organizar seus gastos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {expenseCategories.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma categoria de despesa encontrada.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        {category.parentId && '└ '}
                        {category.name}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(category.id, category.name)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CategoriesManager;
