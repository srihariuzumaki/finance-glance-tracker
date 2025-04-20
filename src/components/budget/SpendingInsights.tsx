
import { Transaction, Budget, Category, formatCurrency } from '@/types/finance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface SpendingInsightsProps {
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
}

export function SpendingInsights({ transactions, budgets, categories }: SpendingInsightsProps) {
  const currentMonth = new Date().toISOString().substring(0, 7);
  
  // Calculate insights
  const insights = categories.map(category => {
    const budget = budgets.find(b => b.categoryId === category.id)?.amount || 0;
    const spent = transactions
      .filter(t => 
        t.category === category.name && 
        t.date.toISOString().substring(0, 7) === currentMonth &&
        t.amount < 0
      )
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    const percentageUsed = budget > 0 ? (spent / budget) * 100 : 0;
    
    return {
      category: category.name,
      spent,
      budget,
      percentageUsed,
      remaining: Math.max(budget - spent, 0)
    };
  });

  const overBudgetCategories = insights.filter(i => i.percentageUsed > 90);
  const underUtilizedCategories = insights.filter(i => i.percentageUsed < 20 && i.budget > 0);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Spending Insights</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {overBudgetCategories.length > 0 && (
          <Card className="bg-red-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Over Budget Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {overBudgetCategories.map(insight => (
                  <li key={insight.category}>
                    {insight.category}: Spent {formatCurrency(insight.spent)} of {formatCurrency(insight.budget)} 
                    ({insight.percentageUsed.toFixed(0)}%)
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {underUtilizedCategories.length > 0 && (
          <Card className="bg-green-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingDown className="h-4 w-4" />
                Under Budget Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {underUtilizedCategories.map(insight => (
                  <li key={insight.category}>
                    {insight.category}: {formatCurrency(insight.remaining)} remaining
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
