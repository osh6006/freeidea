'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';

import HeaderLogoAndUserMenu from './header-logo-and-user-menu';
import SearchBar from './search-bar';

const Navbar = () => {
  return (
    <>
      <HeaderLogoAndUserMenu />
      <div className="sticky -top-[56px] -mt-[56px] w-fit  z-40  flex-col items-center mx-auto hidden pc-screen:flex ">
        <GloablNavigation />
        <SearchBar />
      </div>
    </>
  );
};

export function GloablNavigation() {
  const BasicLinkStyle = 'font-medium text-slate-500';
  const ActiveLinkStyle = 'text-pink-500 font-bold';
  const pathName = usePathname().split('/')[1];

  const paths = [
    { label: '홈', path: PATH.home },
    { label: '라운지', path: PATH.lounge },
    { label: '커미션', path: PATH.storeList },
  ];

  const isActive = (path: string) => pathName === path.split('/')[1];

  return (
    <nav
      className={cn('flex items-center justify-center gap-x-[34px] h-[56px]')}
    >
      {paths.map(({ label, path }) => (
        <Link
          key={path}
          href={path}
          className={cn(
            'typo-title-18-medium-100 px-[10px]',
            isActive(path) ? ActiveLinkStyle : BasicLinkStyle
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
