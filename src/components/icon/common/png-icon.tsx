import Image from 'next/image';

import { cn } from '@/lib/utils';

interface PngIconProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
}

export type PngIconWrapperProps = Omit<PngIconProps, 'src'>;

export default function PngIcon({
  src,
  className,
  width,
  height,
}: PngIconProps) {
  const getImageName = () => {
    const imageName = src.split('/').pop()?.split('.')[0];
    return imageName || 'icon';
  };

  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className={cn('relative size-[24px]', className)}
    >
      <Image
        src={src}
        alt={getImageName()}
        fill
        sizes="100vw"
      />
    </div>
  );
}
