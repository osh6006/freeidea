'use client';

import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants/path';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { Level } from '@/types/auth';
import { ChevronDown, Edit05 } from '@untitled-ui/icons-react';

import { SecureButton } from '../common/secure-button';
import FeedWriteDialog from '../feed/write/dialog';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface WritingMenuProps {
  userLevel: Level;
}

const SUB_NAV_STYLES = {
  dropdownMenuItem: `
    flex justify-start items-center gap-x-[10px] border border-pink-100 rounded-sm cursor-pointer 
    focus:bg-pink-tint-10 focus:text-accent-foreground 
    bg-pink-tint-5 p-[10px] w-full h-full 
  `,
  trigger:
    'inline-flex items-center justify-center border border-slate-200 h-[40px] w-[120px] hover:bg-slate-50 transition rounded',
  icon: 'size-[18px]',
  label: 'font-bold text-[14px] tracking-base text-pink-500 text-start',
  description: 'text-[12px] text-slate-500',
};

const MenuItem = ({
  label,
  desc,
  path,
  isDialog,
  level,
}: {
  label: string;
  desc: string;
  level: Level;
  path?: string;
  isDialog?: boolean;
}) => {
  const router = useRouter();

  const { data } = useMyInfoQuery();

  const hasLeftSlots = (data?.leftSlots || 0) > 0;

  return (
    <DropdownMenuItem asChild>
      {!hasLeftSlots && path === PATH.workCreate ? (
        <DialogTrigger className={SUB_NAV_STYLES.dropdownMenuItem}>
          <>
            <Edit05 className={`${SUB_NAV_STYLES.icon} text-pink-500`} />
            <div>
              <div className={SUB_NAV_STYLES.label}>{label}</div>
              <div className={SUB_NAV_STYLES.description}>{desc}</div>
            </div>
          </>
        </DialogTrigger>
      ) : (
        <SecureButton
          className={SUB_NAV_STYLES.dropdownMenuItem}
          requiredLevel={level}
          onClick={(e) => {
            if (isDialog) {
              e.preventDefault();
            }
            if (path) {
              router.push(path);
            }
          }}
        >
          <Edit05 className={`${SUB_NAV_STYLES.icon} text-pink-500`} />
          <div>
            <div className={SUB_NAV_STYLES.label}>{label}</div>
            <div className={SUB_NAV_STYLES.description}>{desc}</div>
          </div>
        </SecureButton>
      )}
    </DropdownMenuItem>
  );
};

export type SUB_NAV_BAR_MENU = {
  id: string;
  component: React.ReactNode;
};

const LEVEL_MENU: Record<Level, SUB_NAV_BAR_MENU[]> = {
  GUEST: [
    {
      id: '의뢰하기',
      component: (
        <MenuItem
          path={PATH.requestCreate}
          label="의뢰하기"
          desc="작가님들에게 작업을 의뢰해요!"
          level="USER"
        />
      ),
    },
    {
      id: '포트폴리오 등록하기',
      component: (
        <MenuItem
          path={PATH.portfolioCreate}
          label="포트폴리오 등록하기"
          desc="자신의 창작물을 보관할 수 있어요!"
          level="USER"
        />
      ),
    },
  ],
  USER: [
    {
      id: '의뢰하기',
      component: (
        <MenuItem
          path={PATH.requestCreate}
          label="의뢰하기"
          desc="작가님들에게 작업을 의뢰해요!"
          level="USER"
        />
      ),
    },
    {
      id: '포트폴리오 등록하기',
      component: (
        <MenuItem
          path={PATH.portfolioCreate}
          label="포트폴리오 등록하기"
          desc="자신의 창작물을 보관할 수 있어요!"
          level="USER"
        />
      ),
    },
  ],
  AUTHOR: [
    {
      id: '의뢰하기',
      component: (
        <MenuItem
          path={PATH.requestCreate}
          label="의뢰하기"
          desc="작가님들에게 작업을 의뢰해요!"
          level="AUTHOR"
        />
      ),
    },
    {
      id: '포트폴리오 등록하기',
      component: (
        <MenuItem
          path={PATH.portfolioCreate}
          label="포트폴리오 등록하기"
          desc="자신의 창작물을 보관할 수 있어요!"
          level="AUTHOR"
        />
      ),
    },
    {
      id: '커미션 등록하기',
      component: (
        <MenuItem
          path={PATH.workCreate}
          label="커미션 등록하기"
          desc="판매하는 작품을 등록해보세요!"
          level="AUTHOR"
        />
      ),
    },
    {
      id: '피드 등록하기',
      component: (
        <FeedWriteDialog>
          <MenuItem
            label="피드 등록하기"
            desc="작업 일상을 자랑해보세요!"
            isDialog
            level="AUTHOR"
          />
        </FeedWriteDialog>
      ),
    },
  ],
  ADMIN: [],
  MASTER: [],
};

const WritingMenu = ({ userLevel }: WritingMenuProps) => {
  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className={SUB_NAV_STYLES.trigger}>
          글쓰기
          <ChevronDown className={`${SUB_NAV_STYLES.icon} ml-[12px]`} />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-4 min-w-[276px] space-y-2">
          {LEVEL_MENU[userLevel].map(({ id, component }) => {
            return <div key={id}>{component}</div>;
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>판매 슬롯이 모두 채워져 있습니다.</DialogTitle>
          <DialogDescription>
            등록되어 있는 판매 작품을 확인해 주세요!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-10">
          <DialogClose asChild>
            <Button className="w-full">확인</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WritingMenu;
