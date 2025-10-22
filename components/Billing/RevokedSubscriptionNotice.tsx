import React from 'react';

import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RevokedSubscriptionNotice: React.FC = () => {
  return (
    <Card className="border-red-600">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          Need Help?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Your subscription cannot be managed from this page. To restore access to premium features,
          you can subscribe to a new plan or contact support for assistance.
        </p>
        <div className="flex gap-2">
          <Button href="/app/plans" variant="default">
            View Available Plans
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
