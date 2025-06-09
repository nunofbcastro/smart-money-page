
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Users } from 'lucide-react';
import { useTransactions } from '@/contexts/TransactionContext';
import { useToast } from '@/hooks/use-toast';

const FamilyManager = () => {
  const { familyMembers, addFamilyMember, removeFamilyMember } = useTransactions();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'member' as 'admin' | 'member'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addFamilyMember(formData);
    toast({
      title: "Membro adicionado",
      description: `${formData.name} foi adicionado à família com sucesso.`,
    });
    
    setFormData({ name: '', email: '', role: 'member' });
    setShowForm(false);
  };

  const handleRemove = (id: string, name: string) => {
    removeFamilyMember(id);
    toast({
      title: "Membro removido",
      description: `${name} foi removido da família.`,
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'default' : 'secondary';
  };

  const getRoleLabel = (role: string) => {
    return role === 'admin' ? 'Administrador' : 'Membro';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Gestão Familiar</span>
            </CardTitle>
            <CardDescription>
              Convide familiares para acompanhar as finanças colaborativamente
            </CardDescription>
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Convidar Membro</span>
          </Button>
        </CardHeader>

        {showForm && (
          <CardContent className="border-t">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Maria Silva"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="maria@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">Permissão</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value: 'admin' | 'member') => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a permissão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Membro (visualizar e adicionar)</SelectItem>
                    <SelectItem value="admin">Administrador (controle total)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button type="submit">Enviar Convite</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ name: '', email: '', role: 'member' });
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
          <CardTitle>Membros da Família ({familyMembers.length})</CardTitle>
          <CardDescription>
            Lista de todos os membros com acesso às finanças familiares
          </CardDescription>
        </CardHeader>
        <CardContent>
          {familyMembers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Nenhum membro encontrado. Convide familiares para começar.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Permissão</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {familyMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {member.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {member.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(member.role)}>
                        {getRoleLabel(member.role)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(member.id, member.name)}
                        className="text-red-600 hover:text-red-800"
                        disabled={member.role === 'admin' && familyMembers.filter(m => m.role === 'admin').length === 1}
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

      <Card>
        <CardHeader>
          <CardTitle>Recursos Colaborativos</CardTitle>
          <CardDescription>
            Funcionalidades disponíveis para gestão familiar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">👥 Controle de Acesso</h4>
              <p className="text-sm text-gray-600">
                Defina permissões específicas para cada membro da família
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">📊 Visão Unificada</h4>
              <p className="text-sm text-gray-600">
                Todos os membros visualizam o mesmo dashboard consolidado
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">💰 Responsabilidades</h4>
              <p className="text-sm text-gray-600">
                Identifique quem registrou cada transação
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Metas Compartilhadas</h4>
              <p className="text-sm text-gray-600">
                Trabalhem juntos para atingir objetivos financeiros
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FamilyManager;
