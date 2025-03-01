import { cn } from '@/lib/utils';

export default function TextCounter({
  count,
  limit,
  className,
  variant = 'default',
}: {
  variant?: 'default' | 'accent';
  count: number;
  limit: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'typo-body-14-medium-100-tight text-slate-500 flex gap-[2px]',
        className
      )}
    >
      <span>{count}</span>
      <span>/</span>
      <span className={cn(variant === 'accent' && 'text-pink-500')}>
        {limit}
      </span>
    </div>
  );
}
