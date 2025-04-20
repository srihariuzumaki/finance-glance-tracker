
import { useState, useEffect } from 'react';
import { Transaction, MOCK_MONTHLY_DATA, formatCurrency } from '@/types/finance';
import { ExpensesChart } from '@/components/dashboard/ExpensesChart';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentTransactionCard } from '@/components/dashboard/RecentTransactionCard';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Button } from '@/components/ui/button';
import { BarChart2, PlusIcon, CreditCard, DollarSign } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Mock initial transactions
const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    description: 'Salary',
    amount: 3000,
    date: new Date('2023-04-01'),
  },
  {
    id: '2',
    description: 'Rent',
    amount: -1200,
    date: new Date('2023-04-05'),
  },
  {
    id: '3',
    description: 'Groceries',
    amount: -150,
    date: new Date('2023-04-10'),
  },
  {
    id: '4',
    description: 'Freelance Work',
    amount: 500,
    date: new Date('2023-04-15'),
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
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Chart */}
        <div className="lg:col-span-2">
          <div className="finance-card bg-finance-darkCard text-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold">Analytics</h2>
                <p className="text-sm text-white/70">Optimize your expenses</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{formatCurrency(135200.94)}</p>
              </div>
            </div>
            <ExpensesChart data={MOCK_MONTHLY_DATA} />
          </div>
          
          {/* Available Budget */}
          <div className="finance-card mt-6 bg-finance-orange">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white/80 text-sm">Available</h3>
                <h2 className="text-white text-2xl font-bold">this Month</h2>
              </div>
              <Button variant="outline" className="bg-white/20 text-white border-white/20 hover:bg-white/30">
                Change
              </Button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-4xl font-bold text-white">{formatCurrency(18000)}</p>
            </div>
            
            {/* Budget progress circle - simplified for now */}
            <div className="mt-6 flex items-center justify-center">
              <div className="relative h-32 w-32 rounded-full border-8 border-white/30 flex items-center justify-center">
                <p className="text-2xl font-bold text-white">{formatCurrency(10800)}</p>
              </div>
            </div>
            <p className="text-center mt-2 text-white font-medium">17 December</p>
          </div>
        </div>
        
        {/* Right Column - Activity */}
        <div>
          {/* Recent Transactions */}
          <div className="finance-card mb-6">
            <h3 className="font-bold">Operation</h3>
            <p className="text-sm text-muted-foreground mb-4">Spent this day</p>
            <div className="text-3xl font-bold mb-6">{formatCurrency(23570.20)}</div>
            
            {/* Progress bar indicator */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6">
              <div className="h-full bg-finance-green rounded-full w-2/3"></div>
            </div>
            
            {/* Recent transactions list */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span>S</span>
                  </div>
                  <div>
                    <p className="font-medium">Sean Kim</p>
                    <p className="text-xs text-muted-foreground">Transfer</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-finance-green font-medium">+$130.00</p>
                  <p className="text-xs text-muted-foreground">5:28 AM</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span>A</span>
                  </div>
                  <div>
                    <p className="font-medium">Apple</p>
                    <p className="text-xs text-muted-foreground">Purchase</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-finance-red font-medium">-$940.00</p>
                  <p className="text-xs text-muted-foreground">2:16 AM</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span>D</span>
                  </div>
                  <div>
                    <p className="font-medium">Dribbble</p>
                    <p className="text-xs text-muted-foreground">Purchase</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-finance-red font-medium">-$8.00</p>
                  <p className="text-xs text-muted-foreground">8:59 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Add Transaction Button */}
          <Button onClick={openAddForm} className="w-full gap-2 bg-finance-orange hover:bg-finance-orange/90 text-white">
            <PlusIcon className="h-5 w-5" />
            Add Transaction
          </Button>
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
