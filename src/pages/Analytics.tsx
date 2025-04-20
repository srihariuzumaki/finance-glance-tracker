
import { Layout } from '@/components/layout/Layout';
import { MOCK_MONTHLY_DATA } from '@/types/finance';
import { ExpensesChart } from '@/components/dashboard/ExpensesChart';

export default function Analytics() {
  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Visualize your financial data</p>
        </div>

        {/* Analytics content will be implemented later */}
        <div className="finance-card">
          <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
          <p className="text-sm text-muted-foreground mb-6">Your spending patterns over the last year</p>
          <ExpensesChart data={MOCK_MONTHLY_DATA} />
        </div>

        <div className="mt-6 text-center text-muted-foreground p-10 finance-card bg-muted/30">
          <p>More analytics features coming soon in Stage 2 and 3...</p>
        </div>
      </div>
    </Layout>
  );
}
