'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PATH } from '@/constants/path';
import { useIsMobile } from '@/hooks/use-mobile';
import { hiddenRoutePatterns } from '@/lib/regex';

import MobileMessageView from './message-view';
import MobileNotifiactionView from './notification-view';
import { MobileSearchView } from './search-view';
import MobileSidebar from './side-bar';

const MobileGlobalHeader = () => {
  const pathName = usePathname();
  const isMobile = useIsMobile();

  const shouldHideBottombar =
    isMobile && hiddenRoutePatterns.some((pattern) => pattern.test(pathName));

  if (shouldHideBottombar) {
    return null;
  }

  return (
    <header className="w-full fixed inset-x-0 top-0 flex justify-between items-center py-[10px] px-5 bg-white z-30 pc-screen:hidden">
      <div className="flex items-center gap-x-4">
        <MobileSidebar />
        <Link href={PATH.home}>
          <Image
            src="/mobile-logo.png"
            width={102}
            height={20}
            alt="Main Logo"
            className="cursor-pointer max-w-[100%]"
          />
        </Link>
      </div>

      <div className="flex items-center gap-x-4">
        <MobileSearchView />
        <MobileNotifiactionView />
        <MobileMessageView />
      </div>
    </header>
  );
};

export default MobileGlobalHeader;
