import { Badge } from '@/components/ui/badge';

export default function PlansHeader(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <Badge className="px-3 py-1 text-sm" variant="neutral">
        Choose Your Plan
      </Badge>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed">
          Choose the perfect plan for your needs. Upgrade or downgrade at any time.
        </p>
      </div>
    </div>
  );
}
