import { Skeleton } from '@/components/ui/skeleton';

const FeedSkeleton = () => {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between gap-x-[20px]">
        <span className="flex items-center gap-x-[14px]">
          <Skeleton className="size-[40px] border rounded-full" />
          <div className="space-y-1">
            <Skeleton className="w-20 h-5 text-slate-800" />
            <Skeleton className="w-10 h-3 text-slate-500" />
          </div>
        </span>
      </div>
      <Skeleton className="h-[740px] w-full overflow-hidden mt-[20px] p-0" />
      <div className="flex items-center gap-x-[20px] mt-[20px]">
        <Skeleton className="size-[30px] border rounded-full" />
        <Skeleton className="size-[30px] border rounded-full" />
        <Skeleton className="size-[30px] border rounded-full" />
        <Skeleton className="size-[30px] border rounded-full" />
      </div>
      <Skeleton className="w-1/2 h-5 text-slate-800 mt-2" />
    </div>
  );
};

export default FeedSkeleton;
