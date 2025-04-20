
import { useState } from 'react';
import { Transaction, MOCK_MONTHLY_DATA, formatCurrency } from '@/types/finance';
import { ExpensesChart } from '@/components/dashboard/ExpensesChart';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTransactionCard } from '@/components/dashboard/RecentTransactionCard';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Button } from '@/components/ui/button';
import { PlusIcon, CreditCard, DollarSign, PieChart } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Mock initial transactions
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Salary',
    amount: 3000,
    date: new Date('2023-04-01'),
    category: 'Other',
  },
  {
    id: '2',
    description: 'Rent',
    amount: -1200,
    date: new Date('2023-04-05'),
    category: 'Housing',
  },
  {
    id: '3',
    description: 'Groceries',
    amount: -150,
    date: new Date('2023-04-10'),
    category: 'Food',
  },
  {
    id: '4',
    description: 'Freelance Work',
    amount: 500,
    date: new Date('2023-04-15'),
    category: 'Other',
  },
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);

  // Calculate totals for the summary
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const availableBudget = balance * 0.6; // Simple calculation for demo purposes

  // Handle transaction creation
  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transactionData,
      id: uuidv4(),
    };
    setTransactions(prev => [...prev, newTransaction]);
  };

  // Handle transaction edit
  const handleEditTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;
    
    setTransactions(prev => 
      prev.map(t => 
        t.id === editingTransaction.id 
          ? { ...transactionData, id: editingTransaction.id } 
          : t
      )
    );
  };

  // Handle transaction deletion
  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // Open form for new transaction
  const openAddForm = () => {
    setEditingTransaction(undefined);
    setIsFormOpen(true);
  };

  // Open form for editing
  const openEditForm = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  // Handle form submission
  const handleSaveTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      handleEditTransaction(transactionData);
    } else {
      handleAddTransaction(transactionData);
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Your financial overview at a glance</p>
      </div>

      {/* Key Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard 
          title="Balance" 
          value={formatCurrency(balance)}
          icon={<DollarSign className="h-5 w-5 text-primary" />} 
          trend={{ value: "8.2%", positive: true }}
        />
        <StatCard 
          title="Income" 
          value={formatCurrency(totalIncome)} 
          className="bg-finance-green/10"
          trend={{ value: "5.1%", positive: true }}
        />
        <StatCard 
          title="Expenses" 
          value={formatCurrency(totalExpenses)} 
          className="bg-finance-red/10"
          trend={{ value: "2.3%", positive: false }}
        />
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="finance-card">
          <h2 className="text-lg font-semibold mb-4">Monthly Expenses</h2>
          <ExpensesChart data={MOCK_MONTHLY_DATA} />
        </div>
        <div className="finance-card">
          <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>

      {/* Recent Transactions and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTransactionCard transactions={transactions.slice(0, 5)} />
        </div>
        <div>
          <div className="finance-card mb-4">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button onClick={openAddForm} className="w-full gap-2">
                <PlusIcon className="h-5 w-5" />
                Add Transaction
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <PieChart className="h-5 w-5" />
                View Categories
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Form Modal */}
      <TransactionForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveTransaction}
        transaction={editingTransaction}
      />
    </div>
  );
}
