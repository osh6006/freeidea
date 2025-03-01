'use client';

import Image from 'next/image';
import Link from 'next/link';

import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';

interface WriteNavbarProps {
  center?: React.ReactNode;
  className?: string;
  button?: React.ReactNode;
}

const NavbarWithButton = ({ center, className, button }: WriteNavbarProps) => {
  return (
    <header
      className={cn(
        'hidden sticky top-0 w-full h-[96px] content-center bg-white z-50 border-b border-slate-200 pc-screen:block',
        className
      )}
    >
      <div className="flex justify-between max-w-[1200px] mx-auto relative">
        <Link href={PATH.home}>
          {/*
            <Image
              src="/logo.svg"
              width={142}
              height={30}
              alt="Main Logo"
              className="cursor-pointer max-w-full h-auto"
            />
          */}
          <Image
            src="/logo-beta.svg"
            width={161}
            height={26}
            alt="Main Logo"
            className="cursor-pointer max-w-full h-auto"
          />
        </Link>
        {center && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[720px] py-[22px]">
            {center}
          </div>
        )}

        {button}
      </div>
    </header>
  );
};

export default NavbarWithButton;
