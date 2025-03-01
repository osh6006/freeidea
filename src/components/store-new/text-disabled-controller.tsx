'use client';

import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';
import { useTermStore } from '@/store/work-new';

function TextDisabledController({ children }: PropsWithChildren) {
  const { isTermAgreed } = useTermStore();
  return (
    <div className={cn(!isTermAgreed && 'force-text-disabled')}>{children}</div>
  );
}

export default TextDisabledController;
