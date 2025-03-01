'use client';

import { PropsWithChildren, ReactNode } from 'react';

import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

export function SideNav({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <nav
      className={cn(
        'border-x border-border flex flex-col px-[12px] py-[40px] w-[224px] gap-[20px]',
        className
      )}
    >
      {children}
    </nav>
  );
}

export function SideNavGroup({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

export function SideNavTitle({ children }: PropsWithChildren) {
  return (
    <div className="typo-body-16-bold-100-tight px-[12px] py-2">{children}</div>
  );
}

interface SideNavLinkProps extends LinkProps {
  children?: ReactNode;
  className?: string;
  isActive?: boolean;
}

export function SideNavLink({
  children,
  className,
  isActive = false,
  ...props
}: SideNavLinkProps) {
  return (
    <Link
      className={cn(
        'typo-body-14-medium-100-tight px-[12px] py-2 hover:bg-slate-50 rounded-[4px]',
        isActive && 'bg-slate-50',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
