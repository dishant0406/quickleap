import React from 'react';

import { AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { calculateUsagePercentage, formatDate } from '@/lib/helpers/billing';

import { Alert } from '../ui/alert';

interface UsageStatsData {
  redirectsUsed: number;
}

interface UsageCardProps {
  usageStats: UsageStatsData;
  maxRedirects: number;
  isTrialing?: boolean;
  trialEnd?: string | null;
}

export const UsageCard: React.FC<UsageCardProps> = ({
  usageStats,
  maxRedirects,
  isTrialing,
  trialEnd,
}) => {
  const usagePercentage = calculateUsagePercentage(usageStats.redirectsUsed, maxRedirects);

  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Usage Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-muted-foreground text-sm">Redirects</p>
              <p className="text-sm font-medium">
                {usageStats.redirectsUsed} / {maxRedirects === -1 ? '∞' : maxRedirects}
              </p>
            </div>
            {maxRedirects !== -1 && (
              <div className="relative">
                <Progress value={usagePercentage} />
              </div>
            )}
          </div>

          {usageStats.redirectsUsed < maxRedirects || maxRedirects === -1 ? (
            <Alert variant={'default'}>
              <p className="flex items-center gap-2 text-sm ">
                <CheckCircle2 className="h-4 w-4" />
                You can create more redirects
              </p>
            </Alert>
          ) : (
            <div className="bg-red-500/10 rounded-lg p-3">
              <p className="flex items-center gap-2 text-sm text-red-600 dark:text-red-500">
                <AlertCircle className="h-4 w-4" />
                Redirect limit reached
              </p>
              <Button asChild className="mt-2 w-full" size="sm">
                <a href="/app/plans">Upgrade Plan</a>
              </Button>
            </div>
          )}

          {isTrialing && trialEnd && (
            <div className="bg-blue-500/10 rounded-lg p-3">
              <p className="text-muted-foreground text-xs">Trial ends on</p>
              <p className="text-sm font-medium">{formatDate(trialEnd)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
