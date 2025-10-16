import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function ContactSection(): React.JSX.Element {
  return (
    <div className="bg-card mx-auto mt-16 max-w-3xl rounded-lg border p-8">
      <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-medium">Need a custom plan?</h3>
          <p className="text-muted-foreground">
            Contact us to discuss enterprise solutions tailored to your specific needs.
          </p>
        </div>
        <Button asChild size="lg" variant="neutral">
          <Link href="mailto:support@example.com">Contact Sales</Link>
        </Button>
      </div>
    </div>
  );
}
