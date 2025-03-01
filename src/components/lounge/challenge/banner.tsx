'use client';

import ImageWithFallback from '@/components/common/image-with-fallback';
import Inner from '@/components/common/inner';
import { useGetChallengeDetail } from '@/service/lounge/use-service';
import { formatDate } from 'date-fns';

function ChallengeBanner({ id }: { id: string }) {
  const { data } = useGetChallengeDetail(id);

  if (!data) return null;
  const { bannerImageUrl, title, challengeNumber, startedAt, finishedAt } =
    data;

  return (
    <div className="relative w-full h-[600px] aspect-[16/9]">
      <ImageWithFallback
        className="object-cover -z-10"
        alt="banner"
        src={bannerImageUrl ?? undefined}
        fill
        sizes="100vw"
        priority
        fallback={<div className="size-full absolute -z-10 bg-gray-200" />}
      />
      <Inner
        maxWidth={1200}
        className="flex flex-col gap-[20px] pt-[300px]"
      >
        <h2 className="typo-title-32-bold-150">
          # {challengeNumber.toString().padStart(2, '0')}. 도전작
        </h2>
        <h1 className="typo-title-40-bold-150">{title}</h1>
        <div className="typo-title-20-medium-tight">
          {formatDate(startedAt, 'yyyy.MM.dd')} ~{' '}
          {formatDate(finishedAt, 'yyyy.MM.dd')}
        </div>
      </Inner>
    </div>
  );
}

export default ChallengeBanner;
