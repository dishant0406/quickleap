import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import Tooltip from './tooltip';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-base text-sm font-base ring-offset-white transition-all gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'text-mtext bg-main border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none',
        noShadow: 'text-mtext bg-main border-2 border-border',
        neutral:
          'bg-bw text-text border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none',
        reverse:
          'text-mtext bg-main border-2 border-border hover:translate-x-reverseBoxShadowX hover:translate-y-reverseBoxShadowY hover:shadow-shadow',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  tooltip?: string;
  tooltipDirection?: 'top' | 'right' | 'bottom' | 'left';
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, disabled, onClick, ...props }, ref) => {
    // Determine the component to render
    // When disabled with href, render as span to prevent navigation
    const Comp = asChild ? Slot : href && !disabled ? Link : href && disabled ? 'span' : 'button';

    // Check if it's a Link component
    const isLink = href && !disabled;

    // Build props conditionally based on component type
    const hrefProps = isLink ? { href } : {};

    // Don't pass onClick when href is present (Link or disabled span)
    const clickProps = !href && onClick ? { onClick } : {};

    // Don't pass disabled/aria-disabled to Link components as they don't support them
    const accessibilityProps = !isLink
      ? {
          disabled,
          'aria-disabled': disabled,
        }
      : {};

    const buttonElement = (
      <Comp
        // @ts-expect-error ts doesn't like this
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className }),
          disabled && 'pointer-events-none opacity-50'
        )}
        {...accessibilityProps}
        {...hrefProps}
        {...clickProps}
        {...props}
      />
    );

    if (props.tooltip) {
      return (
        <Tooltip content={props.tooltip} side={props?.tooltipDirection}>
          {buttonElement}
        </Tooltip>
      );
    }

    return buttonElement;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
