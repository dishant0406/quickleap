import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateForChart } from '@/utils/dateUtils';

import type { TooltipProps } from 'recharts';

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md p-3 shadow-md">
        <p className="font-bold mb-1">
          {typeof label === 'string' ? formatDateForChart(label) : label}
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

interface DataPoint {
  date: string;
  [key: string]: any;
}

interface AreaChartProps {
  data: DataPoint[];
  title: string;
  height?: number;
  areas: {
    key: string;
    color: string;
    name: string;
  }[];
  isLoading?: boolean;
}

const AreaChart = ({ data, title, height = 300, areas, isLoading = false }: AreaChartProps) => {
  // For skeleton loading
  const loadingData = Array.from({ length: 10 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
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
              <RechartsAreaChart
                data={data.length > 0 ? data : loadingData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  {areas.map((area) => (
                    <linearGradient
                      key={area.key}
                      id={`color-${area.key}`}
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={area.color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={area.color} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis
                  axisLine={false}
                  dataKey="date"
                  stroke="var(--muted-foreground)"
                  tickFormatter={formatDateForChart}
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
                {areas.map((area) => (
                  <Area
                    key={area.key}
                    dataKey={isLoading ? 'placeholder' : area.key}
                    fill={`url(#color-${area.key})`}
                    fillOpacity={1}
                    name={area.name}
                    stroke={area.color}
                    type="monotone"
                  />
                ))}
              </RechartsAreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaChart;
