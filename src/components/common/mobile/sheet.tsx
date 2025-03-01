'use client';

import React from 'react';

import { X } from 'lucide-react';

import {
  SheetContentProps,
  SheetOverlay,
  SheetPortal,
  sheetVariants,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import * as SheetPrimitive from '@radix-ui/react-dialog';

const MobileSheetOptionContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'bottom', className, children, isClose = true, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        sheetVariants({ side }),
        'bg-white rounded-t-[12px]',
        className
      )}
      {...props}
    >
      {children}
      {isClose && (
        <SheetPrimitive.Close className="absolute right-6 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-[24px] w-[24px]" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Content>
  </SheetPortal>
));

MobileSheetOptionContent.displayName = SheetPrimitive.Content.displayName;

const MobileSheetOptionHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(' py-4', className)}
    {...props}
  />
);
MobileSheetOptionHeader.displayName = 'MobileSheetOptionHeader';

const MobileSheetOptionBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col items-center gap-x-2', className)}
    {...props}
  />
);
MobileSheetOptionBody.displayName = 'MobileSheetOptionBody';

const MobileSheetOptionTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('typo-body-16-bold-100-tight text-center', className)}
    {...props}
  />
));
MobileSheetOptionTitle.displayName = SheetPrimitive.Title.displayName;

const MobileSheetOptionClose = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Close
    ref={ref}
    className={cn(
      'py-4 border-t w-full typo-body-14-medium-100-tight',
      className
    )}
    {...props}
  />
));
MobileSheetOptionClose.displayName = SheetPrimitive.Close.displayName;

export {
  MobileSheetOptionContent,
  MobileSheetOptionHeader,
  MobileSheetOptionBody,
  MobileSheetOptionTitle,
  MobileSheetOptionClose,
};
