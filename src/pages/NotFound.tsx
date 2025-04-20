
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[80vh] p-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-finance-orange mb-4">404</h1>
          <p className="text-xl mb-8">Oops! We couldn't find that page.</p>
          <Button asChild className="bg-finance-green hover:bg-finance-green/90">
            <a href="/">Return to Dashboard</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
