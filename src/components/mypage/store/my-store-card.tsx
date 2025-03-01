import { useState } from 'react';

import Link from 'next/link';

import ImageWithFallback from '@/components/common/image-with-fallback';
import { Button } from '@/components/ui/button';
import { CardThumbnail, CardThumbnailImage } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import Tag from '@/components/ui/tag';
import {
  Tooltip,
  TooltipContent,
  TooltipDescription,
  TooltipTitle,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PATH } from '@/constants/path';
import { cn, formatCurrency } from '@/lib/utils';
import { MyProduct } from '@/types/mypage';

interface MyStoreCardProps extends MyProduct {
  onDeleteClick?: () => void;
  onToggleStatusClick?: (checked: boolean) => void;
  onRepublishClick?: () => void;
}

export default function MyStoreCard({
  productId,
  productNumber,
  productImageUrl,
  title,
  price,

  registerStatus,
  isPending,
  onDeleteClick,
  onToggleStatusClick,
  onRepublishClick,
}: MyStoreCardProps) {
  const label = {
    CREATED: '판매중',
    CLOSED: '판매중단',
    REPORTED: '판매중단',
    MEMBERSHIP_EXPIRED: '판매중단',
  };

  return (
    <div className="p-[30px] flex gap-[20px] justify-between border border-border rounded-[10px]">
      <Link
        href={PATH.workDetail(productId)}
        className="flex gap-[10px] items-center"
      >
        <div className="relative size-[120px]  rounded-[6px] overflow-hidden border-border">
          <Tag
            className={cn(
              'absolute z-[1]',
              registerStatus === 'CREATED' && 'text-neonGreen-600',
              registerStatus === 'CLOSED' && 'text-slate-300',
              registerStatus === 'REPORTED' && 'text-error'
            )}
            variant="gray"
            size="mini"
          >
            {label[registerStatus]}
          </Tag>
          <CardThumbnail>
            <CardThumbnailImage
              src={productImageUrl}
              alt="thumbnail"
              className="object-contain"
            />
          </CardThumbnail>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="typo-body-16-medium-100-tight text-slate-500">
            {productNumber}
          </div>
          <div className="typo-body-16-medium-100-tight text-slate-500">
            {title}
          </div>
          <div className="typo-title-18-bold-100">
            {formatCurrency(price)}원
          </div>
          {registerStatus === 'REPORTED' && (
            <div className="typo-body-16-bold-100-tight text-error">
              신고로인한 판매 중단
            </div>
          )}
          {registerStatus === 'MEMBERSHIP_EXPIRED' && (
            <div className="typo-body-16-bold-100-tight text-error">
              멤버십 만료로 인한 판매 중단
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-col justify-between w-[140px]">
        {registerStatus !== 'REPORTED' && (
          <ToggleStatusSwitch
            onCheckedChange={onToggleStatusClick}
            checked={registerStatus === 'CREATED'}
            registerStatus={registerStatus}
          />
        )}
        <EditButton
          editHref={PATH.workUpdate(productId)}
          registerStatus={registerStatus}
          isPending={isPending}
          onDeleteClick={onDeleteClick}
          onRepublishClick={onRepublishClick}
        />
      </div>
    </div>
  );
}

function EditButton({
  editHref,
  onDeleteClick,
  onRepublishClick,
  registerStatus,
  isPending,
}: {
  editHref: string;
  onDeleteClick?: () => void;
  onRepublishClick?: () => void;
  registerStatus: MyProduct['registerStatus'];
  isPending: MyProduct['isPending'];
}) {
  const [dialogType, setDialogType] = useState<'DELETE' | 'MEMBERSHIP_EXPIRED'>(
    'DELETE'
  );

  const TITLE = {
    DELETE: '작품 삭제',
    MEMBERSHIP_EXPIRED: '멤버십 결제',
  };

  const DESCRIPTION = {
    DELETE: '삭제된 작품은 복구할 수 없습니다.',
    MEMBERSHIP_EXPIRED: '멤버십 만료로 인한 판매 중단',
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="w-full mt-auto"
            variant="outline"
            size="sm"
          >
            작품 편집
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={editHref}>편집</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="w-full"
            onSelect={() => setDialogType('DELETE')}
          >
            <DialogTrigger>삭제</DialogTrigger>
          </DropdownMenuItem>
          {isPending && (
            <DropdownMenuItem
              onSelect={onRepublishClick}
              className="w-full"
            >
              재게시
            </DropdownMenuItem>
          )}
          {isPending && registerStatus === 'MEMBERSHIP_EXPIRED' && (
            <DropdownMenuItem
              asChild
              className="w-full"
              onClick={() => setDialogType('MEMBERSHIP_EXPIRED')}
            >
              <DialogTrigger>재게시</DialogTrigger>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>{TITLE[dialogType]}</DialogTitle>
          <DialogDescription>{DESCRIPTION[dialogType]}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          {dialogType === 'DELETE' && (
            <DialogClose asChild>
              <Button onClick={onDeleteClick}>확인</Button>
            </DialogClose>
          )}
          {dialogType === 'MEMBERSHIP_EXPIRED' && (
            <DialogClose asChild>
              <Link href={PATH.membershipIntro}>확인</Link>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ToggleStatusSwitch({
  onCheckedChange,
  checked,
  registerStatus,
}: {
  onCheckedChange?: (checked: boolean) => void;
  checked: boolean;
  registerStatus: MyProduct['registerStatus'];
}) {
  const label = {
    CREATED: '판매중',
    CLOSED: '판매중단',
    REPORTED: '판매중단',
    MEMBERSHIP_EXPIRED: '판매중단',
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <label
          className={cn(
            'rounded-[4px] p-[6px] flex items-center justify-between w-[140px]',
            registerStatus === 'CREATED' && 'bg-pink-50 text-pink-500',
            registerStatus === 'CLOSED' && 'bg-slate-50 text-slate-300'
          )}
        >
          <span className="typo-body-16-medium-100-tight">
            {label[registerStatus]}
          </span>
          <Switch
            onCheckedChange={onCheckedChange}
            checked={checked}
          />
        </label>
      </TooltipTrigger>
      {registerStatus === 'CREATED' && (
        <TooltipContent side="bottom">
          <TooltipTitle>판매 중</TooltipTitle>
          <TooltipDescription>
            판매상태를 중지하고 싶으시면 {'<'}판매중단{'>'}상태로 바꿔주세요
            <br />
            판매중단 시 신청 불가능 상태로 바뀝니다.
          </TooltipDescription>
        </TooltipContent>
      )}
      {registerStatus === 'CLOSED' && (
        <TooltipContent side="bottom">
          <TooltipTitle>판매 중단</TooltipTitle>
          <TooltipDescription>
            판매상태를 게시하고 싶으시면 {'<'}판매중{'>'}상태로 바꿔주세요
            <br />
            판매중 시 신청 가능 상태로 바뀝니다.
          </TooltipDescription>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
