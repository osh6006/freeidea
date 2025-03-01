'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => {
  return (
    <TooltipPrimitive.Arrow
      ref={ref}
      className={cn('fill-slate-800', className)}
      {...props}
    />
  );
});
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ type = 'button', ...props }, ref) => (
  <TooltipPrimitive.Trigger
    ref={ref}
    type={type}
    {...props}
  />
));
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 max-w-[355px] typo-body-14-regular-150-tight flex flex-col gap-[4px] relative rounded-[4px] whitespace-normal border h-auto bg-slate-800 py-[8px] px-[12px] text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    >
      {children}
      <TooltipArrow />
    </TooltipPrimitive.Content>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipTitle = ({ children }: React.PropsWithChildren) => {
  return <div className="typo-body-14-regular-150-tight">{children}</div>;
};

const TooltipDescription = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="typo-body-14-regular-150-tight text-slate-400">
      {children}
    </div>
  );
};

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
  TooltipTitle,
  TooltipDescription,
};
