'use client';

import { cn } from '@/lib/utils';

import AdminContentsWrapper from './common/contents-wrapper';

export function FilterBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AdminContentsWrapper className={cn('flex gap-4 flex-col', className)}>
      {children}
    </AdminContentsWrapper>
  );
}

export function FilterBoxRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex gap-8 [&>*:first-child]:w-[100px]', className)}>
      {children}
    </div>
  );
}

export function FilterBoxHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('typo-body-14-regular-150-tight w-[120px]', className)}>
      {children}
    </span>
  );
}

export function FilterBoxContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex-1 flex gap-4 items-center', className)}>
      {children}
    </div>
  );
}

export function FilterBoxFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex justify-end', className)}>{children}</div>;
}
