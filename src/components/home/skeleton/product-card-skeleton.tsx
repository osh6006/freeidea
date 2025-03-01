import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <div>
      <Skeleton className="aspect-square" />
      <div className="flex items-center gap-x-2 mt-2">
        <Skeleton className=" size-[24px] rounded-full" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="grid grid-cols-3 mt-4 gap-x-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
      <Skeleton className="w-1/2 h-4 mt-4" />
    </div>
  );
};

export default ProductCardSkeleton;
