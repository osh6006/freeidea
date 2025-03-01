'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { type VariantProps, cva } from 'class-variance-authority';

const toggleVariants = cva(
  'inline-flex typo-body-14-medium-100-tight items-center justify-center bg-white rounded border border-slate-200 text-slate-300 text-sm font-medium ring-offset-background transition-colors data-[state=off]:hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:border-none disabled:pointer-events-none disabled:text-slate-300 disabled:bg-slate-tint-5 disabled:text-slate-300 data-[state=on]:bg-pink-50 data-[state=on]:border-pink-500 data-[state=on]:text-pink-600',
  {
    variants: {
      size: {
        sm: 'px-[10px] h-[36px]',
        lg: 'px-[20px] h-[46px]',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
