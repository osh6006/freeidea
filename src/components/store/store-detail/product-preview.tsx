'use client';

import * as React from 'react';
import { useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import ImageWithFallback from '@/components/common/image-with-fallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BLUR_IMG } from '@/constants/common';
import { useStoreDetailQuery } from '@/service/store/use-service';

const ProductPreview = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useStoreDetailQuery(id);

  const [activeId, setActiveId] = useState<string>();

  if (!data) return;

  const { thumbnailImages } = data;
  return (
    <Tabs
      defaultValue={thumbnailImages[0].fileId}
      orientation="horizontal"
      className="flex gap-x-[10px]"
      value={activeId}
      onValueChange={setActiveId}
    >
      <TabsList className="h-fit flex-col gap-y-[10px] bg-transparent p-0">
        {thumbnailImages.map(({ fileUrl, fileId }, i) => (
          <TabsTrigger
            key={fileId}
            value={fileId}
            className="p-0 rounded-sm overflow-hidden bg-transparent  border-2 border-transparent transition-all data-[state=active]:border-2 data-[state=active]:border-primary"
            onMouseOver={() => setActiveId(fileId)}
          >
            <ImageWithFallback
              src={fileUrl}
              alt={'prev-image' + i}
              width={60}
              height={60}
              className="aspect-square object-contain"
            />
          </TabsTrigger>
        ))}
      </TabsList>
      {thumbnailImages.map(({ fileId, fileUrl }, i) => (
        <TabsContent
          key={fileId}
          value={fileId}
          className="mt-0"
        >
          <Image
            src={fileUrl}
            alt={'prev-image' + i}
            width={530}
            height={530}
            sizes="530px"
            blurDataURL={BLUR_IMG}
            className="aspect-square rounded-[10px] object-contain"
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProductPreview;
