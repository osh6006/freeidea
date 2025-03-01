import { cn } from '@/lib/utils';

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'rounded-full size-[24px] shrink-0  border-4 border-pink-50 border-t-pink-500 animate-spin',
        className
      )}
    />
  );
};

export default Spinner;
