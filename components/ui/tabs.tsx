'use client';

import * as React from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tabsListVariants = cva(
  'inline-flex items-center justify-start rounded-base border-2 border-border bg-background p-1 text-foreground',
  {
    variants: {
      variant: {
        default:
          'h-auto min-h-12 overflow-x-auto gap-1 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
        compact: 'h-10 gap-0.5',
        centered: 'justify-center h-12 gap-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>): React.ReactElement {
  return <TabsPrimitive.Root className={cn('w-full', className)} data-slot="tabs" {...props} />;
}

interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

function TabsList({ className, variant, ...props }: TabsListProps): React.ReactElement {
  return (
    <TabsPrimitive.List
      className={cn(tabsListVariants({ variant }), className)}
      data-slot="tabs-list"
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>): React.ReactElement {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-base border-2 border-transparent px-3 py-2 gap-1.5 text-sm font-heading ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-main data-[state=active]:text-main-foreground data-[state=active]:border-border min-w-fit flex-shrink-0 hover:bg-main/10',
        className
      )}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>): React.ReactElement {
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
