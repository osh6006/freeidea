import Link from 'next/link';

import { UntitledIcon } from '@/components/icon';
import { PATH } from '@/constants/path';

export function EmptySlot() {
  return (
    <Link
      href={PATH.workCreate}
      className="flex flex-col h-[180px] p-[30px] gap-[10px] bg-slate-50 justify-center items-center rounded-[10px]"
    >
      <UntitledIcon.Plus className="size-[24px]" />
      <div className="typo-title-18-bold-100">사용가능 판매슬롯</div>
    </Link>
  );
}
