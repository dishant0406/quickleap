import React from 'react';

import { CheckCircle2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatFeatureName } from '@/lib/helpers/billing';

// Use a flexible Plan type that works with both API responses
interface FeaturesListPlan {
  limits: {
    maxRedirects: number;
    perRedirect: {
      maxAnalyticsEvents: number;
      maxRulesPerRedirect: number;
      analyticsRetentionDays: number;
    };
  };
  features: Record<string, boolean>;
}

interface FeaturesListProps {
  plan: FeaturesListPlan;
}

export const FeaturesList: React.FC<FeaturesListProps> = ({ plan }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Features & Limits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Limits */}
          <div className="border-border rounded-lg border-2 p-4">
            <h3 className="mb-3 font-semibold">Resource Limits</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Max Redirects</span>
                <span className="font-medium">
                  {plan.limits.maxRedirects === -1 ? 'Unlimited' : plan.limits.maxRedirects}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Events per Redirect</span>
                <span className="font-medium">
                  {plan.limits.perRedirect.maxAnalyticsEvents.toLocaleString()}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Rules per Redirect</span>
                <span className="font-medium">{plan.limits.perRedirect.maxRulesPerRedirect}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Analytics Retention</span>
                <span className="font-medium">
                  {plan.limits.perRedirect.analyticsRetentionDays} days
                </span>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="border-border rounded-lg border-2 p-4">
            <h3 className="mb-3 font-semibold">Enabled Features</h3>
            <ul className="space-y-2 text-sm">
              {Object.entries(plan.features).map(([key, value]) => (
                <li key={key} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{formatFeatureName(key)}</span>
                  {value ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <span className="text-muted-foreground text-xs">Not included</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
