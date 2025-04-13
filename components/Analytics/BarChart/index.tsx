import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTimeForChart } from '@/utils/dateUtils';

import type { TooltipProps } from 'recharts';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md p-3 shadow-md">
        <p className="font-bold mb-1">
          {typeof label === 'number' ? formatTimeForChart(label) : label}
        </p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-sm">
              <span className="font-medium">{entry.name}: </span>
              <span>{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface BarChartProps {
  data: any[];
  title: string;
  height?: number;
  bars: {
    key: string;
    color: string;
    name: string;
  }[];
  xAxisKey: string;
  xAxisFormatter?: (value: any) => string;
  isLoading?: boolean;
}

const BarChart = ({
  data,
  title,
  height = 300,
  bars,
  xAxisKey,
  xAxisFormatter,
  isLoading = false,
}: BarChartProps) => {
  // For skeleton loading
  const loadingData = Array.from({ length: 24 }, (_, i) => ({
    [xAxisKey]: i,
    placeholder: Math.floor(Math.random() * 100),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {isLoading ? (
            <div className="h-full w-full bg-muted/20 rounded-md animate-pulse" />
          ) : (
            <ResponsiveContainer height={height} width="100%">
              <RechartsBarChart
                data={data.length > 0 ? data : loadingData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  axisLine={true}
                  dataKey={xAxisKey}
                  stroke="rgb(0, 0, 0)"
                  strokeWidth={3}
                  tickFormatter={xAxisFormatter}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis
                  axisLine={false}
                  stroke="var(--muted-foreground)"
                  tickLine={false}
                  tickMargin={10}
                />
                <Tooltip content={<CustomTooltip />} />
                {bars.map((bar) => (
                  <Bar
                    key={bar.key}
                    dataKey={isLoading ? 'placeholder' : bar.key}
                    fill={bar.color}
                    name={bar.name}
                    radius={[4, 4, 0, 0]}
                    stroke="rgb(0, 0, 0)"
                    strokeWidth={3}
                  />
                ))}
              </RechartsBarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
