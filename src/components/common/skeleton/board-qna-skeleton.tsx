import { Skeleton } from '@/components/ui/skeleton';

const BoardQnaSkeleton = () => {
  return (
    <div className="p-[30px] border border-slate-200 rounded-[10px]">
      <div className="flex items-center gap-x-2">
        <Skeleton className="w-10 h-8" />
        <Skeleton className="w-1/2 h-7" />
      </div>
      <Skeleton className="my-5 w-1/2 h-8" />
      <Skeleton className="my-5 w-2/3 h-10" />
    </div>
  );
};

export default BoardQnaSkeleton;
