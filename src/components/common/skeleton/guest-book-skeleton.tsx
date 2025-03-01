import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const GuestBookSkeleton = () => {
  return (
    <div className="p-[30px] border border-slate-200 rounded-[10px]">
      <div className="flex items-center gap-x-2">
        <Skeleton className="size-10" />
        <div className="space-y-2">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-40 h-5" />
        </div>
      </div>
      <Skeleton className="my-5 w-1/2 h-5" />
    </div>
  );
};

export default GuestBookSkeleton;
