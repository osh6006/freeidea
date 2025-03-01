'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Label } from '@/components/ui/label';
import Spinner from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipDescription,
  TooltipTitle,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { cn } from '@/lib/utils';
import { mypageQueryKey } from '@/service/mypage/query-option';
import {
  useMyRequestListQuery,
  useToggleRequestFinishMutation,
} from '@/service/mypage/use-service';
import { IMyPageRequest } from '@/types/request';
import { format, isBefore } from 'date-fns';

const MyPageRequestListTable = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || undefined;

  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMyRequestListQuery({ filter: filter });

  const { mutate } = useToggleRequestFinishMutation();
  const { rollbackQueriesData, setInfinitePageQueriesData } =
    useOptimisticUpdate();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  const list = data?.flattenList || [];
  const isEmpty = list.length <= 0 && data;

  const handleChange = (requestId: string, isFinished: boolean) => {
    const prevData = setInfinitePageQueriesData<IMyPageRequest>(
      {
        queryKey: mypageQueryKey.requestList({
          limit: 10,
        }),
      },
      {
        target: (item) => item.inquiryId === requestId,
        updater: (item) => {
          return { ...item, isFinished: !isFinished };
        },
      }
    );

    mutate(
      {
        requestId,
        isFinished: !isFinished,
      },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  if (!data) return null;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>의뢰글 제목</TableHead>
            <TableHead>작성 날짜</TableHead>
            <TableHead>마감 일</TableHead>
            <TableHead>지원자</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        {!isEmpty && (
          <TableBody>
            {list?.map(
              ({
                inquiryId,
                title,
                createdAt,
                dueDate,
                applications,
                isFinished,
              }) => {
                const isDead = isBefore(dueDate, new Date());

                return (
                  <TableRow
                    key={inquiryId}
                    className={cn(
                      'typo-body-14-regular-150-tight',
                      isDead ? 'text-slate-300 ' : ''
                    )}
                  >
                    <TableCell>
                      <Link href={PATH.requestDetail(inquiryId)}>{title}</Link>
                    </TableCell>
                    <TableCell>
                      {format(createdAt || new Date(), 'yy.MM.dd')}
                    </TableCell>
                    <TableCell>
                      {format(dueDate || new Date(), 'yy.MM.dd')}
                    </TableCell>
                    <TableCell className="font-bold">{applications}</TableCell>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger>
                          <div
                            className={cn(
                              'flex items-center gap-x-[10px] p-[6px] rounded-sm w-[102px]',
                              isFinished
                                ? 'bg-slate-50 text-slate-300'
                                : 'bg-pink-50 text-pink-500'
                            )}
                          >
                            <Label htmlFor="airplane-mode">
                              {isFinished ? '마감' : '모집중'}
                            </Label>
                            <span>
                              <Switch
                                disabled={isDead}
                                checked={!isFinished}
                                onCheckedChange={() =>
                                  handleChange(inquiryId, isFinished)
                                }
                              />
                            </span>
                          </div>
                          <TooltipContent
                            side="bottom"
                            className="text-left"
                          >
                            <TooltipTitle>모집 중</TooltipTitle>
                            <TooltipDescription>
                              지원자 선정이 완료되었다면 마감으로 변경해주세요.
                              <br />
                              (마감 시 다시 모집중으로 수정은 불가해요)
                            </TooltipDescription>
                          </TooltipContent>
                        </TooltipTrigger>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        )}
      </Table>

      {isEmpty && (
        <div className="my-[28px] text-center w-full typo-body-14-medium-100-tight">
          내가 올린 의뢰글이 없어요
        </div>
      )}
      {isRefetching && (
        <div className="w-full flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

export default MyPageRequestListTable;
