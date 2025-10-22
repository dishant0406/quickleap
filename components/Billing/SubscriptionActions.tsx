import React from 'react';

import { CheckCircle2, CreditCard, Loader2, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SubscriptionData } from '@/lib/api/payment';

interface SubscriptionActionsProps {
  subscription: SubscriptionData;
  actionLoading: string | null;
  onCancelSubscription: (immediately: boolean) => void;
  onReactivateSubscription: () => void;
  onOpenPortal: () => void;
}

export const SubscriptionActions: React.FC<SubscriptionActionsProps> = ({
  subscription,
  actionLoading,
  onCancelSubscription,
  onReactivateSubscription,
  onOpenPortal,
}) => {
  if (subscription.status === 'revoked') {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Subscription</CardTitle>
        <CardDescription>Update payment method, view invoices, and more</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button disabled={actionLoading === 'portal'} variant="neutral" onClick={onOpenPortal}>
          {actionLoading === 'portal' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4" />
              Open Customer Portal
            </>
          )}
        </Button>

        {subscription.cancelAtPeriodEnd ? (
          <Button disabled={actionLoading === 'reactivate'} onClick={onReactivateSubscription}>
            {actionLoading === 'reactivate' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Reactivating...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Reactivate Subscription
              </>
            )}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              disabled={actionLoading === 'cancel'}
              variant="neutral"
              onClick={() => onCancelSubscription(false)}
            >
              {actionLoading === 'cancel' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Canceling...
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Cancel at Period End
                </>
              )}
            </Button>

            <Button
              className="w-full bg-red-500 text-bg hover:bg-red-600"
              disabled={actionLoading === 'cancel'}
              variant="neutral"
              onClick={() => onCancelSubscription(true)}
            >
              Cancel Immediately
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
