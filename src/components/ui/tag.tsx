import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const tagVariant = cva('w-fit typo-body-14-medium-100-tight', {
  variants: {
    variant: {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      yellow: 'bg-mustard-50 text-mustard-600',
      pink: 'bg-pink-500 text-white',
      gray: 'bg-slate-50 text-slate-700',
    },
    size: {
      mini: 'p-[6px]',
      sm: 'px-[10px] py-[8px]',
      md: 'px-[14px] py-[10px]',
    },

    rounded: {
      false: 'rounded-[2px]',
      true: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'gray',
    size: 'md',
    rounded: false,
  },
});

interface TagProps {
  variant?: 'blue' | 'green' | 'yellow' | 'pink' | 'gray';
  size?: 'mini' | 'sm' | 'md';
  rounded?: boolean;
  className?: string;
}

export default function Tag({
  children,
  variant,
  size,
  rounded,
  className,
}: PropsWithChildren<TagProps>) {
  return (
    <div className={cn(tagVariant({ variant, size, rounded }), className)}>
      {children}
    </div>
  );
}
