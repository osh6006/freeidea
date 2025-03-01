import React from 'react';

import ProductCardSkeleton from './product-card-skeleton';

const HomeWorkSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-x-4">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
};

export default HomeWorkSkeleton;
