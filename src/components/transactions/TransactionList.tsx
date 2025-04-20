
import { useMemo } from 'react';
import { Transaction } from '@/types/finance';
import { cn } from '@/lib/utils';
import { TransactionListItem } from './TransactionListItem';

interface TransactionListProps {
  transactions: Transaction[];
  className?: string;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

export function TransactionList({ 
  transactions, 
  className,
  onEdit,
  onDelete
}: TransactionListProps) {
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [transactions]);

  if (sortedTransactions.length === 0) {
    return (
      <div className={cn("p-6 text-center", className)}>
        <p className="text-muted-foreground">No transactions to display</p>
      </div>
    );
  }

  return (
    <div className={cn("divide-y divide-border/50", className)}>
      {sortedTransactions.map((transaction) => (
        <TransactionListItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
