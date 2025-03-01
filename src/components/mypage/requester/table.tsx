'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';

import { CommonAvatar } from '@/components/ui/avatar';
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
import { useMyRequesterListQuery } from '@/service/mypage/use-service';
import { format } from 'date-fns';

import RequesterChatDialog from './chat-dialog';
import MypageRequesterApplyDialog from './dialog';

const RequesterListTable = () => {
  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMyRequesterListQuery({});

  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  const list = data?.flattenList || [];
  const isEmpty = list.length <= 0 && data;

  if (!data) return null;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>의뢰글 제목</TableHead>
            <TableHead>지원자 명</TableHead>
            <TableHead>지원 날짜</TableHead>
            <TableHead>지원서</TableHead>
            <TableHead>1:1 문의</TableHead>
          </TableRow>
        </TableHeader>
        {!isEmpty && (
          <TableBody>
            {list?.map(({ title, inquiryId, applies }) => {
              const profiles = applies?.map((el) => ({
                name: el.nickname,
                id: el.userId,
                url: el.profileImageUrl,
              }));
              const createdAts = applies?.map((el) =>
                format(el.createdAt, 'yy.MM.dd')
              );
              const ids = applies?.map((el) => ({
                id: el.inquiryApplyId,
                name: el.nickname,
              }));

              return (
                <TableRow key={inquiryId}>
                  <TableCell className="flex-1 typo-body-14-bold-100-tight ">
                    <Link href={PATH.requestDetail(inquiryId)}>{title}</Link>
                  </TableCell>
                  <TableCell className="space-y-[10px]">
                    {profiles?.map(({ id, name, url }) => (
                      <div
                        className="flex items-center gap-x-1"
                        key={id}
                      >
                        <CommonAvatar
                          nickname={name}
                          src={url}
                        />
                        <span>{name}</span>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="space-y-[10px]">
                    {createdAts?.map((date) => (
                      <div
                        className="flex items-center gap-x-1"
                        key={date}
                      >
                        {date}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="space-y-[10px]">
                    {ids?.map(({ id, name }) => (
                      <div
                        className="flex items-center gap-x-1"
                        key={id}
                      >
                        <MypageRequesterApplyDialog
                          name={name}
                          id={id}
                        />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="space-y-[10px]">
                    {profiles?.map(({ id }) => (
                      <RequesterChatDialog
                        key={id}
                        id={id}
                      />
                    ))}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
      {isEmpty && (
        <div className="my-[28px] text-center w-full typo-body-14-medium-100-tight">
          지원자가 없어요
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

export default RequesterListTable;
