'use client';

import { cn, formatCurrency } from '@/lib/utils';

import { Button } from '../../ui/button';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';
import { Separator } from '../../ui/separator';

interface Props {
  totlaPrice: number;
  prices: { name: string; price: number }[];
  agree?: boolean;
  onAgreeChange?: (agree: boolean) => void;
  allAgree?: boolean;
  onAllAgreeChange?: (agree: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export default function PaymentSidebar({
  prices,
  agree,
  allAgree,
  onAgreeChange,
  onAllAgreeChange,
  disabled,
  className,
}: Props) {
  const totalPrice = prices.reduce((acc, { price }) => (acc += price), 0);
  return (
    <div
      className={cn(
        'w-[410px] sticky top-[100px] h-fit flex flex-col gap-[20px]',
        className
      )}
    >
      <div className="border border-slate-200 p-[30px] rounded-[4px] ">
        <h2>결제금액</h2>
        <Separator className="my-[30px]" />

        <div className="flx flex-col gap-[10px]">
          <ul className="flex flex-col gap-[10px]">
            {prices.map(({ name, price }) => (
              <li
                key={name}
                className="flex justify-between items-center"
              >
                <span className="typo-body-14-regular-150">{name}</span>
                <span className="typo-body-16-medium-100-tight">
                  {formatCurrency(price)}원
                </span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <h2>총 결제 금액</h2>
            <span className="text-pink-500 typo-title-32-bold-150">
              {formatCurrency(totalPrice)}원
            </span>
          </div>
        </div>

        <Separator className="my-[20px]" />

        <Label className="typo-body-16-medium-100-tight flex gap-[10px] items-center mb-[20px]">
          <Checkbox
            checked={agree}
            onCheckedChange={onAgreeChange}
          />
          아래 내용에 모두 동의합니다.
        </Label>

        <Label className="flex gap-[10px] items-center mb-[16px] typo-body-14-medium-100-tight text-text-sub">
          <Checkbox
            checked={allAgree}
            onCheckedChange={onAllAgreeChange}
          />
          개인정보 수집 이용 및 제 3자 제공 동의 (필수)
        </Label>

        <div className="typo-body-14-regular-150-tight mb-[10px] text-text-sub">
          본인은 만 14세 이상이며, 주문 내용을 확인하였습니다.
        </div>
        <p className="typo-body-14-regular-150-tight text-text-sub">
          프리디어 멤버십은 가입 후 환불이 불가능 하며 서비스의 결함으로 인해
          멤버십 혜택을 정상적으로 이용할 수 없는 경우, 이용자는 프리디어
          이용센터에 문의하여 환불을 요청할 수 있습니다.
        </p>
      </div>
      <Button
        variant="accent"
        size="lg"
        className="w-full"
        type="submit"
        disabled={disabled}
      >
        {formatCurrency(totalPrice)}원 결제하기
      </Button>
    </div>
  );
}
