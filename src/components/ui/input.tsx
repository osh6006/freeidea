import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const inputVariant =
  'flex h-[46px] w-full rounded-[4px] border border-input bg-white px-[13px] py-[12px] text-sm tracking-[-2%] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-300 placeholder:font-normal focus:outline-none focus:ring-[2px] focus:ring-slate-800 disabled:cursor-not-allowed disabled:bg-slate-tint-5 disabled:border-none';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariant,
          error ? 'bg-pink-50 border-error' : '',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
