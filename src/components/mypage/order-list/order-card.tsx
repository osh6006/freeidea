import { membershipVariants } from '@/components/common/membership';
import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { cn, formatCurrency } from '@/lib/utils';

function OrderCard({
  title,
  type,
  orderDate,
}: {
  title: string;
  type: 'lite' | 'plus' | 'vip' | 'advertisement-a' | 'advertisement-b';
  orderDate: string;
}) {
  const option = {
    lite: {
      badge: <Badge type="lite" />,
      label: 'Lite 멤버십',
      price: MEMBERSHIP_OPTION.LITE.price,
    },
    plus: {
      badge: <Badge type="plus" />,
      label: 'Plus 멤버십',
      price: MEMBERSHIP_OPTION.PLUS.price,
    },
    vip: {
      badge: <Badge type="vip" />,
      label: 'VIP 멤버십',
      price: MEMBERSHIP_OPTION.VIP.price,
    },
    'advertisement-a': {
      badge: <Badge type="advertisement-a" />,
      label: '광고A',
      price: 10000,
    },
    'advertisement-b': {
      badge: <Badge type="advertisement-b" />,
      label: '광고B',
      price: 10000,
    },
  };

  return (
    <div className="flex flex-col gap-[20px] p-[30px] border border-border rounded-[10px]">
      <div className="typo-title-18-bold-100">{title}</div>
      <div className="flex gap-[10px] items-center">
        {option[type].badge}
        <div className="flex flex-col gap-[10px] flex-1">
          <div className="typo-body-16-medium-100-tight">
            {option[type].label}
          </div>
          <div className="typo-body-16-bold-100-tight">
            {formatCurrency(option[type].price)}원
          </div>
        </div>
        <div className="w-[140px] flex justify-between self-start typo-body-16-medium-100-tight">
          <span className="text-slate-500">주문날짜</span>
          <span>{orderDate}</span>
        </div>
      </div>
    </div>
  );
}

function Badge({
  type,
}: {
  type: 'lite' | 'plus' | 'vip' | 'advertisement-a' | 'advertisement-b';
}) {
  const label = {
    lite: (
      <>
        <span>Lite</span>
        <span>Membership</span>
      </>
    ),
    plus: (
      <>
        <span>VIP</span>
        <span>Membership</span>
      </>
    ),
    vip: (
      <>
        <span>VIP</span>
        <span>Membership</span>
      </>
    ),
    'advertisement-a': (
      <>
        <span>A Type</span>
        <span>광고</span>
      </>
    ),
    'advertisement-b': (
      <>
        <span>B Type</span>
        <span>광고</span>
      </>
    ),
  } as const;

  return (
    <div
      className={cn(
        'size-[100px] rounded-[6px] flex flex-col items-center justify-center typo-body-14-regular-150-tight',
        type === 'lite' || type === 'plus' || type === 'vip'
          ? membershipVariants({ variant: type })
          : 'border border-slate-200 bg-slate-50'
      )}
    >
      {label[type]}
    </div>
  );
}

export default OrderCard;
