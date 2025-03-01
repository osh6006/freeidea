import * as React from 'react';

import { cn } from '@/lib/utils';

interface IIndicatorProps {
  className?: string;
  active?: boolean;
}

const Indicator: React.FunctionComponent<IIndicatorProps> = ({
  className,
  active = true,
}) => {
  return (
    <div
      className={cn(
        ' bg-primary size-[4px] rounded-full aspect-square ',
        active ? 'bg-primary' : 'bg-slate-300',
        className
      )}
    />
  );
};

export default Indicator;
