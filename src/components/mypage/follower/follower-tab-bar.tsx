'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

const FollowerTabBar = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'follower';

  return (
    <div className="flex justify-center">
      <div className="flex w-[360px] h-[40px] ">
        <Button
          variant={tab === 'follower' ? 'accent' : 'outline'}
          className="rounded-tr-none rounded-br-none w-[180px] "
          asChild
        >
          <Link
            replace
            href="?tab=follower"
          >
            팔로워
          </Link>
        </Button>
        <Button
          variant={tab === 'following' ? 'accent' : 'outline'}
          className="rounded-tl-none rounded-bl-none w-[180px]"
          asChild
        >
          <Link
            replace
            href="?tab=following"
          >
            팔로잉
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FollowerTabBar;
