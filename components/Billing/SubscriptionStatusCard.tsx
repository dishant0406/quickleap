import React from 'react';

import { AlertCircle, CheckCircle2 } from 'lucide-react';

import { StatusBadge } from '@/components/Billing/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/helpers/billing';

// Use a flexible Subscription type that works with both API responses
interface SubscriptionStatusCardSubscription {
  status: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

interface SubscriptionStatusCardProps {
  subscription: SubscriptionStatusCardSubscription;
  currentPlanAmount: number;
  currentPlanInterval: string;
}

export const SubscriptionStatusCard: React.FC<SubscriptionStatusCardProps> = ({
  subscription,
  currentPlanAmount,
  currentPlanInterval,
}) => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" />
          Subscription Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground text-sm">Status</p>
            <StatusBadge status={subscription.status} type="subscription" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Next Billing Date</p>
            <p className="font-medium">{formatDate(subscription.currentPeriodEnd)}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Amount</p>
            <p className="text-xl font-bold">
              ${currentPlanAmount}/{currentPlanInterval}
            </p>
          </div>
          {subscription.cancelAtPeriodEnd && (
            <div className="bg-yellow-500/10 rounded-lg p-2">
              <p className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-500">
                <AlertCircle className="h-3 w-3" />
                Cancels on {formatDate(subscription.currentPeriodEnd)}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
