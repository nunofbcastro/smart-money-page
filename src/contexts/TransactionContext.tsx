
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  parentId?: string;
  children?: Category[];
}

export interface Account {
  id: string;
  name: string;
  type: 'cash' | 'check' | 'crypto' | 'savings' | 'investment';
  balance: number;
  currency: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  categoryId?: string;
  accountId: string;
  memberId?: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  growthRate: number;
  timeframe: number; // in months
}

interface TransactionContextType {
  transactions: Transaction[];
  categories: Category[];
  accounts: Account[];
  familyMembers: FamilyMember[];
  scenarios: Scenario[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  removeCategory: (id: string) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  removeAccount: (id: string) => void;
  updateAccount: (id: string, account: Partial<Account>) => void;
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  removeFamilyMember: (id: string) => void;
  addScenario: (scenario: Omit<Scenario, 'id'>) => void;
  removeScenario: (id: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

// Mock data inicial
const initialCategories: Category[] = [
  { id: '1', name: 'Alimentação', type: 'expense' },
  { id: '2', name: 'Transporte', type: 'expense' },
  { id: '3', name: 'Salário', type: 'income' },
  { id: '4', name: 'Freelance', type: 'income' },
  { id: '5', name: 'Saúde', type: 'expense' },
  { id: '6', name: 'Entretenimento', type: 'expense' },
];

const initialAccounts: Account[] = [
  { id: '1', name: 'Conta Corrente', type: 'check', balance: 2500.00, currency: 'BRL' },
  { id: '2', name: 'Poupança', type: 'savings', balance: 15000.00, currency: 'BRL' },
  { id: '3', name: 'Carteira Bitcoin', type: 'crypto', balance: 8500.00, currency: 'BRL' },
  { id: '4', name: 'Dinheiro', type: 'cash', balance: 350.00, currency: 'BRL' },
];

const initialFamilyMembers: FamilyMember[] = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', role: 'admin' },
  { id: '2', name: 'Maria Silva', email: 'maria@email.com', role: 'member' },
];

const initialScenarios: Scenario[] = [
  { id: '1', name: 'Conservador', description: 'Crescimento baixo e estável', growthRate: 0.05, timeframe: 60 },
  { id: '2', name: 'Moderado', description: 'Crescimento médio com algum risco', growthRate: 0.08, timeframe: 60 },
  { id: '3', name: 'Agressivo', description: 'Alto crescimento com maior risco', growthRate: 0.12, timeframe: 60 },
];

const initialTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário Janeiro',
    amount: 5000.00,
    date: '2024-01-01',
    type: 'income',
    categoryId: '3',
    accountId: '1',
    memberId: '1'
  },
  {
    id: '2',
    description: 'Supermercado',
    amount: 350.00,
    date: '2024-01-02',
    type: 'expense',
    categoryId: '1',
    accountId: '1',
    memberId: '1'
  },
  {
    id: '3',
    description: 'Uber',
    amount: 25.00,
    date: '2024-01-03',
    type: 'expense',
    categoryId: '2',
    accountId: '4',
    memberId: '2'
  },
];

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedCategories = localStorage.getItem('categories');
    const savedAccounts = localStorage.getItem('accounts');
    const savedFamilyMembers = localStorage.getItem('familyMembers');
    const savedScenarios = localStorage.getItem('scenarios');

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions(initialTransactions);
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(initialCategories);
    }

    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts));
    } else {
      setAccounts(initialAccounts);
    }

    if (savedFamilyMembers) {
      setFamilyMembers(JSON.parse(savedFamilyMembers));
    } else {
      setFamilyMembers(initialFamilyMembers);
    }

    if (savedScenarios) {
      setScenarios(JSON.parse(savedScenarios));
    } else {
      setScenarios(initialScenarios);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('familyMembers', JSON.stringify(familyMembers));
  }, [familyMembers]);

  useEffect(() => {
    localStorage.setItem('scenarios', JSON.stringify(scenarios));
  }, [scenarios]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const removeTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  const updateTransaction = (id: string, updatedTransaction: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(transaction =>
        transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
      )
    );
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const removeCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const addAccount = (account: Omit<Account, 'id'>) => {
    const newAccount: Account = {
      ...account,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const removeAccount = (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
  };

  const updateAccount = (id: string, updatedAccount: Partial<Account>) => {
    setAccounts(prev =>
      prev.map(account =>
        account.id === id ? { ...account, ...updatedAccount } : account
      )
    );
  };

  const addFamilyMember = (member: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...member,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setFamilyMembers(prev => [...prev, newMember]);
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const addScenario = (scenario: Omit<Scenario, 'id'>) => {
    const newScenario: Scenario = {
      ...scenario,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setScenarios(prev => [...prev, newScenario]);
  };

  const removeScenario = (id: string) => {
    setScenarios(prev => prev.filter(scenario => scenario.id !== id));
  };

  return (
    <TransactionContext.Provider value={{
      transactions,
      categories,
      accounts,
      familyMembers,
      scenarios,
      addTransaction,
      removeTransaction,
      updateTransaction,
      addCategory,
      removeCategory,
      addAccount,
      removeAccount,
      updateAccount,
      addFamilyMember,
      removeFamilyMember,
      addScenario,
      removeScenario,
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
