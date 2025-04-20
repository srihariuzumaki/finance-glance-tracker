
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  className?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatCard({ title, value, icon, className, trend }: StatCardProps) {
  return (
    <div className={cn("finance-card", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="finance-label mb-1">{title}</h3>
          <p className="finance-stat">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "text-sm font-medium mr-1",
                trend.positive ? "text-finance-green" : "text-finance-red"
              )}>
                {trend.positive ? "↑" : "↓"} {trend.value}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
