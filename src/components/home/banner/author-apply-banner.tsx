'use client';

import { SecureLink } from '@/components/common/secure-button';
import { CardThumbnail, CardThumbnailImage } from '@/components/ui/card';
import { BLUR_IMG } from '@/constants/common';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';

const AuthorApplyBanner = () => {
  const { data: myInfo } = useMyInfoQuery();

  return (
    <CardThumbnail className="w-[285px] h-[330px] relative text-primary rounded-[6px] overflow-hidden border-none hidden pc-screen:block">
      <SecureLink
        requiredLevel="USER"
        href={PATH.myAuthorApply}
        className={cn(myInfo?.userLevel === 'AUTHOR' && 'pointer-events-none')}
      >
        <CardThumbnailImage
          alt="main-sub-banner"
          src="/pngs/main-sub-banner.png"
          fill
          style={{
            objectFit: 'cover',
          }}
          placeholder="blur"
          blurDataURL={BLUR_IMG}
          sizes="100vw"
        />
      </SecureLink>
      <div className="w-full absolute flex flex-col items-center mt-[25px] ">
        <div className="typo-body-14-regular-150-tight text-center">
          작가 신청
        </div>
        <div className="text-[22px] font-bold leading-[-0.88px] text-center mt-[10px]">
          <div>나도</div>
          <div>작가가 될 수 있다고?</div>
        </div>
      </div>
    </CardThumbnail>
  );
};

export default AuthorApplyBanner;
