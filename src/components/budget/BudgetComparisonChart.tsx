
import { Transaction, Budget, Category, formatCurrency } from '@/types/finance';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BudgetComparisonChartProps {
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
}

export function BudgetComparisonChart({ transactions, budgets, categories }: BudgetComparisonChartProps) {
  const currentMonth = new Date().toISOString().substring(0, 7);
  
  const chartData = categories.map(category => {
    const budget = budgets.find(b => b.categoryId === category.id)?.amount || 0;
    const spent = transactions
      .filter(t => 
        t.category === category.name && 
        t.date.toISOString().substring(0, 7) === currentMonth &&
        t.amount < 0
      )
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      name: category.name,
      budget,
      spent,
      remaining: Math.max(budget - spent, 0)
    };
  });

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Category: ${label}`}
          />
          <Legend />
          <Bar dataKey="budget" fill="#9b87f5" name="Budget" />
          <Bar dataKey="spent" fill="#ea384c" name="Spent" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
