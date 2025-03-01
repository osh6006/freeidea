import Link from 'next/link';

import SectionTitle from '@/components/home/section-title';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { getBestAuthors } from '@/service/home/service';

import ProfileHoverCard from '../common/profile-hover-card';
import { Card, CardThumbnail, CardThumbnailImage } from '../ui/card';

const BestAuthor = async () => {
  const bestAuthors = await getBestAuthors();

  return (
    <section className="mt-[50px]">
      <SectionTitle>베스트 작가</SectionTitle>
      <ul className="flex gap-[20px] mt-[20px] overflow-x-auto pc-screen:grid pc-screen:grid-cols-4 ">
        {bestAuthors?.map((author, i) => (
          <Card
            className="relative"
            key={author.studioId}
          >
            <CardThumbnail
              className={cn(
                'relative size-[180px] aspect-square rounded-[10px] p-[12px] cursor-pointer overflow-hidden pc-screen:size-full',
                author?.representImageUrl ? '' : 'border border-slate-200'
              )}
            >
              <Link href={PATH.studio(author?.studioId)}>
                <CardThumbnailImage
                  alt={'bestAuthor' + i}
                  src={author?.representImageUrl}
                  fallback={<div className="absolute size-full" />}
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-image" />
              </Link>
              <ProfileHoverCard
                size={40}
                studioId={author?.studioId}
                profileUrl={author?.profileImageUrl}
                nickname={author?.nickname}
                className="border"
              />
              <p className="absolute text-[16px] leading-[150%] bottom-[12px] left-[12px] text-white">
                {author?.nickname}
              </p>
            </CardThumbnail>
          </Card>
        ))}
      </ul>
    </section>
  );
};

export default BestAuthor;
