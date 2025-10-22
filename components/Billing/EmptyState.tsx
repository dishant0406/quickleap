import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
  onAction,
}) => {
  return (
    <div className="h-main md:px-[20vw] mt-nav overflow-y-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {(actionLabel || icon) && (
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              {icon && <div className="text-muted-foreground">{icon}</div>}
              {actionLabel && (
                <>
                  {actionHref ? (
                    <Button asChild>
                      <a href={actionHref}>{actionLabel}</a>
                    </Button>
                  ) : (
                    <Button onClick={onAction}>{actionLabel}</Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
