import React from 'react';

import { AlertCircle, Clock12Icon, XCircle } from 'lucide-react';

import { StatusBadge } from '@/components/Billing/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SubscriptionData } from '@/lib/api/payment';
import { formatDate } from '@/lib/helpers/billing';

import { Alert } from '../ui/alert';

interface SubscriptionCardProps {
  subscription: SubscriptionData;
}

export const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Current Subscription</CardTitle>
          <StatusBadge status={subscription.status} type="subscription" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-muted-foreground text-sm">Plan</p>
            <p className="text-lg font-semibold">{subscription.plan.name}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Amount</p>
            <p className="text-lg font-semibold">
              ${subscription.plan.pricing.amount}/{subscription.plan.pricing.interval}
            </p>
          </div>
        </div>

        {/* Revoked Status Message */}
        {subscription.status === 'revoked' && (
          <div className="bg-red-500/10 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
              <div>
                <p className="font-semibold text-red-600 dark:text-red-500">Subscription Revoked</p>
                <p className="text-muted-foreground text-sm">
                  {subscription.canceledAt
                    ? `Revoked on ${formatDate(subscription.canceledAt)}`
                    : 'Your subscription has been revoked'}
                  {'. You are now on the free plan.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Billing Period - Only show if not revoked and dates exist */}
        {subscription.status !== 'revoked' &&
          subscription.currentPeriodStart &&
          subscription.currentPeriodEnd && (
            <div className="border-border rounded-lg border-2 p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-muted-foreground text-sm">Current Period Start</p>
                  <p className="font-medium">{formatDate(subscription.currentPeriodStart)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Current Period End</p>
                  <p className="font-medium">{formatDate(subscription.currentPeriodEnd)}</p>
                </div>
              </div>

              {subscription.daysUntilRenewal !== undefined &&
                subscription.daysUntilRenewal !== null &&
                !subscription.cancelAtPeriodEnd && (
                  <div className="mt-4">
                    <p className="text-muted-foreground text-sm">
                      Your subscription will renew in{' '}
                      <span className="font-semibold">{subscription.daysUntilRenewal} days</span>
                    </p>
                  </div>
                )}

              {subscription.cancelAtPeriodEnd && (
                <div className="bg-yellow-500/10 mt-4 rounded-lg p-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-yellow-600 dark:text-yellow-500">
                    <AlertCircle className="h-4 w-4" />
                    Your subscription will cancel on {formatDate(subscription.currentPeriodEnd)}
                  </p>
                </div>
              )}
            </div>
          )}

        {/* Trial Information */}
        {subscription.isTrialing && subscription.trialEnd && (
          <Alert>
            <div className="flex gap-1 items-center">
              <Clock12Icon className="h-4 w-4" />
              <p className="font-semibold ">Trial Period</p>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trial ends on {formatDate(subscription.trialEnd)}
            </p>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
