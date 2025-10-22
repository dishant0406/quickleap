'use client';

import { useEffect, useState } from 'react';

import {
  EmptyState,
  FeaturesList,
  LoadingState,
  PageHeader,
  PlanCard,
  QuickLinksCard,
  RecentTransactions,
  SubscriptionStatusCard,
  UsageCard,
} from '@/components/Billing';
import { Button } from '@/components/ui/button';
import { getBillingSummary, type BillingSummaryResponse } from '@/lib/api/payment';
import { BILLING_QUICK_LINKS } from '@/lib/constants/billing';
import { errorToast } from '@/lib/toast';

export default function BillingPage(): React.JSX.Element {
  const [billing, setBilling] = useState<BillingSummaryResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBilling();
  }, []);

  const loadBilling = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getBillingSummary();
      if (response.success) {
        setBilling(response.data);
      }
    } catch (error) {
      console.error('Failed to load billing:', error);
      errorToast('Failed to load billing information');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!billing) {
    return (
      <EmptyState
        actionLabel="Retry"
        description="Unable to load billing information"
        title="Billing Information Unavailable"
        onAction={loadBilling}
      />
    );
  }

  const { currentPlan, subscription, recentTransactions, usageStats } = billing;
  const maxRedirects = currentPlan.limits.maxRedirects;

  // Prepare quick links with conditional upgrade button
  const filteredLinks = BILLING_QUICK_LINKS.filter((link) => link.href !== '/app/billing');
  const shouldShowUpgrade = usageStats.redirectsUsed >= maxRedirects && maxRedirects !== -1;

  return (
    <div className="h-main md:px-[20vw] mt-nav overflow-y-auto p-4 md:p-8">
      <PageHeader
        description="Overview of your subscription, usage, and billing"
        title="Billing Summary"
      />

      <div className="flex gap-[2vw]">
        {/* Current Plan Card */}
        <PlanCard
          isTrialing={subscription?.isTrialing}
          plan={currentPlan}
          trialDays={currentPlan.pricing.trialDays}
        />

        {/* Subscription Status Card */}
        {subscription && (
          <SubscriptionStatusCard
            currentPlanAmount={currentPlan.pricing.amount}
            currentPlanInterval={currentPlan.pricing.interval}
            subscription={subscription}
          />
        )}

        {/* Usage Stats Card */}
        <UsageCard
          isTrialing={subscription?.isTrialing}
          maxRedirects={maxRedirects}
          trialEnd={subscription?.trialEnd || null}
          usageStats={usageStats}
        />
      </div>

      {/* Recent Transactions */}
      {recentTransactions.length > 0 && (
        <div className="mt-6">
          <RecentTransactions maxDisplay={5} transactions={recentTransactions} />
        </div>
      )}

      {/* Plan Features */}
      <div className="mt-6">
        <FeaturesList plan={currentPlan} />
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <QuickLinksCard links={filteredLinks} title="Quick Actions">
          {shouldShowUpgrade && (
            <Button asChild>
              <a href="/app/plans">Upgrade Plan</a>
            </Button>
          )}
        </QuickLinksCard>
      </div>
    </div>
  );
}
