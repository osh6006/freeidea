'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import MesssageDropdown from '@/components/navbar/message-dropdown';
import MyInfoDropdown from '@/components/navbar/myInfo-dropdown';
import NotificationDropdown from '@/components/navbar/notification-dropdown';
import { EXTERNAL_PATH, PATH } from '@/constants/path';
import { useMyInfoQuery } from '@/service/auth/use-service';

import { useGlobalDialogStore } from '../provider/global-dialog/store';

const BeforeLoginSideLinkStyle =
  'text-slate-500 text-[14px] leading-[150%] tracking-[-0.28px] cursor-pointer';
const AfterLoginSideLinkStyle =
  'text-slate-800 text-[14px] leading-[150%] tracking-[-0.28px] cursor-pointer';

const HeaderLogoAndUserMenu = () => {
  const { data, error } = useMyInfoQuery();
  const { setIsLoginDialogOpen } = useGlobalDialogStore();
  const isLoggedIn = !!data;

  return (
    <div className=" bg-white sticky top-0 z-30 hidden pc-screen:block ">
      <header className="flex h-[56px] max-w-[1200px] mx-auto justify-between items-center">
        <Link href={PATH.home}>
          <Image
            src="/logo-beta.svg"
            width={161}
            height={26}
            alt="Main Logo"
            className="cursor-pointer max-w-[100%] h-auto"
          />
        </Link>

        <div className="flex items-center gap-x-[20px]">
          {isLoggedIn && !error ? (
            <div className="flex gap-x-[16px] items-center">
              <MesssageDropdown className={AfterLoginSideLinkStyle} />
              <NotificationDropdown className={AfterLoginSideLinkStyle} />
              <MyInfoDropdown />
            </div>
          ) : (
            <>
              <Link
                href={EXTERNAL_PATH.supportCetner}
                className={BeforeLoginSideLinkStyle}
              >
                이용센터
              </Link>
              <button
                className={BeforeLoginSideLinkStyle}
                onClick={() => setIsLoginDialogOpen(true)}
              >
                로그인
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default HeaderLogoAndUserMenu;
