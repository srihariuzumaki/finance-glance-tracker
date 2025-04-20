
import { Layout } from '@/components/layout/Layout';

export default function Settings() {
  return (
    <Layout>
      <div className="p-6 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Configure your application preferences</p>
        </div>

        <div className="finance-card">
          <h2 className="text-xl font-bold mb-4">User Settings</h2>
          <p className="text-muted-foreground">Settings page will be implemented in future stages</p>
        </div>
      </div>
    </Layout>
  );
}
