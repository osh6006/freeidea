'use client';

import { useParams } from 'next/navigation';

import ImageWithFallback from '@/components/common/image-with-fallback';
import Inner from '@/components/common/inner';
import BannerDialog from '@/components/studio/banner/banner-dialog';
import { BLUR_IMG } from '@/constants/common';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useStudioProfileQuery } from '@/service/studio/use-service';

import FloatingProfile from './floating-profile';

const StudioBanner = () => {
  const { id }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();
  const { data: studioProfileInfo } = useStudioProfileQuery(id);

  return (
    <section className="mx-auto relative w-full aspect-[2/1] max-w-[1920px] max-h-[960px] ">
      {studioProfileInfo?.titleImageUrl ? (
        <ImageWithFallback
          src={studioProfileInfo?.titleImageUrl}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_IMG}
          alt="studio-banner"
          style={{
            objectFit: 'cover',
          }}
        />
      ) : (
        <div className="bg-slate-50 absolute w-full h-full" />
      )}
      <FloatingProfile />
      {studioProfileInfo?.userId === myInfo?.userId ? (
        <Inner
          maxWidth={1200}
          className="relative h-full"
        >
          <BannerDialog />
        </Inner>
      ) : null}
    </section>
  );
};

export default StudioBanner;
