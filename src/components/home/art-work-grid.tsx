import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { BLUR_IMG } from '@/constants/common';
import { cn } from '@/lib/utils';
import { getGridBanners } from '@/service/home/service';
import { IBanner } from '@/types/home';

const TitleStyle =
  'absolute text-[24px] font-bold leading-[150%] tracking-[-0.48px] text-white z-10';

const ArtWorkGrid = async () => {
  const gridBanners = await getGridBanners();

  const BannerCard = ({
    bannerImageUrl,
    bannerLinkUrl,
    height,
    className,
    title,
    nickname,
  }: IBanner & {
    height: string;
    className?: string;
  }) => (
    <Link href={bannerLinkUrl}>
      <div
        style={{
          height,
        }}
        className={cn(
          'relative rounded py-[32px] px-[34px] overflow-hidden p-[20px]',
          className
        )}
      >
        <Image
          alt="artworkImg"
          src={bannerImageUrl || ''}
          placeholder="blur"
          blurDataURL={BLUR_IMG}
          fill
          style={{
            objectFit: 'cover',
          }}
        />
        <div className="absolute inset-0 bg-gradient-image" />
        <div className={TitleStyle}>
          <div>{title}</div>
          <div>{nickname} 작가</div>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      {/* Mobile */}
      <section className="mt-[60px] flex overflow-x-auto gap-x-[10px] pc-screen:hidden">
        {gridBanners.map((el) => (
          <BannerCard
            {...el}
            height="480px"
            title={el.title}
            nickname={el.nickname}
            key={el.bannerId}
            className="w-full flex-1 aspect-[2/3] "
          />
        ))}
      </section>

      {/* Desktop */}
      <section className="mt-[70px] grid-cols-3 gap-x-[20px] hidden pc-screen:grid">
        {/* Left Section */}
        {gridBanners && gridBanners[0] && (
          <BannerCard
            {...gridBanners[0]}
            height="600px"
            title={gridBanners[0].title}
            nickname={gridBanners[0].nickname}
          />
        )}

        {/* Middle Section */}
        <div className="flex flex-col justify-between">
          {gridBanners && gridBanners[1] && (
            <BannerCard
              {...gridBanners[1]}
              height="386px"
              title={gridBanners[1].title}
              nickname={gridBanners[1].nickname}
            />
          )}
          {gridBanners && gridBanners[2] && (
            <BannerCard
              {...gridBanners[2]}
              height="193px"
              title={gridBanners[2].title}
              nickname={gridBanners[2].nickname}
            />
          )}
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-between">
          {gridBanners && gridBanners[3] && (
            <BannerCard
              {...gridBanners[3]}
              height="193px"
              title={gridBanners[3].title}
              nickname={gridBanners[3].nickname}
            />
          )}
          {gridBanners && gridBanners[4] && (
            <BannerCard
              {...gridBanners[4]}
              height="386px"
              title={gridBanners[4].title}
              nickname={gridBanners[4].nickname}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default ArtWorkGrid;
