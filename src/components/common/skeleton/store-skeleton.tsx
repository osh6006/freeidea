import { Skeleton } from '@/components/ui/skeleton';

import PortfolioSkeleton from './portfolio-skeleton';

const StoreSkeleton = () => {
  return (
    <div className="space-y-2">
      <PortfolioSkeleton />
      <div className="flex items-center gap-x-2">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>
      <Skeleton className="h-5 w-1/2" />
      <div className="flex items-center gap-x-2 w-full">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
      </div>
      <Skeleton className="h-6 w-1/2" />
    </div>
  );
};

export default StoreSkeleton;
