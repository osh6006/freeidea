'use client';

import { useParams } from 'next/navigation';

import ImageWithFallback from '@/components/common/image-with-fallback';
import { usePortfolioDetail } from '@/service/portfolio/use-service';

function ImageSection() {
  const params = useParams<{ id: string }>();
  const { data } = usePortfolioDetail(params.id);

  if (!data) throw new Error('Check the data initialization');

  return (
    <section className="flex flex-col gap-[30px]">
      {data.portfolioImages.map((image) => (
        <ImageWithFallback
          key={image.fileId}
          src={image.fileUrl}
          alt="portfolio-image"
          className="object-cover overflow-hidden"
          sizes="100vw"
          width={720}
          height={405}
        />
      ))}
    </section>
  );
}

export default ImageSection;
