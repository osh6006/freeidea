import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

export function SubNavbar({ children }: { children: React.ReactNode }) {
  return (
    <nav className="w-full bg-white border-b border-slate-200 ">
      <div
        className="flex justify-between items-center max-w-[1200px] px-5 overflow-auto scroll-hidden 
      pc-screen:px-0 pc-screen:mx-auto
      "
      >
        {children}
      </div>
    </nav>
  );
}

export function SubNavLink({
  variant = 'black',
  className,
  children,
  isActive,
  ...props
}: {
  variant?: 'black' | 'pink';
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
} & LinkProps) {
  const ACTIVE_COLOR = {
    black: 'text-slate-800 border-slate-800',
    pink: 'text-pink-500 border-pink-500',
  };
  return (
    <Link
      {...props}
      className={cn(
        'typo-body-16-medium-100-tight text-slate-400 py-4 pc-screen:py-[20px] whitespace-nowrap',
        isActive
          ? `border-b-[3px] ${ACTIVE_COLOR[variant]}`
          : 'border-b-[3px] border-transparent',
        className
      )}
    >
      {children}
    </Link>
  );
}

export function SubNavLinkGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}
