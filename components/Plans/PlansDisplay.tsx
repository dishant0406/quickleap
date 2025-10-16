import type { Plan } from '@/lib/zustand/plans';

import ContactSection from './ContactSection';
import PlansGrid from './PlansGrid';
import PlansHeader from './PlansHeader';

interface PlansDisplayProps {
  plans: Plan[];
  showContactSection?: boolean;
}

export default function PlansDisplay({
  plans,
  showContactSection = true,
}: PlansDisplayProps): React.JSX.Element {
  // Sort plans by tier
  const sortedPlans = [...plans].sort((a, b) => a.tier - b.tier);

  // Determine the most popular plan (middle tier)
  const popularPlanId = sortedPlans.length > 1 ? sortedPlans[1]?.id : sortedPlans[0]?.id;

  return (
    <>
      <PlansHeader />
      <PlansGrid plans={sortedPlans} popularPlanId={popularPlanId} />
      {showContactSection && <ContactSection />}
    </>
  );
}
