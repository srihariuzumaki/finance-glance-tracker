
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction, DEFAULT_CATEGORIES } from '@/types/finance';
import { useMemo } from 'react';

interface CategoryPieChartProps {
  transactions: Transaction[];
}

export function CategoryPieChart({ transactions }: CategoryPieChartProps) {
  const categoryData = useMemo(() => {
    const categoryTotals = new Map<string, number>();
    
    transactions.forEach(transaction => {
      if (transaction.category && transaction.amount < 0) { // Only count expenses
        const currentTotal = categoryTotals.get(transaction.category) || 0;
        categoryTotals.set(transaction.category, currentTotal + Math.abs(transaction.amount));
      }
    });

    return Array.from(categoryTotals.entries()).map(([name, value]) => {
      const category = DEFAULT_CATEGORIES.find(c => c.name === name);
      return {
        name,
        value,
        color: category?.color || '#gray'
      };
    });
  }, [transactions]);

  if (categoryData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No category data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
