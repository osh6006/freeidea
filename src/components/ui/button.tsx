import * as React from 'react';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  `
  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors 
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
  disabled:pointer-events-none disabled:bg-slate-tint-5 disabled:text-slate-300
  `,
  {
    variants: {
      variant: {
        accent: 'text-white bg-primary hover:bg-pink-300 active:bg-pink-700',
        outline:
          'text-slate-600 border bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50 active:bg-slate-50 active:border-slate-500 ',
        primary:
          'text-white bg-slate-900 hover:bg-slate-700 active:bg-slate-600',
        secondary:
          'text-slate-600 bg-slate-tint-10 hover:bg-slate-tint-15 active:bg-slate-tint-20',
        tertiary:
          'text-white bg-slate-300 hover:bg-slate-200 active:bg-slate-300 disabled:bg-slate-tint-5',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-[32px] px-[20px] typo-body-14-medium-100-tight',
        md: 'h-[40px] px-[20px] typo-body-16-medium-100-tight',
        lg: 'h-[46px] px-[20px] typo-body-16-medium-100-tight',
        '2xl': 'h-[54px] px-[20px] typo-body-16-medium-100-tight',
        icon: 'h-10 w-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-[46px]',
        'icon-xl': 'size-[54px]',
      },

      rounded: {
        false: 'rounded-[4px]',
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'md',
      rounded: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, rounded, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, rounded }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
