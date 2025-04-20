
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

  // Filter out categories with no budget and no spending
  const filteredChartData = chartData.filter(item => item.budget > 0 || item.spent > 0);

  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={filteredChartData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
          barGap={5}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => `$${value}`} 
            width={80}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Category: ${label}`}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            contentStyle={{ 
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            align="center"
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Bar 
            dataKey="budget" 
            fill="#9b87f5" 
            name="Budget" 
            radius={[4, 4, 0, 0]} 
          />
          <Bar 
            dataKey="spent" 
            fill="#ea384c" 
            name="Spent"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
