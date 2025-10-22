import React from 'react';

import { CalendarIcon, CreditCard } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Alert } from '../ui/alert';

// Use a flexible Plan type that works with both API responses
interface PlanCardPlan {
  name: string;
  description: string;
  pricing: {
    amount: number;
    interval: string;
  };
}

interface PlanCardProps {
  plan: PlanCardPlan;
  isTrialing?: boolean;
  trialDays?: number;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan, isTrialing, trialDays }) => {
  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Current Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-2xl font-bold">{plan.name}</p>
            <p className="text-muted-foreground text-sm">{plan.description}</p>
          </div>
          <Alert>
            <p className="text-muted-foreground text-xs">Price</p>
            <p className="text-xl font-bold">
              ${plan.pricing.amount}
              <span className="text-muted-foreground text-sm">/{plan.pricing.interval}</span>
            </p>
          </Alert>
          {trialDays && trialDays > 0 && isTrialing ? (
            <Badge className="bg-blue-500" variant="neutral">
              <CalendarIcon className="mr-1 h-3 w-3" />
              {trialDays} days trial
            </Badge>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
