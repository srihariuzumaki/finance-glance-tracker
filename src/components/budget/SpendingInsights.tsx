
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
      color: category.color,
      spent,
      budget,
      percentageUsed,
      remaining: Math.max(budget - spent, 0)
    };
  });

  const overBudgetCategories = insights.filter(i => i.percentageUsed > 90 && i.budget > 0);
  const underUtilizedCategories = insights.filter(i => i.percentageUsed < 20 && i.budget > 0);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Spending Insights</h2>
      <div className="grid gap-4">
        {overBudgetCategories.length > 0 && (
          <Card className="bg-red-500/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Over Budget Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {overBudgetCategories.map(insight => (
                  <li key={insight.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: insight.color }}
                      />
                      <span>{insight.category}</span>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(insight.spent)} of {formatCurrency(insight.budget)} 
                      <span className="ml-2 text-red-600">({Math.round(insight.percentageUsed)}%)</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {underUtilizedCategories.length > 0 && (
          <Card className="bg-green-500/10">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingDown className="h-4 w-4" />
                Under Budget Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {underUtilizedCategories.map(insight => (
                  <li key={insight.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: insight.color }}
                      />
                      <span>{insight.category}</span>
                    </div>
                    <div className="text-sm font-medium">
                      {formatCurrency(insight.remaining)} remaining
                      <span className="ml-2 text-green-600">({Math.round(insight.percentageUsed)}% used)</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
        
        {overBudgetCategories.length === 0 && underUtilizedCategories.length === 0 && (
          <Card>
            <CardContent className="pt-6 flex items-center justify-center flex-col text-center">
              <Info className="h-10 w-10 text-muted-foreground mb-2" />
              <p>No budget insights available yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Set up your budgets and track your spending to see insights here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
