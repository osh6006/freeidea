import { Skeleton } from '@/components/ui/skeleton';

const ArtWorkGridSkeleton = () => {
  return (
    <div className="mt-[70px] grid grid-cols-3 gap-x-[20px]">
      <Skeleton className="h-[600px]" />
      <div className="space-y-[20px]">
        <Skeleton className="h-[386px]" />
        <Skeleton className="h-[193px]" />
      </div>
      <div className="space-y-[20px]">
        <Skeleton className="h-[193px]" />
        <Skeleton className="h-[386px]" />
      </div>
    </div>
  );
};

export default ArtWorkGridSkeleton;
