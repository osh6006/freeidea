'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import Spinner from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useMyRequestStateListQuery } from '@/service/mypage/use-service';
import { format } from 'date-fns';

import MypageRequestStateApplyDialog from './dialog';

const RequestStateListTable = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || undefined;

  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMyRequestStateListQuery({
    filter,
  });

  const { data: myInfo } = useMyInfoQuery();

  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  const list = data?.flattenList || [];
  const isEmpty = list.length <= 0 && data;

  if (!data) return null;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>의뢰글 제목</TableHead>
            <TableHead>작성 날짜</TableHead>
            <TableHead>마감 일</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>나의 지원서</TableHead>
          </TableRow>
        </TableHeader>
        {!isEmpty && (
          <TableBody>
            {list?.map(
              ({
                title,
                inquiryApplyId,
                createdAt,
                dueDate,
                isFinished,
                inquiryId,
              }) => {
                return (
                  <TableRow key={inquiryApplyId}>
                    <TableCell className="flex-1 typo-body-14-bold-100-tight ">
                      <Link href={PATH.requestDetail(inquiryId)}>{title}</Link>
                    </TableCell>
                    <TableCell>{format(createdAt, 'yyyy.MM.dd')}</TableCell>
                    <TableCell>{format(dueDate, 'yyyy.MM.dd')}</TableCell>
                    <TableCell
                      className={cn(
                        'font-bold',
                        isFinished ? 'text-slate-300' : 'text-success'
                      )}
                    >
                      {isFinished ? '마감' : '지원완료'}
                    </TableCell>
                    <TableCell>
                      <MypageRequestStateApplyDialog
                        id={inquiryApplyId}
                        nickname={myInfo?.nickname || ''}
                      />
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
          지원한 이력이 없어요
        </div>
      )}
      {isRefetching && (
        <div className="w-full flex items-center justify-center mt-[20px]">
          <Spinner />
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

export default RequestStateListTable;
