'use client';

import { UntitledIcon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function FloatingActionButton({
  className,
}: {
  className?: string;
}) {
  return (
    <>
      <Popover></Popover>
      <Button
        className={cn(
          'fixed flex items-center justify-center p-0 size-12 bottom-[80px] right-[20px] pc-screen:hidden',
          className
        )}
        variant="outline"
        rounded
      >
        <UntitledIcon.Plus className={cn('')} />
      </Button>
    </>
  );
}
