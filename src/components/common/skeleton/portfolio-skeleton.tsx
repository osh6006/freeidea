import { Skeleton } from '@/components/ui/skeleton';

const PortfolioSkeleton = () => {
  return (
    <div className="relative w-full">
      <Skeleton className="aspect-square w-full h-full" />
      <Skeleton className="absolute rounded-full size-10 right-4 bottom-4" />
    </div>
  );
};

export default PortfolioSkeleton;
