import dynamic from 'next/dynamic';
import Link from 'next/link';

import { CommonAvatar } from '@/components/ui/avatar';
import { BLUR_IMG } from '@/constants/common';
import { getTopBanner } from '@/service/home/service';

import ImageWithFallback from '../common/image-with-fallback';

const AuthorApplyBanner = dynamic(
  () => import('./banner/author-apply-banner'),
  { ssr: false }
);

const Banner = async () => {
  const topbanner = await getTopBanner();
  return (
    <section className="w-full flex gap-x-[20px] items-center pc-screen:mt-[20px] ">
      <div className="flex-1 h-[330px] rounded relative overflow-hidden">
        <Link href={topbanner?.bannerLinkUrl || '#'}>
          <ImageWithFallback
            placeholder="blur"
            blurDataURL={BLUR_IMG}
            src={topbanner?.bannerImageUrl}
            fill
            alt="banner"
            sizes="100vw"
            priority
            className="object-cover"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-image pointer-events-none" />
        <div className="absolute bottom-[30px] left-[30px] text-white">
          <h1 className="mb-[12px] max-w-[185px] typo-title-20-bold-140 pc-screen:typo-title-26-bold-140 pc-screen:max-w-full ">
            {topbanner?.title}
          </h1>
          <div className="flex items-center gap-x-[12px] ">
            <CommonAvatar
              nickname={topbanner?.nickname}
              src={topbanner?.profileImageUrl}
              className="size-6"
            />
            <p className="text-[14px] leading-[150%] tracking-base">
              {topbanner?.nickname}
            </p>
          </div>
        </div>
      </div>
      <AuthorApplyBanner />
    </section>
  );
};

export default Banner;
