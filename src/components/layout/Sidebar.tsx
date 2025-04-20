import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
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
  collapsed?: boolean;
}

const NavItem = ({ icon: Icon, label, to, active, collapsed }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative group",
      active 
        ? "bg-sidebar-primary text-sidebar-primary-foreground" 
        : "text-sidebar-foreground hover:bg-sidebar-accent"
    )}
  >
    <Icon className="h-5 w-5" />
    {!collapsed && <span className="font-medium">{label}</span>}
    {collapsed && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-popover rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all">
        {label}
      </div>
    )}
  </Link>
);

export function Sidebar({ className }: SidebarProps) {
  const [activePath, setActivePath] = React.useState('/');
  const [collapsed, setCollapsed] = React.useState(false);
  
  React.useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    <aside className={cn(
      "h-screen border-r border-border flex flex-col bg-sidebar-background transition-all duration-300 sticky top-0",
      collapsed ? "w-[4.5rem]" : "w-64",
      className
    )}>
      <div className={cn(
        "p-4 flex justify-between items-center border-b border-border",
        collapsed && "justify-center"
      )}>
        {!collapsed && (
          <h1 className="text-2xl font-bold flex items-center">
            <span className="text-finance-orange">UP</span>finance
            <span className="text-xs ml-1 mt-1">®</span>
          </h1>
        )}
        {collapsed && (
          <span className="text-2xl font-bold text-finance-orange">U</span>
        )}
        {!collapsed && <ThemeToggle />}
      </div>

      {!collapsed && (
        <div className="px-4 py-4 flex flex-col items-center border-b border-border">
          <div className="h-16 w-16 rounded-full bg-gray-200 relative mb-3 overflow-hidden">
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
      )}
      
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          <NavItem icon={Home} label="Dashboard" to="/" active={activePath === '/'} collapsed={collapsed} />
          <NavItem icon={BarChart2} label="Analytics" to="/analytics" active={activePath.includes('/analytics')} collapsed={collapsed} />
          <NavItem icon={CreditCard} label="Transactions" to="/transactions" active={activePath.includes('/transactions')} collapsed={collapsed} />
          <NavItem icon={Settings} label="Settings" to="/settings" active={activePath.includes('/settings')} collapsed={collapsed} />
        </div>
      </nav>

      <div className="border-t border-border mt-auto">
        <div className="px-3 py-2">
          <button 
            className={cn(
              "flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors relative group",
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="font-medium">Logout</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover rounded-md invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all z-50">
                Logout
              </div>
            )}
          </button>
        </div>
        {!collapsed && (
          <div className="px-3 py-2 flex items-center justify-between border-t border-border">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        )}
        {collapsed && (
          <div className="px-3 py-2 flex justify-center border-t border-border">
            <ThemeToggle />
          </div>
        )}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-8 bg-background border border-border rounded-full p-1.5 hover:bg-accent transition-colors z-50 shadow-sm"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
