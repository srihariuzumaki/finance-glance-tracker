
import { useState } from 'react';
import { Budget, Category, DEFAULT_CATEGORIES, formatCurrency } from '@/types/finance';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface BudgetManagerProps {
  budgets: Budget[];
  onUpdateBudget: (budget: Budget) => void;
}

export function BudgetManager({ budgets, onUpdateBudget }: BudgetManagerProps) {
  const [editingBudget, setEditingBudget] = useState<string | null>(null);
  const [tempAmount, setTempAmount] = useState<string>("");

  const handleEditStart = (budget: Budget) => {
    setEditingBudget(budget.id);
    setTempAmount(budget.amount.toString());
  };

  const handleSave = (budget: Budget) => {
    const newAmount = parseFloat(tempAmount);
    if (!isNaN(newAmount) && newAmount >= 0) {
      onUpdateBudget({ ...budget, amount: newAmount });
    }
    setEditingBudget(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Monthly Category Budgets</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DEFAULT_CATEGORIES.map((category) => {
            const budget = budgets.find(b => b.categoryId === category.id);
            return (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>
                  {editingBudget === budget?.id ? (
                    <Input
                      type="number"
                      value={tempAmount}
                      onChange={(e) => setTempAmount(e.target.value)}
                      className="w-32"
                    />
                  ) : (
                    formatCurrency(budget?.amount || 0)
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingBudget === budget?.id ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSave(budget)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditStart(budget || {
                        id: crypto.randomUUID(),
                        categoryId: category.id,
                        amount: 0,
                        month: new Date().toISOString().substring(0, 7)
                      })}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
