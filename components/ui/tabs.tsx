'use client';

import * as React from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn('w-full', className)} data-slot="tabs" {...props} />;
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'inline-flex h-12 items-center justify-center rounded-base border-2 border-border bg-background p-1 text-foreground',
        className
      )}
      data-slot="tabs-list"
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-base border-2 border-transparent px-2 py-1 gap-1.5 text-sm font-heading ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:border-border',
        className
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
