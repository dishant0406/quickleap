import React from 'react';

import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { TooltipProps } from 'recharts';

// Custom tooltip component
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-md p-3 shadow-md">
        <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        <p className="text-xs text-muted-foreground">{`${payload[0].payload.percentage}%`}</p>
      </div>
    );
  }
  return null;
};

// Custom legend component
const renderLegend = (props: any) => {
  const { payload } = props;

  return (
    <div className="flex flex-wrap justify-center gap-4 pt-2">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
          <span className="text-xs">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

interface DataPoint {
  name: string;
  value: number;
  percentage: number;
  color?: string;
}

interface PieChartProps {
  data: DataPoint[];
  title: string;
  height?: number;
  colors?: string[];
  isLoading?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  height = 300,
  colors = [
    '#33C3F0',
    '#9b87f5',
    '#10B981',
    '#EF4444',
    '#F59E0B',
    '#F97316',
    '#0EA5E9',
    '#8B5CF6',
    '#EC4899',
  ],
  isLoading = false,
}) => {
  // For skeleton loading
  const loadingData = [
    { name: 'Loading 1', value: 30, percentage: 30 },
    { name: 'Loading 2', value: 40, percentage: 40 },
    { name: 'Loading 3', value: 30, percentage: 30 },
  ];

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
              <RechartsPieChart>
                <Pie
                  cx="50%"
                  cy="50%"
                  data={data.length > 0 ? data : loadingData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {(data.length > 0 ? data : loadingData).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      stroke="var(--background)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={renderLegend} />
              </RechartsPieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
