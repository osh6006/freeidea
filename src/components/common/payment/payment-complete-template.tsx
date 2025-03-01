import { ReactNode } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';

type OrderInfoType = {
  label: ReactNode;
  price: number;
  quantity: number;
  status: string;
};

interface Props {
  title: string;
  orderInfo: OrderInfoType[];
  resultInfo: {
    label: string;
    value: string;
  }[];
  leftHref: string;
  rightHref: string;
}

export function OrderListTable({ info }: { info: OrderInfoType[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>작품정보</TableHead>
          <TableHead>수량</TableHead>
          <TableHead>진행상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {info.map(({ label, price, quantity, status }) => (
          <TableRow
            key={label?.toString()}
            className="typo-title-20-bold-100-tight text-slate-600"
          >
            <TableCell>
              <div className="flex flex-col gap-[10px]">
                <span className="typo-body-16-regular-150">{label}</span>
                <span className="typo-body-16-bold-100-tight">
                  {formatCurrency(price)}원
                </span>
              </div>
            </TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>{status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function PaymentCompleteTemplate({
  title,
  orderInfo,
  resultInfo,
  leftHref,
  rightHref,
}: Props) {
  return (
    <main className="w-[1200px] mx-auto">
      <div className="[&_h2]:typo-body-16-bold-100-tight flex flex-col gap-[30px]">
        <h1 className="typo-title-32-bold-150 text-center">{title}</h1>
        <div className="flex flex-col gap-[50px]">
          <section>
            <h2>주문 정보</h2>
            <OrderListTable info={orderInfo} />
          </section>
          <section>
            <h2>결제정보</h2>
            <Table>
              {resultInfo.map(({ label, value }) => (
                <TableRow key={label}>
                  <TableCell>{label}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </Table>
          </section>
        </div>
      </div>
      <div className="mt-[30px] mb-[200px] flex items-center justify-center gap-[20px]">
        <Button
          size="2xl"
          variant="outline"
          asChild
        >
          <Link href={leftHref}>계속 작품 감상하기</Link>
        </Button>
        <Button
          size="2xl"
          asChild
        >
          <Link href={rightHref}>주문 조회</Link>
        </Button>
      </div>
    </main>
  );
}
