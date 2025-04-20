
import { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { formatCurrency } from '@/types/finance';

interface ExpensesChartProps {
  data: {
    month: string;
    amount: number;
  }[];
  className?: string;
}

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-md border">
        <p className="font-medium">{payload[0].payload.month}</p>
        <p className="text-finance-orange font-bold">{formatCurrency(payload[0].value as number)}</p>
      </div>
    );
  }
  return null;
};

export function ExpensesChart({ data, className }: ExpensesChartProps) {
  // Find the highest month to highlight
  const highestMonth = useMemo(() => {
    if (!data.length) return null;
    return data.reduce((prev, current) => 
      (prev.amount > current.amount) ? prev : current
    );
  }, [data]);

  return (
    <div className={className}>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8E9196', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#8E9196', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="amount" 
              radius={[4, 4, 0, 0]}
              fill="#24a37f"
              fillOpacity={0.8}
              // Use shape property to customize individual bars
              shape={(props) => {
                const { x, y, width, height, month } = props;
                const isHighest = month === highestMonth?.month;
                return (
                  <rect 
                    x={x} 
                    y={y} 
                    width={width} 
                    height={height} 
                    fill={isHighest ? '#ff6b45' : '#24a37f'} 
                    fillOpacity={0.8}
                    rx={4}
                    ry={4}
                  />
                );
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
