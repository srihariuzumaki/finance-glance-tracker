
import { useState } from 'react';
import { Transaction } from '@/types/finance';
import { TransactionList } from '@/components/transactions/TransactionList';
import { TransactionForm } from '@/components/transactions/TransactionForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Re-use the initial transactions from Dashboard (in a real app, these would come from a shared store or API)
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
  {
    id: '5',
    description: 'Utilities',
    amount: -200,
    date: new Date('2023-04-20'),
  },
  {
    id: '6',
    description: 'Dining Out',
    amount: -80,
    date: new Date('2023-04-25'),
  },
  {
    id: '7',
    description: 'Side Project',
    amount: 300,
    date: new Date('2023-04-28'),
  }
];

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold mb-2">Transactions</h1>
        <p className="text-muted-foreground">Manage your transactions</p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-10" 
            placeholder="Search transactions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={openAddForm}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Transaction
        </Button>
      </div>

      {/* Transactions List */}
      <div className="finance-card">
        <h2 className="text-xl font-bold mb-4">All Transactions</h2>
        <TransactionList 
          transactions={filteredTransactions} 
          onEdit={openEditForm}
          onDelete={handleDeleteTransaction}
        />
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
