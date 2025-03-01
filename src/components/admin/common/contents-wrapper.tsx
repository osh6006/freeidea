import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

const AdminContentsWrapper = ({
  className,
  children,
}: {
  className?: string;
} & PropsWithChildren) => {
  return (
    <div className={cn('bg-slate-50 border rounded-lg p-6 shadow', className)}>
      {children}
    </div>
  );
};

export default AdminContentsWrapper;
