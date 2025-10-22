import React from 'react';

import { Badge } from '@/components/ui/badge';
import { SUBSCRIPTION_STATUS_CONFIG, TRANSACTION_STATUS_CONFIG } from '@/lib/constants/billing';

interface StatusBadgeProps {
  status: string;
  type?: 'subscription' | 'transaction';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'subscription' }) => {
  const config = type === 'subscription' ? SUBSCRIPTION_STATUS_CONFIG : TRANSACTION_STATUS_CONFIG;

  const statusConfig = config[status as keyof typeof config] as
    | {
        label: string;
        color: string;
        icon: React.ComponentType<{ className?: string }>;
      }
    | undefined;

  if (!statusConfig) {
    return <Badge variant="neutral">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
  }

  const Icon = statusConfig.icon;

  return (
    <Badge className={statusConfig.color} variant="neutral">
      <Icon className="mr-1 h-3 w-3" />
      {statusConfig.label}
    </Badge>
  );
};
