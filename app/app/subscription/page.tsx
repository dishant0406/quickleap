'use client';

import { useEffect, useState } from 'react';

import {
  EmptyState,
  LoadingState,
  PageHeader,
  QuickLinksCard,
  RevokedSubscriptionNotice,
  SubscriptionActions,
  SubscriptionCard,
} from '@/components/Billing';
import createConfirmationHandler from '@/components/Micro/ConfirmationHandler';
import {
  cancelSubscription,
  createPortalSession,
  getCurrentSubscription,
  reactivateSubscription,
  type SubscriptionData,
} from '@/lib/api/payment';
import { BILLING_QUICK_LINKS } from '@/lib/constants/billing';
import { errorToast, successToast } from '@/lib/toast';

export default function SubscriptionPage(): React.JSX.Element {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getCurrentSubscription();
      if (response.success) {
        setSubscription(response.data.subscription);
      }
    } catch (error) {
      console.error('Failed to load subscription:', error);
      errorToast('Failed to load subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSubscription = (immediately = false) => {
    const description = immediately
      ? 'Are you sure you want to cancel your subscription immediately? You will lose access to all premium features right away and will not receive a refund for the remaining period.'
      : 'Are you sure you want to cancel your subscription? Your subscription will remain active until the end of the current billing period, after which you will lose access to all premium features.';

    return createConfirmationHandler(
      async (): Promise<void> => {
        if (!subscription) return;

        setActionLoading('cancel');
        try {
          const response = await cancelSubscription({
            immediately,
            reason: 'User requested cancellation',
          });

          if (response.success) {
            successToast(
              immediately
                ? 'Subscription canceled immediately'
                : 'Subscription will cancel at period end'
            );
            await loadSubscription();
          } else {
            errorToast('Failed to cancel subscription');
          }
        } catch (error) {
          console.error('Cancel error:', error);
          errorToast('An error occurred while canceling subscription');
        } finally {
          setActionLoading(null);
        }
      },
      {
        title: 'Cancel Subscription',
        description,
        confirmText: 'Cancel Subscription',
        cancelText: 'Keep Subscription',
        confirmButtonClassName: 'bg-red-600 hover:bg-red-700 text-white',
      }
    )();
  };

  const handleReactivateSubscription = async (): Promise<void> => {
    setActionLoading('reactivate');
    try {
      const response = await reactivateSubscription();

      if (response.success) {
        successToast('Subscription reactivated successfully');
        await loadSubscription();
      } else {
        errorToast('Failed to reactivate subscription');
      }
    } catch (error) {
      console.error('Reactivate error:', error);
      errorToast('An error occurred while reactivating subscription');
    } finally {
      setActionLoading(null);
    }
  };

  const handleOpenPortal = async (): Promise<void> => {
    setActionLoading('portal');
    try {
      const response = await createPortalSession({
        returnUrl: window.location.href,
      });

      if (response.success && response.data.portalUrl) {
        window.location.href = response.data.portalUrl;
      } else {
        errorToast('Failed to open customer portal');
      }
    } catch (error) {
      console.error('Portal error:', error);
      errorToast('An error occurred while opening portal');
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!subscription) {
    return (
      <EmptyState
        actionHref="/app/plans"
        actionLabel="View Plans"
        description="You don't have an active subscription yet."
        title="No Active Subscription"
      />
    );
  }

  const quickLinks = BILLING_QUICK_LINKS.filter((link) => link.href !== '/app/subscription');

  return (
    <div className="h-main md:px-[20vw] mt-nav overflow-y-auto p-4 md:p-8">
      <PageHeader
        description="Manage your subscription and billing"
        title="Subscription Management"
      />

      <div className="space-y-6">
        {/* Current Subscription Card */}
        <SubscriptionCard subscription={subscription} />

        {/* Actions Card */}
        <SubscriptionActions
          actionLoading={actionLoading}
          subscription={subscription}
          onCancelSubscription={handleCancelSubscription}
          onOpenPortal={handleOpenPortal}
          onReactivateSubscription={handleReactivateSubscription}
        />

        {/* Revoked Subscription Notice */}
        {subscription.status === 'revoked' && <RevokedSubscriptionNotice />}

        {/* Quick Links */}
        <QuickLinksCard links={quickLinks} />
      </div>
    </div>
  );
}
