import * as React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface ILogoProps {
  width: number;
  height: number;
  sizes?: string;
  className?: string;
}

const Logo: React.FunctionComponent<ILogoProps> = ({
  height,
  width,
  className,
  sizes,
}) => {
  return (
    <Link href="/">
      <Image
        alt="logo"
        sizes={sizes}
        height={height}
        width={width}
        // src="/logo.svg"
        src="/logo-beta.svg"
        className={cn('', className)}
      />
    </Link>
  );
};

export default Logo;
