import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  CreditCard, 
  Settings, 
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface SidebarProps {
  className?: string;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
      active 
        ? "bg-sidebar-primary text-sidebar-primary-foreground" 
        : "text-sidebar-foreground hover:bg-sidebar-accent"
    )}
  >
    <Icon className="h-5 w-5" />
    <span className="font-medium">{label}</span>
  </Link>
);

export function Sidebar({ className }: SidebarProps) {
  const [activePath, setActivePath] = React.useState('/');
  
  React.useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    <aside className={cn(
      "h-screen w-64 border-r border-border flex flex-col bg-sidebar-background",
      className
    )}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <span className="text-finance-orange">UP</span>finance
          <span className="text-xs ml-1 mt-1">®</span>
        </h1>
        <ThemeToggle />
      </div>

      <div className="px-4 py-6 flex flex-col items-center">
        <div className="h-20 w-20 rounded-full bg-gray-200 relative mb-3 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
            alt="User avatar" 
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
        </div>
        <h2 className="text-lg font-semibold">John Doe</h2>
        <p className="text-sm text-muted-foreground">john@example.com</p>
      </div>
      
      <nav className="mt-4 px-3 flex-1 space-y-1">
        <NavItem icon={Home} label="Dashboard" to="/" active={activePath === '/'} />
        <NavItem icon={BarChart2} label="Analytics" to="/analytics" active={activePath.includes('/analytics')} />
        <NavItem icon={CreditCard} label="Transactions" to="/transactions" active={activePath.includes('/transactions')} />
        <NavItem icon={Settings} label="Settings" to="/settings" active={activePath.includes('/settings')} />
      </nav>

      <div className="p-4">
        <button 
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
