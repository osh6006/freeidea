'use client';

import { SubmitHandler } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import { SecureButton } from '@/components/common/secure-button';
import SeperatorDot from '@/components/common/seperator-dot';
import { Icon } from '@/components/icon';
import { CommonAvatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useRangeDict } from '@/constants/dictionary';
import { FILE_TYPES } from '@/constants/file-types';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/utils';
import { ReportSchemaType } from '@/lib/zod/request/report-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useReportMutation } from '@/service/report/use-service';
import { storeQueryKey } from '@/service/store/query-option';
import {
  useStoreDetailQuery,
  useStoreReviewListQuery,
} from '@/service/store/use-service';
import { useFollowAuthorMutation } from '@/service/studio/use-service';
import { WorkDetailType } from '@/types/work';
import { DotsHorizontal } from '@untitled-ui/icons-react';

import { useWorkDetailScrapMutation } from './hooks';
import { useProductChatDialogStore } from './product-chat';

const fileTypeWrapper = 'flex items-center';
const fileTypeTitleStyle =
  'text-slate-500 w-[120px] typo-body-14-regular-150-tight';
const fileTypeContensStyle = 'typo-body-14-medium-100-tight';

const restInfoWrapper =
  'flex flex-col items-center w-full justify-center text-slate-600 typo-title-20-medium-tight';

const ProductInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { data: detailData } = useStoreDetailQuery(id);
  const { data: reviewData } = useStoreReviewListQuery({ productId: id });
  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();
  const { scrapMutate } = useWorkDetailScrapMutation();
  const { mutate: followMutate } = useFollowAuthorMutation();
  const { toast } = useToast();
  const { data: myInfo } = useMyInfoQuery();
  const { mutate: reportStoreMutate } = useReportMutation('store');
  const { setIsOpen } = useProductChatDialogStore();

  if (!detailData || !reviewData) return;

  const isMine = detailData.author.userId === myInfo?.userId;

  const allOptions = detailData.optionGroups.flatMap(({ options }) => options);
  const allPrices = allOptions.map(({ optionPrice }) => optionPrice);
  const lowestPrice = Math.min(...allPrices);

  const onShareClick = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast({ description: '링크가 복사되었습니다.' });
    } catch {
      toast({ description: '링크 복사에 실패했습니다.' });
    }
  };

  const onFollowClick = () => {
    const { studioId, isFollowing } = detailData.author;
    const prevData = setQueriesData<WorkDetailType>(
      {
        queryKey: storeQueryKey.detail(id),
      },
      (item) => ({
        ...item,
        author: { ...item.author, isFollowing: !isFollowing },
      })
    );
    followMutate(
      { studioId, isFollowing: !isFollowing },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  const onReportSubmit: SubmitHandler<ReportSchemaType> = ({
    title,
    contents,
  }) => {
    reportStoreMutate({ id, body: { title, contents } });
  };

  return (
    <div className="flex-1 flex flex-col justify-between gap-y-[20px]">
      <div className="flex justify-between items-center">
        <span className="typo-title-20-medium-tight">{detailData.title}</span>
        <span className="flex items-center gap-x-[20px]">
          {!isMine && (
            <button onClick={() => scrapMutate(id, !detailData.isScrapping)}>
              {detailData.isScrapping ? (
                <Icon.BookmarkSelect className="size-[20px]" />
              ) : (
                <Icon.Bookmark className="size-[20px]" />
              )}
            </button>
          )}

          <ReportDialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <DotsHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {isMine ? (
                  <DropdownMenuItem asChild>
                    <Link href={PATH.workUpdate(id)}>수정하기</Link>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    asChild
                    className="w-full"
                  >
                    <DialogTrigger>신고</DialogTrigger>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={onShareClick}>
                  공유하기
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ReportDialogContent onValidSubmit={onReportSubmit} />
          </ReportDialog>
        </span>
      </div>
      <div className="typo-title-28-bold-100">
        {formatCurrency(lowestPrice)}원~
      </div>

      <div className="flex-1">
        <ul className="py-[20px] space-y-[10px]">
          <li className={fileTypeWrapper}>
            <span className={fileTypeTitleStyle}>파일 제공 형태</span>
            <span className={fileTypeContensStyle}>
              {detailData.fileTypes
                .map(
                  (type) =>
                    FILE_TYPES.find(({ value }) => value === type)?.label
                )
                .join(', ')}
            </span>
          </li>
          <li className={fileTypeWrapper}>
            <span className={fileTypeTitleStyle}>수정횟수</span>
            <span className={fileTypeContensStyle}>
              {detailData.modifyCount === -1
                ? '무제한'
                : `${detailData.modifyCount}회`}
            </span>
          </li>
          <li className={fileTypeWrapper}>
            <span className={fileTypeTitleStyle}>사용범위</span>
            <span className={fileTypeContensStyle}>
              {detailData.useRange
                .map((range) =>
                  useRangeDict.getTranslator('en-ko').translate(range)
                )
                .join(' / ')}
            </span>
          </li>
          <li className={fileTypeWrapper}>
            <span className={fileTypeTitleStyle}>작업기간</span>
            <span className={fileTypeContensStyle}>
              {detailData.workDays}일
            </span>
          </li>
        </ul>

        <div className="flex w-full items-center justify-between gap-x-[23px] p-[10px]">
          <div className={restInfoWrapper}>
            <span>
              {reviewData.count || 0}
              <span className="typo-body-16-regular-150">개</span>
            </span>
            <span className="typo-body-14-regular-150-tight">댓글</span>
          </div>
          <Separator
            orientation="vertical"
            className="bg-slate-200 h-[42.5px]"
          />
          <div className={restInfoWrapper}>
            <span>
              {detailData.scraps}
              <span className="typo-body-16-regular-150">개</span>
            </span>
            <span className="typo-body-14-regular-150-tight">스크랩</span>
          </div>
        </div>
      </div>

      <Separator />
      <div className="flex items-center gap-x-[10px]">
        <Link href={PATH.studio(detailData.author.studioId)}>
          <CommonAvatar
            nickname={detailData.author.nickname}
            src={detailData.author.profileImageUrl}
            className="size-[40px]"
          />
        </Link>
        <div className="flex items-center gap-x-[6px] typo-body-16-bold-100-tight">
          <span>{detailData.author.nickname}</span>
          <SeperatorDot />
          {detailData.isSelling ? (
            <Image
              alt="sell-badge"
              src="/pngs/sell-badge.png"
              width={14}
              height={14}
              className="aspect-square"
            />
          ) : (
            <Image
              alt="not-sell-badge"
              src="/pngs/not-sell-badge.png"
              width={14}
              height={14}
              className="aspect-square"
            />
          )}
          {detailData.isSelling ? (
            <span className="text-primary ">판매중</span>
          ) : (
            <span className="text-slate-200 ">판매중단</span>
          )}
        </div>
      </div>
      {detailData.author.introduction && (
        <p className="typo-body-14-regular-150-tight  text-slate-500">
          {detailData.author.introduction}
        </p>
      )}
      {!isMine && (
        <div className="flex justify-between items-center gap-x-[10px]">
          <Button
            className="flex-1"
            variant={detailData.author.isFollowing ? 'secondary' : 'accent'}
            onClick={onFollowClick}
          >
            {detailData.author.isFollowing ? '팔로잉' : '팔로우'}
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            disabled={!detailData.isSelling}
            onClick={() => setIsOpen(true)}
            asChild
          >
            <SecureButton requiredLevel={'USER'}>채팅문의</SecureButton>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
