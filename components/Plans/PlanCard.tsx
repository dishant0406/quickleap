import { CheckIcon, SparklesIcon, XIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Plan } from '@/lib/zustand/plans';

interface PlanCardProps {
  plan: Plan;
  isPopular: boolean;
}

export default function PlanCard({ plan, isPopular }: PlanCardProps): React.JSX.Element {
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
        <Button
          asChild
          className="w-full"
          disabled={Number(plan.pricing.amount) > 0}
          href="/app"
          variant={isPopular ? 'default' : 'neutral'}
        >
          <div>{Number(plan.pricing.amount) <= 0 ? 'Get Started' : 'Comming Soon'}</div>
        </Button>
      </CardFooter>
    </Card>
  );
}
