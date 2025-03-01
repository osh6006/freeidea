import React from 'react';

import Link from 'next/link';

import ImageWithFallback from '@/components/common/image-with-fallback';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BLUR_IMG } from '@/constants/common';
import { PATH } from '@/constants/path';
import { formatCurrency } from '@/lib/utils';
import { IFeedProduct } from '@/types/feed';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Plus } from '@untitled-ui/icons-react';

const DetailImgTag = ({
  productId,
  price,
  title,
  nickname,
  productImageUrl,
  positionX,
  positionY,
  size,
}: IFeedProduct & {
  size: number;
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: positionY * size,
        left: positionX * size,
        transform: 'translate(-50%, -50%)',
        zIndex: 500,
      }}
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="w-[40px] bg-primary z-10 flex items-center justify-center aspect-square rounded-full text-white">
          <Plus fontSize={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="p-[10px] w-[300px] h-fit"
        >
          <DropdownMenuItem asChild>
            <Link href={PATH.workDetail(productId)}>
              <div className="flex gap-x-[10px] items-center cursor-pointer hover:bg-slate-50 transition-colors">
                <ImageWithFallback
                  src={productImageUrl}
                  alt="productImg"
                  width={60}
                  height={60}
                  sizes="60px"
                  placeholder="blur"
                  blurDataURL={BLUR_IMG}
                  className="rounded-[6px] bg-cover aspect-square"
                  style={{ objectFit: 'contain' }}
                />
                <div className="space-y-[6px]">
                  <div className="typo-caption-12-bold-100-tight text-slate-500">
                    {nickname}
                  </div>
                  <div className="typo-body-16-medium-100-tight text-slate-800">
                    {title}
                  </div>
                  <div className="typo-body-16-bold-100-tight text-slate-800">
                    {formatCurrency(price)}원
                  </div>
                </div>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DetailImgTag;
