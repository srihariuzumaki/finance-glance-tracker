
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

  const handleKeyPress = (e: React.KeyboardEvent, budget: Budget) => {
    if (e.key === 'Enter') {
      handleSave(budget);
    } else if (e.key === 'Escape') {
      setEditingBudget(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Monthly Category Budgets</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Category</TableHead>
              <TableHead className="w-[40%]">Budget</TableHead>
              <TableHead className="text-right w-[20%]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEFAULT_CATEGORIES.map((category) => {
              const budget = budgets.find(b => b.categoryId === category.id) || {
                id: crypto.randomUUID(),
                categoryId: category.id,
                amount: 0,
                month: new Date().toISOString().substring(0, 7)
              };
              
              return (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingBudget === budget.id ? (
                      <Input
                        type="number"
                        value={tempAmount}
                        onChange={(e) => setTempAmount(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, budget)}
                        autoFocus
                        className="w-32"
                      />
                    ) : (
                      formatCurrency(budget.amount || 0)
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingBudget === budget.id ? (
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
                        onClick={() => handleEditStart(budget)}
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
    </div>
  );
}
