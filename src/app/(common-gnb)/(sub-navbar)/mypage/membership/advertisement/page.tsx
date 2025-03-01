import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center py-[200px] mt-[20px] gap-[30px]">
      <div className="typo-title-24-bold-140-tight w-full text-center">
        광고 내역이 없어요
      </div>
      <Button
        variant="outline"
        size="2xl"
      >
        <Link href={PATH.membershipIntro}>광고 확인하기</Link>
      </Button>
    </div>
  );
}
