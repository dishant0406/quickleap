import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuickLink {
  label: string;
  href: string;
}

interface QuickLinksCardProps {
  links: QuickLink[];
  title?: string;
  children?: React.ReactNode;
}

export const QuickLinksCard: React.FC<QuickLinksCardProps> = ({
  links,
  title = 'Quick Links',
  children,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Button key={link.href} asChild variant="neutral">
            <a href={link.href}>{link.label}</a>
          </Button>
        ))}
        {children}
      </CardContent>
    </Card>
  );
};
