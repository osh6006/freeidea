'use client';

import { useState } from 'react';

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
import { authorApplyStatusDict } from '@/constants/dictionary';
import { cn } from '@/lib/utils';
import { useAuthorApprovalListQuery } from '@/service/admin/author-approval/use-service';
import {
  AuthorApprovalkeywordType,
  IAuthorApprovalParams,
} from '@/types/admin/author-approval';
import { CheckedState } from '@radix-ui/react-checkbox';
import { format } from 'date-fns';

import BatchProcessing from './batch-processing';
import AuthorApprovalDialog from './dialog';
import { useAuthorApprovalStore } from './provider';

const LIMIT = 10;
const FORMAT_STR = 'yyyy-MM-dd';
const formatDate = (date: Date) => {
  return format(date, FORMAT_STR);
};
const HeadStyles = 'px-[10px]';
const CellStyles = 'typo-body-14-regular-150-tight px-[10px]';

const AuthorApprovalTable = () => {
  const {
    formState: {
      applyDateRange,
      examineDateRange,
      keyword,
      keywordType,
      requestStatus,
    },
  } = useAuthorApprovalStore();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? '1');
  const newParams: IAuthorApprovalParams = {
    page,
    limit: LIMIT,
    ...(keyword && { keyword }),
    ...(keywordType && {
      keywordType: keywordType as AuthorApprovalkeywordType,
    }),
    ...(requestStatus && { requestStatus }),
    ...(applyDateRange?.from && {
      applyStartDate: formatDate(applyDateRange.from),
    }),
    ...(applyDateRange?.to && {
      applyEndDate: formatDate(applyDateRange.to),
    }),
    ...(examineDateRange?.from && {
      examineStartDate: formatDate(examineDateRange.from),
    }),
    ...(examineDateRange?.to && {
      examineEndDate: formatDate(examineDateRange.to),
    }),
  };

  const { data, isLoading } = useAuthorApprovalListQuery(newParams);

  const [checkedRows, setCheckedRows] = useState<string[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  if (!data) return null;
  const { count, list, newApplyCount } = data;

  const handleAllCheck = () => {
    if (isAllChecked) {
      setCheckedRows([]);
    } else {
      setCheckedRows(list.map((item) => item.authorApplyId));
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
      <BatchProcessing
        checkedList={checkedRows}
        totalProcessed={count}
        newProcessed={newApplyCount}
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
          <TableHead className={HeadStyles}>회원ID</TableHead>
          <TableHead className={HeadStyles}>회원명</TableHead>
          <TableHead className={HeadStyles}>닉네임</TableHead>
          <TableHead className={HeadStyles}>연락처</TableHead>
          <TableHead className={HeadStyles}>신청일</TableHead>
          <TableHead className={HeadStyles}>심사일</TableHead>
          <TableHead className={HeadStyles}>상태</TableHead>
          <TableHead className={HeadStyles}>신청서</TableHead>
        </TableHeader>
        <TableBody>
          {list.map(
            (
              {
                authorApplyId,
                email,
                userName,
                nickname,
                createdAt,
                examinedAt,
                phoneNumber,
                requestStatus,
              },
              i
            ) => (
              <TableRow
                key={authorApplyId}
                className="typo-title-20-bold-100-tight text-slate-600"
              >
                <TableCell className={CellStyles}>
                  <Checkbox
                    className="size-[18px]"
                    checked={checkedRows.includes(authorApplyId)}
                    onCheckedChange={(check) =>
                      handleRowCheck(authorApplyId, check)
                    }
                  />
                </TableCell>
                <TableCell className={CellStyles}>{i + 1}</TableCell>
                <TableCell className={CellStyles}>{email}</TableCell>
                <TableCell className={CellStyles}>{userName}</TableCell>
                <TableCell className={CellStyles}>{nickname}</TableCell>
                <TableCell className={CellStyles}>{phoneNumber}</TableCell>
                <TableCell className={CellStyles}>
                  {format(createdAt, 'yyyy.MM.dd')}
                </TableCell>
                <TableCell className={CellStyles}>
                  {examinedAt ? format(examinedAt, 'yyyy.MM.dd') : '심사 전'}
                </TableCell>
                <TableCell
                  className={cn(
                    CellStyles,
                    authorApplyStatusDict
                      .getTranslator('en-color')
                      .translate(requestStatus)
                  )}
                >
                  {authorApplyStatusDict
                    .getTranslator('en-ko')
                    .translate(requestStatus)}
                </TableCell>
                <TableCell className={CellStyles}>
                  <AuthorApprovalDialog
                    id={authorApplyId}
                    email={email}
                    nickName={nickname}
                    userName={userName}
                  />
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

export default AuthorApprovalTable;
