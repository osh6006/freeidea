import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const CurationSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-x-4 w-full mt-5">
      <div>
        <Skeleton className="aspect-square" />
        <Skeleton className="h-4 w-3/4 mt-2" />
        <Skeleton className="h-3 w-1/2 mt-2" />
        <Skeleton className="h-3 w-1/3 mt-2" />

        <div className="space-y-2 mt-4">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-x-2">
              <Skeleton className="aspect-square w-[60px]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[50px] " />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
            <Skeleton className="h-[24px] w-[24px] " />
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="aspect-square" />
        <Skeleton className="h-4 w-3/4 mt-2" />
        <Skeleton className="h-3 w-1/2 mt-2" />
        <Skeleton className="h-3 w-1/3 mt-2" />

        <div className="space-y-2 mt-4">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-x-2">
              <Skeleton className="aspect-square w-[60px]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[50px] " />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
            <Skeleton className="h-[24px] w-[24px] " />
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="aspect-square" />
        <Skeleton className="h-4 w-3/4 mt-2" />
        <Skeleton className="h-3 w-1/2 mt-2" />
        <Skeleton className="h-3 w-1/3 mt-2" />

        <div className="space-y-2 mt-4">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-x-2">
              <Skeleton className="aspect-square w-[60px]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[50px] " />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
            <Skeleton className="h-[24px] w-[24px] " />
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="aspect-square" />
        <Skeleton className="h-4 w-3/4 mt-2" />
        <Skeleton className="h-3 w-1/2 mt-2" />
        <Skeleton className="h-3 w-1/3 mt-2" />

        <div className="space-y-2 mt-4">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-x-2">
              <Skeleton className="aspect-square w-[60px]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[50px] " />
                <Skeleton className="h-4 w-[50px]" />
              </div>
            </div>
            <Skeleton className="h-[24px] w-[24px] " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurationSkeleton;
