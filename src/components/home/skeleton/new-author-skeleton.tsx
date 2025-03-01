import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const NewAuthorSkeleton = () => {
  return (
    <div className="grid grid-cols-9 gap-x-3">
      <div className="flex items-center flex-col gap-y-[10px]">
        <Skeleton className="size-[110px] rounded-full flex items-center justify-center " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center flex-col gap-y-[10px]">
        <Skeleton className="size-[110px] rounded-full flex items-center justify-center " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center flex-col gap-y-[10px]">
        <Skeleton className="size-[110px] rounded-full flex items-center justify-center " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center flex-col gap-y-[10px]">
        <Skeleton className="size-[110px] rounded-full flex items-center justify-center " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center flex-col gap-y-[10px]">
        <Skeleton className="size-[110px] rounded-full flex items-center justify-center " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center flex-col gap-y-[10px]">
        <Skeleton className="size-[110px] rounded-full flex items-center justify-center " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center flex-col gap-y-[10px]">
        <Skeleton className="size-[110px] rounded-full flex items-center justify-center " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center flex-col gap-y-[10px]">
        <Skeleton className="size-[110px] rounded-full flex items-center justify-center " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center flex-col gap-y-[10px]">
        <Skeleton className="size-[110px] rounded-full flex items-center justify-center " />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
};

export default NewAuthorSkeleton;
