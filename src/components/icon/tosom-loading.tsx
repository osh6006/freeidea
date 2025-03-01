import { cn } from '@/lib/utils';

import PngIcon from './common/png-icon';

function TosomLoading({ className }: { className?: string }) {
  return (
    <PngIcon
      src="/icons/tosom-loading.gif"
      className={cn('size-[100px]', className)}
    />
  );
}

export default TosomLoading;
