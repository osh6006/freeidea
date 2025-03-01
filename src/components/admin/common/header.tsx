import React from 'react';

import { cn } from '@/lib/utils';

interface AdminHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface AdminHeaderLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface AdminHeaderRightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface AdminHeaderTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

interface AdminHeaderDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const AdminHeader = React.forwardRef<HTMLElement, AdminHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn('bg-slate-50 border rounded-lg shadow', className)}
        {...props}
      >
        <div className="container mx-auto px-5 py-4">
          <div className="flex items-center justify-between">{children}</div>
        </div>
      </header>
    );
  }
);
AdminHeader.displayName = 'AdminHeader';

const AdminHeaderLeft = React.forwardRef<HTMLDivElement, AdminHeaderLeftProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AdminHeaderLeft.displayName = 'AdminHeaderLeft';

const AdminHeaderRight = React.forwardRef<
  HTMLDivElement,
  AdminHeaderRightProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center', className)}
      {...props}
    >
      {children}
    </div>
  );
});
AdminHeaderRight.displayName = 'AdminHeaderRight';

const AdminHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  AdminHeaderTitleProps
>(({ className, children, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn('typo-title-24-bold-140-tight font-bold', className)}
      {...props}
    >
      {children}
    </h1>
  );
});
AdminHeaderTitle.displayName = 'AdminHeaderTitle';

const AdminHeaderDescription = React.forwardRef<
  HTMLParagraphElement,
  AdminHeaderDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('mt-1 typo-body-16-regular-150 opacity-80', className)}
      {...props}
    >
      {children}
    </p>
  );
});
AdminHeaderDescription.displayName = 'AdminHeaderDescription';

export {
  AdminHeader,
  AdminHeaderLeft,
  AdminHeaderRight,
  AdminHeaderTitle,
  AdminHeaderDescription,
};
