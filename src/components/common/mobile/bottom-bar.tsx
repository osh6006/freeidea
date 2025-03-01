'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PATH } from '@/constants/path';
import { useIsMobile } from '@/hooks/use-mobile';
import { hiddenRoutePatterns } from '@/lib/regex';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { Home05 } from '@untitled-ui/icons-react';
import { MessageChatCircle } from '@untitled-ui/icons-react';
import { ShoppingBag03 } from '@untitled-ui/icons-react';
import { Inbox01 } from '@untitled-ui/icons-react';
import { FaceSmile } from '@untitled-ui/icons-react';

import { SecureLink } from '../secure-button';

const twStyles = {
  link: 'flex flex-col gap-y-1 items-center justify-center typo-caption-12-regular-100',
  active: 'text-primary',
};

const MobileBottomBar = () => {
  const { data: myInfo } = useMyInfoQuery();
  const pathName = usePathname();

  const isMobile = useIsMobile();

  const shouldHideBottombar =
    isMobile && hiddenRoutePatterns.some((pattern) => pattern.test(pathName));

  if (shouldHideBottombar) {
    return null;
  }

  return (
    <nav className="fixed flex items-center justify-between inset-x-0 bottom-0 py-3 px-6 h-[60px] bg-white border-t z-30 pc-screen:hidden">
      <Link
        href={PATH.home}
        className={cn(
          twStyles.link,
          pathName === PATH.home ? twStyles.active : ''
        )}
      >
        <Home05 />홈
      </Link>
      <Link
        href={PATH.lounge}
        className={cn(
          twStyles.link,
          pathName === PATH.lounge ? twStyles.active : ''
        )}
      >
        <MessageChatCircle />
        라운지
      </Link>
      <Link
        href={PATH.store}
        className={cn(
          twStyles.link,
          pathName === PATH.store ? twStyles.active : ''
        )}
      >
        <ShoppingBag03 />
        커미션
      </Link>
      <SecureLink
        requiredLevel="USER"
        href={PATH.studio(myInfo?.studioId || '')}
        className={cn(
          twStyles.link,
          pathName === PATH.studio(myInfo?.studioId || '')
            ? twStyles.active
            : ''
        )}
      >
        <Inbox01 />
        스튜디오
      </SecureLink>
      <SecureLink
        requiredLevel="USER"
        href={PATH.myProfile}
        className={cn(
          twStyles.link,
          pathName === PATH.myProfile ? twStyles.active : ''
        )}
      >
        <FaceSmile />
        마이
      </SecureLink>
    </nav>
  );
};

export default MobileBottomBar;
