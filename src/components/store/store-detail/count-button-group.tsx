import { MouseEventHandler } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Props {
  onPlusClick?: MouseEventHandler<HTMLButtonElement>;
  onMinusClick?: MouseEventHandler<HTMLButtonElement>;
  onCountChange?: (count: number) => void;
  count?: number;
  disabled?: boolean;
}

export default function CountButtonGroup({
  count,
  onCountChange,
  onMinusClick,
  onPlusClick,
  disabled = false,
}: Props) {
  return (
    <div className="flex items-center">
      <Button
        type="button"
        size="icon-sm"
        variant="outline"
        className="rounded-none rounded-l-[6px] "
        onClick={onMinusClick}
        disabled={disabled}
      >
        -
      </Button>
      <Input
        className={cn(
          buttonVariants({ size: 'icon-sm', variant: 'outline' }),
          'rounded-none border-l-0 border-r-0 p-0 text-center focus-visible:ring-0'
        )}
        onChange={(e) => {
          const value = Number(e.currentTarget.value) || 0;
          onCountChange?.(value);
        }}
        value={count}
        disabled={disabled}
      />
      <Button
        type="button"
        size="icon-sm"
        variant="outline"
        className="rounded-none rounded-r-[6px]"
        onClick={onPlusClick}
        disabled={disabled}
      >
        +
      </Button>
    </div>
  );
}
