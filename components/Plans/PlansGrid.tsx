import { cn } from '@/lib/utils';
import type { Plan } from '@/lib/zustand/plans';

import PlanCard from './PlanCard';

interface PlansGridProps {
  plans: Plan[];
  popularPlanId: string;
}

export default function PlansGrid({ plans, popularPlanId }: PlansGridProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'mx-auto mt-12 grid max-w-5xl gap-6',
        plans.length === 1 && 'md:grid-cols-1',
        plans.length === 2 && 'md:grid-cols-2',
        plans.length >= 3 && 'md:grid-cols-3'
      )}
    >
      {plans.map((plan) => (
        <PlanCard key={plan.id} isPopular={plan.id === popularPlanId} plan={plan} />
      ))}
    </div>
  );
}
