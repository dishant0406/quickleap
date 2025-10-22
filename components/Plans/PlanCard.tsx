'use client';

import { useState } from 'react';

import { CheckIcon, Loader2, SparklesIcon, XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createCheckoutSession } from '@/lib/api/payment';
import { errorToast, successToast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import type { Plan } from '@/lib/zustand/plans';
import useUserStore from '@/lib/zustand/user';

interface PlanCardProps {
  plan: Plan;
  isPopular: boolean;
}

export default function PlanCard({ plan, isPopular }: PlanCardProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoggedIn } = useUserStore();
  const currentPlanId = user?.plan?.id;
  const isCurrentPlan = currentPlanId === plan.id;
  const isFree = Number(plan.pricing.amount) <= 0;

  const handleUpgrade = async (): Promise<void> => {
    if (!isLoggedIn) {
      errorToast('Please log in to subscribe to a plan');
      return;
    }

    if (isFree) {
      successToast('This is a free plan, no payment required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await createCheckoutSession({ planId: plan.id });

      if (response.success && response.data.checkoutUrl) {
        // Redirect to checkout
        window.location.href = response.data.checkoutUrl;
      } else {
        errorToast(response.message || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'An error occurred during checkout';
      errorToast(message);
    } finally {
      setIsLoading(false);
    }
  };
  const features = Object.entries(plan.features).filter(([, value]) => value === true);
  const notIncludedFeatures = Object.entries(plan.features).filter(([, value]) => value === false);

  return (
    <Card className={cn('relative flex flex-col overflow-hidden', isPopular && 'shadow-md')}>
      {isPopular && (
        <div className="bg-primary text-primary-foreground absolute right-0 top-0 rounded-bl-lg px-3 py-1 text-xs font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold">${plan.pricing.amount}</span>
          <span className="text-muted-foreground ml-1 text-sm">/{plan.pricing.interval}</span>
        </div>
        {plan.pricing.trialDays > 0 && (
          <Badge className="mt-2 w-fit text-xs" variant="neutral">
            {plan.pricing.trialDays} days free trial
          </Badge>
        )}
        <p className="text-muted-foreground mt-2 text-sm">{plan.description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        {isPopular && (
          <div className="bg-primary/10 mb-4 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <SparklesIcon className="text-primary h-4 w-4" />
              <span className="text-sm font-medium">Best value for growing businesses</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {/* Limits Section */}
          <div>
            <h4 className="mb-2 text-sm font-semibold">Limits</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckIcon className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
                <span>
                  {plan.limits.maxRedirects === -1 ? 'Unlimited' : plan.limits.maxRedirects}{' '}
                  redirects
                </span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
                <span>
                  {plan.limits.perRedirect.maxAnalyticsEvents.toLocaleString()} events per redirect
                </span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
                <span>{plan.limits.perRedirect.maxRulesPerRedirect} rules per redirect</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
                <span>
                  {plan.limits.perRedirect.analyticsRetentionDays} days analytics retention
                </span>
              </li>
            </ul>
          </div>

          {/* Included Features */}
          {features.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold">Features</h4>
              <ul className="space-y-2 text-sm">
                {features.map(([key]) => (
                  <li key={key} className="flex items-center">
                    <CheckIcon className="text-primary mr-2 h-4 w-4 flex-shrink-0" />
                    <span>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Not Included Features */}
          {notIncludedFeatures.length > 0 && (
            <div>
              <ul className="space-y-2 text-sm">
                {notIncludedFeatures.map(([key]) => (
                  <li key={key} className="text-muted-foreground flex items-center">
                    <XIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {isCurrentPlan ? (
          <Button disabled className="w-full" variant="neutral">
            Current Plan
          </Button>
        ) : isFree ? (
          <Button
            asChild
            className="w-full"
            href="/app"
            variant={isPopular ? 'default' : 'neutral'}
          >
            <div>Get Started</div>
          </Button>
        ) : (
          <Button
            className="w-full"
            disabled={isLoading}
            variant={isPopular ? 'default' : 'neutral'}
            onClick={handleUpgrade}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Upgrade Now'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
