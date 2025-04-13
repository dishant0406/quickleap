import type { ReactNode } from 'react';
import React from 'react';

import { HelpCircle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Tooltip from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  isLoading?: boolean;
  tooltipContent?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  isLoading = false,
  tooltipContent,
}) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {tooltipContent && (
            <Tooltip content={tooltipContent} side="top">
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </Tooltip>
          )}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {description && !isLoading && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && !isLoading && (
          <div
            className={cn(
              'text-xs font-medium mt-2',
              trend.isPositive ? 'text-green-500' : 'text-red-500'
            )}
          >
            {trend.isPositive ? '+' : ''}
            {trend.value}%
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
