import { Skeleton } from '@/components/ui/skeleton';

const BestAuthorSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-[20px] mt-[20px]">
      <div className="relative h-[285px] rounded-[10px] p-[12px]">
        <Skeleton className="absolute inset-0"></Skeleton>
        <Skeleton className="absolute size-[40px] rounded-full"></Skeleton>
        <Skeleton className="absolute bottom-[20px] h-4 w-[100px]" />
      </div>
      <div className="relative h-[285px] rounded-[10px] p-[12px]">
        <Skeleton className="absolute inset-0"></Skeleton>
        <Skeleton className="absolute size-[40px] rounded-full"></Skeleton>
        <Skeleton className="absolute bottom-[20px] h-4 w-[100px]" />
      </div>
      <div className="relative h-[285px] rounded-[10px] p-[12px]">
        <Skeleton className="absolute inset-0"></Skeleton>
        <Skeleton className="absolute size-[40px] rounded-full"></Skeleton>
        <Skeleton className="absolute bottom-[20px] h-4 w-[100px]" />
      </div>
      <div className="relative h-[285px] rounded-[10px] p-[12px]">
        <Skeleton className="absolute inset-0"></Skeleton>
        <Skeleton className="absolute size-[40px] rounded-full"></Skeleton>
        <Skeleton className="absolute bottom-[20px] h-4 w-[100px]" />
      </div>
    </div>
  );
};

export default BestAuthorSkeleton;
