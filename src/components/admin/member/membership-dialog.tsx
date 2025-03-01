import { PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';

import { Receipt, icons } from 'lucide-react';

import { UntitledIcon } from '@/components/icon';
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Spinner from '@/components/ui/spinner';
import { MembershipDict, paymentMethodDict } from '@/constants/dictionary';
import { cn, formatCurrency } from '@/lib/utils';
import { useAdminMembershipPaymentQuery } from '@/service/admin/member/use-service';
import { PaymentMethodType } from '@/types/membership';
import { format } from 'date-fns';

const PaymentIcons: Record<
  PaymentMethodType,
  {
    label: string;
    icon: React.ReactNode;
  }
> = {
  PaymentMethodCard: {
    label: '카드',
    icon: <UntitledIcon.CreditCard02 className="size-[20px]" />,
  },
  PaymentMethodEasyPay: {
    label: '간편 결제',
    icon: <UntitledIcon.CoinsHand className="size-[20px]" />,
  },
  PaymentMethodMobile: {
    label: '모바일',
    icon: <UntitledIcon.Phone01 className="size-[20px]" />,
  },
  PaymentMethodVirtualAccount: {
    label: '가상 계좌',
    icon: <UntitledIcon.BankNote02 className="size-[20px]" />,
  },
  PaymentMethodGiftCertificate: {
    label: '상품권',
    icon: <UntitledIcon.Gift01 className="size-[20px]" />,
  },
  PaymentMethodTransfer: {
    label: '계좌 이체',
    icon: <UntitledIcon.CoinsSwap02 className="size-[20px]" />,
  },
};

const AdminMemberShipDialog = ({
  id,
  children,
}: PropsWithChildren & { id: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full">{children}</button>
      </DialogTrigger>
      <DialogPortal>
        <MembershipDialogContents id={id} />
      </DialogPortal>
    </Dialog>
  );
};

const MembershipDialogContents = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAdminMembershipPaymentQuery(id, { limit: 10 });

  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  if (isLoading) {
    return null;
  }

  const list = data?.flattenList || [];

  return (
    <DialogContent className="gap-y-2 max-w-lg">
      <div className="font-semibold">멤버십 결제</div>
      <ScrollArea className="h-[500px] py-12">
        <ul className="space-y-5 text-xs">
          {list.map((item, i) => {
            return (
              <li
                key={item.membershipOrderId}
                className="flex items-center justify-between border rounded-sm p-4"
              >
                <div className="flex items-center gap-x-4">
                  <span className="size-5 flex items-center justify-center bg-slate-50 aspect-square p-1 rounded-sm ">
                    {i + 1}
                  </span>
                  <span className="flex items-center gap-x-1">
                    <UntitledIcon.Calendar className="size-[20px]" />
                    {format(item.orderedAt, 'yyyy-MM-dd')}
                  </span>
                  |
                  <span className="flex items-center gap-x-1">
                    <span>{PaymentIcons[item.paymentMethod].icon}</span>
                    <span>{PaymentIcons[item.paymentMethod].label}</span>
                  </span>
                  |
                  <span className="flex items-center gap-x-1">
                    <Receipt
                      className="size-[20px]"
                      strokeWidth={1.2}
                    />
                    {formatCurrency(item.paidAmount)}
                  </span>
                </div>
                <div
                  className={cn(
                    'w-[50px] flex items-center justify-center rounded-md',
                    MembershipDict.getTranslator('en-bgColor').translate(
                      item.membershipType
                    ),
                    MembershipDict.getTranslator('en-textColor').translate(
                      item.membershipType
                    )
                  )}
                >
                  {item.membershipType}
                </div>
              </li>
            );
          })}

          {isRefetching && (
            <div className="w-full flex items-center justify-center ">
              <Spinner />
            </div>
          )}
          <div ref={ref} />
        </ul>
      </ScrollArea>
    </DialogContent>
  );
};

export default AdminMemberShipDialog;
