import React from 'react';

import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LimitStatusBadgeProps {
  limitStatus: LimitStatus;
  className?: string;
  compact?: boolean;
}

export const LimitStatusBadge: React.FC<LimitStatusBadgeProps> = ({
  limitStatus,
  className,
  compact = false,
}) => {
  const getStatusConfig = (): {
    icon: React.ReactNode;
    label: string;
    shortLabel: string;
    variant: 'default' | 'neutral';
    className: string;
  } => {
    switch (limitStatus) {
      case 'within_limit':
        return {
          icon: <CheckCircle className="h-3 w-3" />,
          label: 'Within Limit',
          shortLabel: 'OK',
          variant: 'default',
          className:
            'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border-green-300 dark:border-green-800',
        };
      case 'approaching_limit':
        return {
          icon: <AlertTriangle className="h-3 w-3" />,
          label: 'Approaching Limit',
          shortLabel: 'Warning',
          variant: 'default',
          className:
            'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-800',
        };
      case 'limit_reached':
        return {
          icon: <AlertCircle className="h-3 w-3" />,
          label: 'Limit Reached',
          shortLabel: 'Limit',
          variant: 'default',
          className:
            'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 border-red-300 dark:border-red-800',
        };
      default:
        return {
          icon: <CheckCircle className="h-3 w-3" />,
          label: 'Unknown',
          shortLabel: 'Unknown',
          variant: 'neutral',
          className:
            'bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-800',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge
      className={cn(
        'flex items-center gap-1.5 px-2 py-1 text-xs font-medium',
        config.className,
        className
      )}
      variant={config.variant}
    >
      {config.icon}
      <span>{compact ? config.shortLabel : config.label}</span>
    </Badge>
  );
};
