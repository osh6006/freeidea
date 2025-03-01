'use client';

import { ReactNode } from 'react';

import Link from 'next/link';

import { PATH } from '@/constants/path';
import { cn, formatCurrency } from '@/lib/utils';
import { IProduct } from '@/types/common';
import { MyScrapProduct } from '@/types/mypage';

import { Icon } from '../icon';
import { CommonAvatar } from '../ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardThumbnail,
  CardThumbnailButton,
  CardThumbnailImage,
} from '../ui/card';
import Tag from '../ui/tag';
import ProfileHoverCard from './profile-hover-card';

interface IProductCardThumbnailProps {
  productImageUrl: string;
  productId: string;
  onScrapClick?: () => void;
  isScrapping: boolean;
}

export function ProductCardThumbnail({
  productImageUrl,
  productId,
  onScrapClick,
  isScrapping,
  scrapButtonSize = 'md',
  className,
}: IProductCardThumbnailProps & {
  scrapButtonSize?: 'md' | 'lg';
  className?: string;
}) {
  const scrapIconClassName = cn(
    scrapButtonSize === 'md' && 'size-10',
    scrapButtonSize === 'lg' && 'size-12'
  );

  return (
    <CardThumbnail className={className}>
      {productImageUrl ? (
        <Link href={PATH.workDetail(productId)}>
          <CardThumbnailImage
            src={productImageUrl}
            alt="productThumbnail"
            sizes="100vw"
          />
        </Link>
      ) : (
        <div className="size-full bg-[#D4D4D4]" />
      )}
      <CardThumbnailButton onClick={onScrapClick}>
        {isScrapping ? (
          <Icon.BookmarkTonerSelect className={scrapIconClassName} />
        ) : (
          <Icon.BookmarkToner className={scrapIconClassName} />
        )}
      </CardThumbnailButton>
    </CardThumbnail>
  );
}

function AvatarWithHoverCard({
  studioId,
  profileImageUrl,
  nickname,
}: {
  studioId: string;
  profileImageUrl: string;
  nickname: string;
}) {
  return (
    <div className="flex items-center">
      <div className="border rounded-full">
        <ProfileHoverCard
          studioId={studioId}
          profileUrl={profileImageUrl}
          size={24}
          nickname={nickname}
        />
      </div>
      <Link href={PATH.studio(studioId)}>
        <span className="ml-1 typo-body-14-regular-150-tight text-slate-600">
          {nickname}
        </span>
      </Link>
    </div>
  );
}

function AvatarWithoutHoverCard({
  profileImageUrl,
  nickname,
}: {
  profileImageUrl: string;
  nickname: string;
}) {
  return (
    <div className="flex items-center">
      <CommonAvatar
        nickname={nickname}
        src={profileImageUrl}
        className="size-[24px]"
      />
      <span className="ml-1 typo-body-14-regular-150-tight text-slate-600">
        {nickname}
      </span>
    </div>
  );
}

function ProductCardTitle({ children }: { children: ReactNode }) {
  return (
    <div className="typo-body-14-medium-100-tight truncate">{children}</div>
  );
}

function ProductCardTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex gap-[6px] max-h-6  w-full flex-wrap overflow-hidden ">
      {tags.map((tag: string) => (
        <Tag
          key={tag}
          size="mini"
          className="typo-caption-12-regular-100 "
        >
          #{tag}
        </Tag>
      ))}
    </ul>
  );
}

interface IProductCardFooterProps {
  price: number;
}

function ProductCardFooter({ price }: IProductCardFooterProps) {
  return (
    <CardFooter className="typo-body-16-bold-100-tight">
      {formatCurrency(price)}원~
    </CardFooter>
  );
}

interface ProductCardProps extends IProduct {
  onScrapClick?: () => void;
  bookmarkSize?: number;
}

export function ProductCard({
  nickname,
  isScrapping,
  studioId,
  productImageUrl,
  profileImageUrl,
  price,
  tags,
  title,
  productId,
  onScrapClick,
  bookmarkSize = 40,
}: ProductCardProps) {
  return (
    <Card>
      <CardThumbnail>
        <Link href={PATH.workDetail(productId)}>
          <CardThumbnailImage
            className="object-contain"
            src={productImageUrl}
            alt="productThumbnail"
            sizes="100vw"
          />
        </Link>

        <CardThumbnailButton onClick={onScrapClick}>
          {isScrapping ? (
            <Icon.BookmarkTonerSelect
              width={bookmarkSize}
              height={bookmarkSize}
            />
          ) : (
            <Icon.BookmarkToner
              width={bookmarkSize}
              height={bookmarkSize}
            />
          )}
        </CardThumbnailButton>
      </CardThumbnail>
      <CardContent>
        <AvatarWithHoverCard
          studioId={studioId}
          profileImageUrl={profileImageUrl}
          nickname={nickname}
        />

        <ProductCardTitle>{title}</ProductCardTitle>
        <ProductCardTags tags={tags} />
      </CardContent>
      <ProductCardFooter price={price} />
    </Card>
  );
}

interface ScrapProductCardProps extends MyScrapProduct {
  onScrapClick?: () => void;
  bookmarkSize?: number;
}

export function ScrapProductCard({
  productImageUrl,
  productId,
  isScrapping,
  onScrapClick,
  nickname,
  profileImageUrl,
  tags,
  title,
  bookmarkSize = 40,
  price,
  registerStatus,
}: ScrapProductCardProps) {
  return (
    <Card>
      <CardThumbnail>
        <Link href={PATH.workDetail(productId)}>
          <CardThumbnailImage
            className={cn(
              registerStatus === 'CREATED' &&
                'before:content-["판매중단"] before:absolute before:z-[1] before:text-center before:content-center before:typo-title-24-bold-140-tight before:text-white before:bg-black/50 before:size-full'
            )}
            src={productImageUrl}
            alt="productThumbnail"
            sizes="100vw"
          />
        </Link>

        <CardThumbnailButton onClick={onScrapClick}>
          {isScrapping ? (
            <Icon.BookmarkTonerSelect
              width={bookmarkSize}
              height={bookmarkSize}
            />
          ) : (
            <Icon.BookmarkToner
              width={bookmarkSize}
              height={bookmarkSize}
            />
          )}
        </CardThumbnailButton>
      </CardThumbnail>

      <CardContent>
        <AvatarWithoutHoverCard
          profileImageUrl={profileImageUrl}
          nickname={nickname}
        />
        <ProductCardTitle>{title}</ProductCardTitle>
        <ProductCardTags tags={tags} />
      </CardContent>
      <ProductCardFooter price={price} />
    </Card>
  );
}
