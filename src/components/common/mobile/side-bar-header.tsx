'use client';

import Link from 'next/link';

import { STYLE } from '@/components/membership/membership-flat-card';
import { useGlobalDialogStore } from '@/components/provider/global-dialog/store';
import { CommonAvatar } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import Tag from '@/components/ui/tag';
import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useMyMembership } from '@/service/mypage/use-service';
import { ChevronRight } from '@untitled-ui/icons-react';

const MobileSidebarHeader = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const { data: myInfo } = useMyInfoQuery();
  const { data: membershipData } = useMyMembership();
  const { setIsLoginDialogOpen } = useGlobalDialogStore();

  const badge = {
    USER: { variant: 'yellow', label: '회원' },
    AUTHOR: { variant: 'green', label: '작가' },
    ADMIN: { variant: 'blue', label: '일반관리자' },
    MASTER: { variant: 'pink', label: '최고관리자' },
  } as const;

  const tagVariant = badge[myInfo?.userLevel || 'USER'].variant;
  const tagLabel = badge[myInfo?.userLevel || 'USER'].label;

  if (myInfo)
    return (
      <div onClickCapture={() => setOpen(false)}>
        <Link
          href={PATH.myProfile}
          className="flex items-center justify-between"
        >
          <div className="flex gap-x-2 items-center cursor-pointer">
            <CommonAvatar
              nickname={myInfo?.nickname || 'test'}
              src={myInfo?.profileImageUrl || 'test'}
              className="size-[56px] border"
            />
            <div>
              <div className="flex items-center ">
                <div className="typo-body-16-medium-100-tight">
                  {myInfo?.nickname} 님
                </div>
                <Tag
                  className="rounded-full h-6 flex items-center justify-center ml-1"
                  variant={tagVariant}
                >
                  {tagLabel}
                </Tag>
              </div>
              <div className=" text-left typo-caption-12-regular-100 text-slate-500 mt-2">
                {myInfo?.email}
              </div>
            </div>
          </div>
          <ChevronRight />
        </Link>
        <div className="mt-4"></div>
        <Link
          href={PATH.membershipIntro}
          className=" typo-caption-12-regular-100 text-slate-500 w-full "
        >
          <div
            className={cn(
              'w-full flex justify-between p-[10px] rounded-[4px] cursor-pointer',
              STYLE[membershipData?.membershipType || 'FREE']
            )}
          >
            <span className="typo-body-14-semi-bold-100-tight ">
              {
                MEMBERSHIP_OPTION[membershipData?.membershipType || 'FREE']
                  ?.title
              }
            </span>
            혜택보기
          </div>
        </Link>
      </div>
    );

  return (
    <div className="flex items-center gap-x-2">
      <SheetClose asChild>
        <Link
          href={PATH.signUp}
          className={buttonVariants({
            variant: 'outline',
            className: 'flex-1 border-primary text-primary',
          })}
        >
          회원가입
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Button
          className="flex-1"
          onClick={() => setIsLoginDialogOpen(true)}
        >
          로그인
        </Button>
      </SheetClose>
    </div>
  );
};

export default MobileSidebarHeader;
