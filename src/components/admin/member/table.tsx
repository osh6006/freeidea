'use client';

import { useSearchParams } from 'next/navigation';

import CommonPagination from '@/components/common/common-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { userLevelDict, userStatusDict } from '@/constants/dictionary';
import { cn, formatCurrency } from '@/lib/utils';
import { useAdminMemberlListQuery } from '@/service/admin/member/use-service';
import { IAdminMemberParams } from '@/types/admin/member';
import { format } from 'date-fns';

import AdminMemberDetailDialog from './dialog';
import { useAdminMemberStore } from './provider';

const LIMIT = 10;
const FORMAT_STR = 'yyyy-MM-dd';
const formatDate = (date: Date) => {
  return format(date, FORMAT_STR);
};
const HeadStyles = 'px-[10px]';
const CellStyles = 'typo-body-14-regular-150-tight px-[10px]';

const AdminMemberTable = () => {
  const {
    formState: { keyword, keywordType, createDateRange, userLevel, userStatus },
  } = useAdminMemberStore();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const newParams: IAdminMemberParams = {
    page,
    limit: LIMIT,
    ...(keyword && { keyword }),
    ...(keywordType && {
      keywordType: keywordType,
    }),
    ...(createDateRange?.from && {
      examineStartDate: formatDate(createDateRange.from),
    }),
    ...(createDateRange?.to && {
      examineEndDate: formatDate(createDateRange.to),
    }),
    ...(userLevel && userLevel !== 'ALL' && { userLevel }),
    ...(userStatus && userStatus !== 'ALL' && { userStatus }),
  };

  const { data, isLoading } = useAdminMemberlListQuery(newParams);

  if (!data) return null;

  const { count, list, authorCount, userCount } = data;

  return (
    <section className="space-y-[20px]">
      <div className="flex gap-x-2">
        <span>
          총 회원 : <strong className="ml-2">{count}</strong>
        </span>
        |
        <span>
          일반 회원 :
          <strong className="ml-2 text-mustard-600">
            {formatCurrency(userCount)}
          </strong>
        </span>
        |
        <span>
          작가 회원 :{' '}
          <strong className="ml-2 text-neonGreen-600">
            {formatCurrency(authorCount)}
          </strong>
        </span>
      </div>
      <Table>
        <TableHeader>
          <TableHead className={HeadStyles}>No.</TableHead>
          <TableHead className={HeadStyles}>회원ID</TableHead>
          <TableHead className={HeadStyles}>회원명</TableHead>
          <TableHead className={HeadStyles}>닉네임</TableHead>
          <TableHead className={HeadStyles}>연락처</TableHead>
          <TableHead className={HeadStyles}>가입일</TableHead>
          <TableHead className={HeadStyles}>최근 접속일</TableHead>
          <TableHead className={HeadStyles}>회원 구분</TableHead>
          <TableHead className={HeadStyles}>회원 상태</TableHead>
          <TableHead className={HeadStyles}>계정 정보</TableHead>
        </TableHeader>
        <TableBody>
          {list.map(
            (
              {
                userId,
                email,
                userName,
                nickname,
                createdAt,
                phoneNumber,
                recentLoginAt,
                userLevel,
                userStatus,
              },
              i
            ) => (
              <TableRow
                key={userId}
                className="typo-title-20-bold-100-tight text-slate-600"
              >
                <TableCell className={CellStyles}>{i + 1}</TableCell>
                <TableCell className={CellStyles}>{email}</TableCell>
                <TableCell className={CellStyles}>{userName}</TableCell>
                <TableCell className={CellStyles}>{nickname}</TableCell>
                <TableCell className={CellStyles}>{phoneNumber}</TableCell>
                <TableCell className={CellStyles}>
                  {format(createdAt, 'yyyy.MM.dd')}
                </TableCell>
                <TableCell className={cn(CellStyles, 'text-center')}>
                  {recentLoginAt ? format(recentLoginAt, 'yyyy.MM.dd') : '-'}
                </TableCell>
                <TableCell className={cn(CellStyles, 'text-center')}>
                  {userLevelDict
                    .getTranslator('en-ko')
                    .translate(userLevel || '')}
                </TableCell>

                <TableCell
                  className={cn(
                    CellStyles,
                    'text-center',
                    userStatusDict
                      .getTranslator('en-color')
                      .translate(userStatus || '')
                  )}
                >
                  {userStatusDict
                    .getTranslator('en-ko')
                    .translate(userStatus || '')}
                </TableCell>
                <TableCell className={CellStyles}>
                  <AdminMemberDetailDialog id={userId} />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center mt-[20px]">
        <CommonPagination
          currentPage={page}
          totalItems={count}
          itemsPerPage={LIMIT}
          getHref={(page) => `?page=${page}`}
        />
      </div>
    </section>
  );
};

export default AdminMemberTable;
