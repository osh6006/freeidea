'use client';

import { cn } from '@/lib/utils';
import { ChevronRight } from '@untitled-ui/icons-react';

interface Props {
  progress: 'payment' | 'complete';
  className?: string;
}

export default function PaymentProgressBar({ className, progress }: Props) {
  const isPayment = progress === 'payment';
  const isComplete = progress === 'complete';

  const style = {
    active: 'text-pink-500',
    default: 'text-slate-300',
  };

  return (
    <nav className={className}>
      <ul className="flex gap-[20px] justify-center items-center typo-body-14-bold-100-tight">
        <li className={cn(isPayment ? style.active : style.default)}>
          01. 결제
        </li>
        <ChevronRight className="text-slate-200" />
        <li className={cn(isComplete ? style.active : style.default)}>
          02. 결제확인
        </li>
      </ul>
    </nav>
  );
}
