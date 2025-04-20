
import { useMemo } from 'react';
import { Transaction, formatCurrency } from '@/types/finance';

interface SummaryCardsProps {
  transactions: Transaction[];
}

export function SummaryCards({ transactions }: SummaryCardsProps) {
  const summary = useMemo(() => {
    if (!transactions.length) {
      return {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        recentTransactions: []
      };
    }

    const totalIncome = transactions
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const balance = totalIncome - totalExpenses;

    // Get 5 most recent transactions
    const recentTransactions = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return {
      totalIncome,
      totalExpenses,
      balance,
      recentTransactions
    };
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="finance-card bg-finance-green/10">
        <h3 className="finance-label mb-1">Total Income</h3>
        <p className="finance-stat">{formatCurrency(summary.totalIncome)}</p>
      </div>
      <div className="finance-card bg-finance-red/10">
        <h3 className="finance-label mb-1">Total Expenses</h3>
        <p className="finance-stat">{formatCurrency(summary.totalExpenses)}</p>
      </div>
      <div className="finance-card bg-finance-blue/10">
        <h3 className="finance-label mb-1">Current Balance</h3>
        <p className="finance-stat">{formatCurrency(summary.balance)}</p>
      </div>
    </div>
  );
}
