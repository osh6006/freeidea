import { Skeleton } from '@/components/ui/skeleton';

const BannerSkeleton = () => {
  return (
    <section className="flex w-full gap-x-[20px] relative items-center mt-[20px]">
      <Skeleton className="flex-1 h-[330px] rounded relative overflow-hidden"></Skeleton>
      <Skeleton className="w-[285px] relative h-[330px] rounded text-white" />
      <div className="space-y-2 absolute left-[40px] bottom-[40px] flex items-center gap-x-1">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </section>
  );
};

export default BannerSkeleton;
