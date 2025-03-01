'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { type VariantProps, cva } from 'class-variance-authority';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-[50px] right-1/2 translate-x-1/2 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:buttom-0 sm:flex-col max-w-[320px] md:max-w-[500px] pc-screen:bottom-0',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  `group pointer-events-auto relative flex w-full h-[40px] bg-slate-700 text-white items-center space-x-4 overflow-hidden rounded-md typo-14-medium-500-tight
  leading-[-0.28px] font-medium px-4 py-[18px] shadow-lg transition-all 
  data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] 
  data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none 
  data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out 
  data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full 
  data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full 
  pc-screen:px-[30px] pc-screen:text-[16px]  pc-screen:h-[62px] `,
  {
    variants: {
      align: {
        start: 'justify-start',
        between: 'justify-between',
        around: 'justify-around',
        center: 'justify-center',
        end: 'justify-end',
      },
      variant: {
        default: '',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
      align: 'between',
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, align, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant, align }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

interface ToastActionProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> {
  link?: string;
}

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  ToastActionProps
>(({ className, link, ...props }, ref) => {
  const router = useRouter();

  return (
    <ToastPrimitives.Action
      ref={ref}
      className={cn(
        `inline-flex shrink-0 items-center text-primary justify-center ring-offset-background transition-colors focus:outline-none 
        focus:ring-2 focus:ring-ring focus:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50 
        group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 
        group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive
        typo-body-16-bold-100-tight
        `,
        className
      )}
      onClick={() => {
        if (link) {
          router.push(link);
        }
      }}
      {...props}
    />
  );
});
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn(
      'typo-body-14-medium-100-tight pc-screen:typo-body-16-regular-150',
      className
    )}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
