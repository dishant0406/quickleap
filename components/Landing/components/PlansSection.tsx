import PlansDisplay from '@/components/Plans/PlansDisplay';
import { fetchPlans } from '@/lib/api/plans';

export default async function PlansSection(): Promise<React.JSX.Element> {
  const plans = await fetchPlans();

  if (!plans || plans.length === 0) {
    return <></>;
  }

  return (
    <section className="from-primary/5 to-background w-full bg-gradient-to-b py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <PlansDisplay plans={plans} />
      </div>
    </section>
  );
}
