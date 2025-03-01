'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import CommonPagination from '@/components/common/common-pagination';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PATH } from '@/constants/path';
import { useAdminEventListQuery } from '@/service/admin/event/use-service';
import '@/types/admin/author-approval';
import { AdminEventKeywordType, IAdminEventParams } from '@/types/admin/event';
import { CheckedState } from '@radix-ui/react-checkbox';
import { format } from 'date-fns';

import AdminBatchProcessing from './batch-processing';
import AdminEventOption from './dialog';
import { useAdminEventStore } from './provider';

const LIMIT = 10;
const FORMAT_STR = 'yyyy-MM-dd';
const formatDate = (date: Date) => {
  return format(date, FORMAT_STR);
};
const HeadStyles = 'px-[10px]';
const CellStyles = 'typo-body-14-regular-150-tight px-[10px]';

const AdminEventTable = () => {
  const {
    formState: {
      keyword,
      keywordType,
      createDateRange,
      publishDateRange,
      isUsed,
    },
  } = useAdminEventStore();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const newParams: IAdminEventParams = {
    page,
    limit: LIMIT,
    ...(keyword && { keyword }),
    ...(keywordType && {
      keywordType: keywordType as AdminEventKeywordType,
    }),
    ...(createDateRange?.from && {
      createStartDate: formatDate(createDateRange.from),
    }),
    ...(createDateRange?.to && {
      createEndDate: formatDate(createDateRange.to),
    }),
    ...(publishDateRange?.from && {
      publishStartDate: formatDate(publishDateRange.from),
    }),
    ...(publishDateRange?.to && {
      publishEndDate: formatDate(publishDateRange.to),
    }),
    ...(isUsed && isUsed === 'true'
      ? { isUsed: true }
      : isUsed === 'false' && { isUsed: false }),
  };

  const { data, isLoading } = useAdminEventListQuery(newParams);

  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  if (!data) return null;
  const { count, list, unusedCount, usedCount } = data;

  const handleAllCheck = () => {
    if (isAllChecked) {
      setCheckedRows([]);
    } else {
      setCheckedRows(list.map((item) => item.eventId));
    }
    setIsAllChecked(!isAllChecked);
  };

  const handleRowCheck = (id: string, check: CheckedState) => {
    const isChecked = check === true;
    const newCheckedRows = isChecked
      ? [...checkedRows, id]
      : checkedRows.filter((rowId) => rowId !== id);

    setCheckedRows(newCheckedRows);
    setIsAllChecked(newCheckedRows.length === list.length);
  };

  return (
    <section className="space-y-[20px]">
      <AdminBatchProcessing
        checkedList={checkedRows}
        total={count}
        unUseCount={unusedCount}
        useCount={usedCount}
        setCheckList={setCheckedRows}
      />
      <Table>
        <TableHeader>
          <TableHead className={HeadStyles}>
            <Checkbox
              className="size-[18px]"
              checked={isAllChecked}
              onCheckedChange={handleAllCheck}
            />
          </TableHead>
          <TableHead className={HeadStyles}>No.</TableHead>
          <TableHead className={HeadStyles}>제목</TableHead>
          <TableHead className={HeadStyles}>작성일</TableHead>
          <TableHead className={HeadStyles}>게시일</TableHead>
          <TableHead className={HeadStyles}>상태</TableHead>
          <TableHead className={HeadStyles}>상세보기</TableHead>
        </TableHeader>
        <TableBody>
          {list.map(({ title, createdAt, eventId, isUsed, publishedAt }, i) => (
            <TableRow
              key={eventId}
              className="typo-title-20-bold-100-tight text-slate-600"
            >
              <TableCell className={CellStyles}>
                <Checkbox
                  className="size-[18px]"
                  checked={checkedRows.includes(eventId)}
                  onCheckedChange={(check) => handleRowCheck(eventId, check)}
                />
              </TableCell>
              <TableCell className={CellStyles}>{i + 1}</TableCell>
              <TableCell className={CellStyles}>
                <Link
                  href={PATH.adminEventDetail(eventId)}
                  className="hover:underline transition duration-150"
                >
                  {title}
                </Link>
              </TableCell>
              <TableCell className={CellStyles}>
                {format(createdAt, 'yyyy.MM.dd')}
              </TableCell>
              <TableCell className={CellStyles}>
                {format(publishedAt, 'yyyy.MM.dd')}
              </TableCell>
              <TableCell className={CellStyles}>
                {isUsed ? '공개' : '비공개'}
              </TableCell>
              <TableCell className={CellStyles}>
                <AdminEventOption id={eventId} />
              </TableCell>
            </TableRow>
          ))}
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

export default AdminEventTable;
