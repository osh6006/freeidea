import React from 'react';

import { cn } from '@/lib/utils';

const FeedDesc = ({
  desc,
  isFull = true,
}: {
  desc: string;
  isFull?: boolean;
}) => {
  return (
    <p className={cn('mt-[20px] break-words ', isFull ? '' : 'line-clamp-1')}>
      {desc}
    </p>
  );
};

export default FeedDesc;
