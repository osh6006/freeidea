import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { faker } from '@faker-js/faker';

import ProductCardSkeleton from './product-card-skeleton';

const RecommendSkeleton = () => {
  const tempSkeletonArr = Array.from({ length: 3 }, () => faker.string.uuid());

  return (
    <div className="grid grid-cols-2 gap-[20px] mt-[20px]">
      <div className="relative h-[500px] rounded-[10px] p-4">
        <div className="">
          <Skeleton className="h-4 w-[200px]" />
          <div className="grid grid-cols-2 mt-4 gap-2 pc-screen:grid-cols-3">
            {tempSkeletonArr.map((temp) => (
              <ProductCardSkeleton key={temp} />
            ))}
          </div>
        </div>
        <Skeleton className="h-6 w-[200px] mx-auto mt-6" />
      </div>
      <div className="relative h-[500px] rounded-[10px] p-4">
        <div className="">
          <Skeleton className="h-4 w-[200px]" />
          <div className="grid grid-cols-2 mt-4 gap-2 pc-screen:grid-cols-3">
            {tempSkeletonArr.map((temp) => (
              <ProductCardSkeleton key={temp} />
            ))}
          </div>
        </div>
        <Skeleton className="h-6 w-[200px] mx-auto mt-6" />
      </div>
    </div>
  );
};

export default RecommendSkeleton;
