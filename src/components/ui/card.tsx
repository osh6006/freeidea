import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import ImageWithFallback from '../common/image-with-fallback';

export function Card({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('flex flex-col gap-[16px]', className)}>{children}</div>
  );
}

export function CardThumbnail({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'relative border w-full border-border aspect-square rounded-[8px] overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardThumbnailImage({
  src,
  alt,
  className,
  sizes = '100vw',
  fill = true,
  ...props
}: Parameters<typeof ImageWithFallback>[0]) {
  return (
    <ImageWithFallback
      className={cn(
        'hover:scale-110 transition-transform duration-300 object-cover',
        className
      )}
      src={src}
      alt={alt}
      sizes={sizes}
      fill={fill}
      {...props}
    />
  );
}

export function CardThumbnailButton({
  children,
  onClick,
  className,
}: PropsWithChildren<{ onClick?: () => void; className?: string }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('absolute right-[10px] bottom-[10px]', className)}
    >
      {children}
    </button>
  );
}

export function CardContent({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('flex flex-col gap-[10px]', className)}>{children}</div>
  );
}

export function CardFooter({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return <div className={cn(className)}>{children}</div>;
}
