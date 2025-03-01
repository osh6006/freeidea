'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import CommonPagination from '@/components/common/common-pagination';
import {
  ErrorBox,
  ErrorButtonGroup,
  ErrorContent,
  ErrorDescription,
  ErrorImage,
  ErrorTitle,
} from '@/components/common/error-box';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { paymentMethodDict } from '@/constants/dictionary';
import { PATH } from '@/constants/path';
import useQueryString from '@/hooks/use-query-string';
import { formatCurrency } from '@/lib/utils';
import { useMyMembershipPayment } from '@/service/mypage/use-service';
import { add, formatDate, isAfter } from 'date-fns';

export default function MyMembershipPaymentInfo() {
  const { data, error } = useMyMembershipPayment();
  const { createQueryString } = useQueryString();

  if (error)
    return (
      <ErrorBox>
        <ErrorImage src={'/errors/unknown.png'} />
        <ErrorContent>
          <ErrorTitle>ERROR</ErrorTitle>
          <ErrorDescription>알 수 없는 에러가 발생했어요!</ErrorDescription>
          <ErrorButtonGroup>
            <Button asChild>
              <Link href={PATH.home}>홈으로 가기</Link>
            </Button>
          </ErrorButtonGroup>
        </ErrorContent>
      </ErrorBox>
    );

  if (!data) return;

  const { list, count, page } = data;

  if (list.length === 0)
    return (
      <div className="flex flex-col py-[200px] gap-[30px] items-center">
        <span className="typo-title-24-bold-tight">
          멤버십 가입 내역이 없어요
        </span>
        <Button
          variant="outline"
          asChild
          size="2xl"
        >
          <Link href={PATH.membershipIntro}>멤버십 가입하기</Link>
        </Button>
      </div>
    );

  return (
    <>
      <div>
        <div className="flex justify-between mb-[20px]">
          <h2 className="typo-title-18-bold-100">결제내역</h2>
          <DateSelect />
        </div>
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">주문번호</TableHead>
              <TableHead className="text-center">멤버십 명</TableHead>
              <TableHead className="text-center">결제 날짜</TableHead>
              <TableHead className="text-center">결제 금액</TableHead>
              <TableHead className="text-center">사용 기간</TableHead>
              <TableHead className="text-center">결제 수단</TableHead>
              <TableHead className="text-center">상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map(
              ({
                membershipOrderId,
                orderNumber,
                membershipType,
                orderedAt,
                startedAt,
                paymentMethod,
                paidAmount,
                finishedAt,
              }) => {
                const formatStr = 'yyyy.MM.dd';
                const status = isAfter(finishedAt, new Date())
                  ? '이용 중'
                  : '종료';

                return (
                  <TableRow key={membershipOrderId}>
                    <TableCell>{orderNumber}</TableCell>
                    <TableCell>{membershipType}</TableCell>
                    <TableCell>{formatDate(orderedAt, formatStr)}</TableCell>
                    <TableCell>{formatCurrency(paidAmount)}원</TableCell>
                    <TableCell>
                      {formatDate(startedAt, formatStr)} ~<br />
                      {formatDate(finishedAt, formatStr)}
                    </TableCell>
                    <TableCell>
                      {paymentMethodDict
                        .getTranslator('backend-ko')
                        .translate(paymentMethod)}
                    </TableCell>
                    <TableCell>{status}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </div>

      <CommonPagination
        currentPage={page}
        totalItems={count}
        itemsPerPage={10}
        getHref={(page) => `?${createQueryString('page', String(page))}`}
      />
    </>
  );
}

function DateSelect() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const now = new Date();
  const formatStr = 'yyyy-MM-dd';

  const menus = [
    {
      label: '지난 7일',
      value: formatDate(add(now, { days: 7 }), formatStr),
    },
    {
      label: '한 달',
      value: formatDate(add(now, { months: 1 }), formatStr),
    },
    {
      label: '3개월',
      value: formatDate(add(now, { months: 3 }), formatStr),
    },
    {
      label: '6개월',
      value: formatDate(add(now, { months: 6 }), formatStr),
    },
  ];
  const endDate = searchParams.get('endDate') ?? menus[1].value;

  return (
    <div className="flex items-center gap-[4px]">
      <span className="typo-body-14-regular-150-tight text-slate-500">
        ({formatDate(now, formatStr)} ~ {endDate})
      </span>
      <Select
        onValueChange={(value) => replace(`?endDate=${value}`)}
        value={endDate}
      >
        <SelectTrigger className="w-fit border-none typo-body-16-bold-100-tight">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {menus.map(({ label, value }) => (
            <SelectItem
              key={value}
              value={value}
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
