import { cn } from '@/lib/utils';

import PngIcon from './common/png-icon';

export function Pang({ className, ...props }: { className?: string }) {
  return (
    <PngIcon
      className={cn(
        'border border-slate-200 size-[24px] rounded-full',
        className
      )}
      src="/icons/premium-icon.png"
      {...props}
    />
  );
}

export function PangSelect({ className, ...props }: { className?: string }) {
  return (
    <PngIcon
      className={cn(
        'border border-pink-500 size-[24px] bg-pink-50 rounded-full',
        className
      )}
      src="/icons/premium-icon.png"
      {...props}
    />
  );
}
