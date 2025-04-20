
import { Transaction, formatCurrency, formatDate } from '@/types/finance';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TransactionListItemProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

export function TransactionListItem({ 
  transaction, 
  onEdit,
  onDelete
}: TransactionListItemProps) {
  const isIncome = transaction.amount > 0;

  return (
    <div className="transaction-item group">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
          isIncome ? 'bg-finance-green/10 text-finance-green' : 'bg-finance-red/10 text-finance-red'
        }`}>
          {isIncome ? '+' : '-'}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{transaction.description}</p>
            {transaction.category && (
              <Badge 
                variant={isIncome ? "success" : "destructive"} 
                className="opacity-80 text-xs"
              >
                {transaction.category}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={isIncome ? "transaction-amount-positive" : "transaction-amount-negative"}>
          {isIncome ? '+' : ''}{formatCurrency(transaction.amount)}
        </span>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex">
          {onEdit && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => onEdit(transaction)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
          
          {onDelete && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-finance-red" 
              onClick={() => onDelete(transaction.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
