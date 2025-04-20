import { Transaction, formatCurrency, formatDate } from "@/types/finance";
import { Badge } from "@/components/ui/badge";

interface RecentTransactionCardProps {
  transactions: Transaction[];
  showCategory?: boolean;
}

export function RecentTransactionCard({ transactions, showCategory = false }: RecentTransactionCardProps) {
  // Get the 5 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="finance-card">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      
      {transactions.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No recent transactions</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-2 hover:bg-muted/30 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center">
                  {transaction.amount > 0 ? 
                    <span className="text-finance-green">+</span> : 
                    <span className="text-finance-red">-</span>
                  }
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{transaction.description}</p>
                    {showCategory && (
                      <Badge variant={transaction.amount > 0 ? "outline" : "secondary"} className="text-xs">
                        {transaction.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
              </div>
              <span className={transaction.amount > 0 ? "text-finance-green font-medium" : "text-finance-red font-medium"}>
                {transaction.amount > 0 ? "+" : ""}{formatCurrency(transaction.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
