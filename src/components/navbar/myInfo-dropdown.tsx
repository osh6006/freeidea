'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ChevronDown } from 'lucide-react';

import { CommonAvatar } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { EXTERNAL_PATH, PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { useLogoutMutation, useMyInfoQuery } from '@/service/auth/use-service';
import { useMyMembership } from '@/service/mypage/use-service';
import {
  CoinsStacked01,
  Edit02,
  FaceSmile,
  Plus,
} from '@untitled-ui/icons-react';

import { Icon, UntitledIcon } from '../icon';
import { STYLE } from '../membership/membership-flat-card';
import Tag from '../ui/tag';

const MenuItemStyle = `
flex flex-col items-center gap-y-[10px] 
text-sm font-[500] text-black py-[20px] px-[10px] cursor-pointer 
hover:bg-slate-50 
disabled:text-slate-300`;

const MyInfoDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useMyInfoQuery();
  const { data: membershipData } = useMyMembership();
  const { mutate: logoutMutate } = useLogoutMutation();
  const { push } = useRouter();

  const isLoggedin = !!data;
  if (!isLoggedin) return;

  const handleLogout = () => {
    logoutMutate();
  };

  const {
    nickname,
    email,
    profileImageUrl,
    studioId,
    followers,
    qnaCount,
    userLevel,
  } = data;

  const badge = {
    USER: { variant: 'yellow', label: '회원' },
    AUTHOR: { variant: 'green', label: '작가' },
    ADMIN: { variant: 'blue', label: '일반관리자' },
    MASTER: { variant: 'pink', label: '최고관리자' },
  } as const;

  const tagVariant = badge[data.userLevel].variant;
  const tagLabel = badge[data.userLevel].label;

  const menuItems = [
    {
      icon: <FaceSmile className="size-5" />,
      label: <span>마이페이지</span>,
      href: PATH.myProfile,
      disabled: false,
    },
    {
      icon: <Icon.HelpCircle className="size-5" />,
      label: <span>이용센터</span>,
      href: EXTERNAL_PATH.supportCetner,
      disabled: false,
    },
    {
      icon: <UntitledIcon.Bookmark className="size-5" />,
      label: <span>스크랩</span>,
      href: PATH.myScrap,
      disabled: false,
    },
    {
      icon: <CoinsStacked01 className="size-5" />,
      label: <span>마일리지</span>,
      href: PATH.myMileage,
      disabled: true,
    },
    {
      icon: <Edit02 className="size-5" />,
      label: (
        <span>
          나의 질문 <strong className="text-primary">{qnaCount}</strong>
        </span>
      ),
      href: PATH.myQuestion,
      disabled: false,
    },
    {
      icon: <Plus className="size-5" />,
      label: (
        <span>
          팔로워 <strong className="text-primary">{followers}</strong>
        </span>
      ),
      href: PATH.myFollower,
      disabled: false,
    },
  ];

  return (
    <DropdownMenu
      modal={false}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DropdownMenuTrigger>
        <div className="flex gap-x-1 justify-center items-center cursor-pointer">
          <CommonAvatar
            nickname={nickname}
            src={profileImageUrl}
            className="size-6 border"
          />
          <div className="text-[14px] tracking-base font-medium">
            {nickname} 님
          </div>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[360px] px-[30px] pt-[20px] pb-[10px] rounded shadow-[0_px_0px_1px_0px_rgba(75, 81, 91, 0.12)]">
        <div className="flex flex-col gap-[10px]">
          <DropdownMenuItem
            asChild
            className="group flex flex-col items-center justify-center hover:bg-slate-50 cursor-pointer"
          >
            <Link href={PATH.myProfile}>
              <CommonAvatar
                nickname={nickname}
                src={profileImageUrl}
                className="size-[60px] border"
              />
              <div className="mt-[8px]">
                <Tag
                  className="rounded-full h-6 flex items-center justify-center"
                  variant={tagVariant}
                >
                  {tagLabel}
                </Tag>
              </div>
              <div className="mt-[10px] text-slate-800 font-medium tracking-[-0.28px]">
                {nickname}
              </div>
              <div className="mt-[px] text-xs text-slate-400 group-hover:hidden">
                {email}
              </div>
              <div className="hidden mt-[px] text-xs text-slate-400 group-hover:block">
                마이페이지
              </div>
            </Link>
          </DropdownMenuItem>
          {membershipData && (
            <DropdownMenuItem
              className={cn(
                'w-full flex justify-between p-[10px] rounded-[4px] cursor-pointer',
                STYLE[membershipData.membershipType]
              )}
              asChild
            >
              <Link
                href={PATH.membershipIntro}
                className="typo-caption-12-regular-100 text-slate-500"
              >
                <span className="typo-body-14-semi-bold-100-tight">
                  {MEMBERSHIP_OPTION[membershipData.membershipType].title}
                </span>
                혜택보기
              </Link>
            </DropdownMenuItem>
          )}
          {userLevel === 'MASTER' || userLevel === 'ADMIN' ? (
            <DropdownMenuItem asChild>
              <Link
                href={PATH.admin}
                className={buttonVariants({
                  size: 'lg',
                  variant: 'outline',
                  className: 'bg-slate-800',
                })}
              >
                관리자 페이지
              </Link>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem asChild>
              <Link
                href={PATH.studio(studioId)}
                className={cn(
                  'w-full border border-slate-200 rounded hover:bg-transparent',
                  buttonVariants({
                    size: 'lg',
                    variant: 'outline',
                  })
                )}
              >
                내 스튜디오
              </Link>
            </DropdownMenuItem>
          )}
        </div>
        <div className="mt-[20px] grid grid-cols-3">
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              asChild
              disabled={item.disabled}
              className={MenuItemStyle}
              onSelect={() => !item.disabled && push(item.href)}
            >
              <div className="flex items-center">
                <span>{item.icon}</span>
                {item.label}
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <Separator className="mt-[10px]" />
        <div className="flex items-center justify-center mt-[21px] mb-[10px]">
          <button
            onClick={handleLogout}
            className="mx-auto py-[9px] w-[100px] font-medium text-slate-600 tracking-[-0.28px]"
          >
            로그아웃
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyInfoDropdown;
