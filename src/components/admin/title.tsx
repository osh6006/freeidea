import React from 'react';

import { cn } from '@/lib/utils';

const AdminTitle = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        'typo-title-24-bold-tight pb-4 border-b border-slate-200',
        className
      )}
    >
      {children}
    </h1>
  );
};

export default AdminTitle;
