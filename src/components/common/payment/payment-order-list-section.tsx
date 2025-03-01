import { formatCurrency } from '@/lib/utils';

interface Props {
  options: { title: string; price: number }[];
  benefits: string[];
}

export default function PaymentOrderListSection({ options, benefits }: Props) {
  return (
    <section className="flex flex-col gap-[20px]">
      <h2>주문 목록</h2>
      <div className="border border-border rounded-[6px] [&>*]:p-[20px] flex flex-col divide-y divide-border">
        <div className="flex gap-1">
          <span className="w-[120px] typo-body-14-regular-150-tight">혜택</span>
          <ul className="list-disc typo-body-14-medium-100-tight flex flex-col gap-[6px]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>
        {options.map(({ title, price }) => (
          <div
            key={title}
            className="flex flex-col gap-[10px]"
          >
            <span className="typo-body-16-regular-150">{title}</span>
            <span className="typo-title-20-bold-100-tight">
              {formatCurrency(price)}원
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
