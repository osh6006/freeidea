'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';

export default function MembershipNav() {
  const pathname = usePathname();

  const isMembership = pathname.startsWith(PATH.myMemberShip);
  const isAdvertisement = pathname.startsWith(PATH.myAdvertisement);

  return (
    <nav className="flex gap-0 justify-center">
      <Button
        asChild
        variant={isMembership ? 'accent' : 'outline'}
        className="rounded-r-none w-[180px]"
      >
        <Link
          replace
          href={PATH.myMemberShip}
        >
          멤버십
        </Link>
      </Button>
      <Button
        asChild
        variant={isAdvertisement ? 'accent' : 'outline'}
        className="rounded-l-none w-[180px]"
      >
        <Link
          replace
          href={PATH.myAdvertisement}
        >
          광고
        </Link>
      </Button>
    </nav>
  );
}
