import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface IRoleBadgeProps {
  role: 'general' | 'author';
  className?: string;
}

const RoleBadge: React.FunctionComponent<IRoleBadgeProps> = ({
  role = 'general',
  className,
}) => {
  return (
    <Badge
      className={cn(
        'inline-flex items-center justify-center h-[26px] py-[6px] px-[12px] text-[14px] font-medium tracking-[-0.28px] pointer-events-none',
        role === 'general' && 'bg-mustard-50 text-mustard-600 ',
        role === 'author' && 'bg-neonGreen-50 text-neonGreen-600',
        className
      )}
    >
      {role === 'author' && '작가'}
      {role === 'general' && '회원'}
    </Badge>
  );
};

export default RoleBadge;
