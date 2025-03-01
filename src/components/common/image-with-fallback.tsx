'use client';

import { ReactNode, useState } from 'react';

import Image, { ImageProps } from 'next/image';

import { BLUR_IMG } from '@/constants/common';
import { cn } from '@/lib/utils';

import { UntitledIcon } from '../icon';

interface Props extends Omit<ImageProps, 'src'> {
  src?: string;
  fallback?: ReactNode;
}

const ImageWithFallback = ({
  fallback,
  src,
  alt,
  placeholder = 'blur',
  blurDataURL = BLUR_IMG,
  ...props
}: Props) => {
  const [isError, setIsError] = useState(false);

  const fillFallback = (
    <UntitledIcon.ImageX
      className={cn(
        'size-[30px] text-slate-300',
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      )}
    />
  );

  const staticFallback = (
    <div
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      <UntitledIcon.ImageX className={cn('size-[30px] text-slate-300')} />
    </div>
  );

  const defaultFallback = props.fill ? fillFallback : staticFallback;

  return !src || isError ? (
    fallback || defaultFallback
  ) : (
    <Image
      src={src}
      alt={alt}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={() => setIsError(true)}
      {...props}
    />
  );
};

export default ImageWithFallback;
