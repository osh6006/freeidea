'use client';

import PaymentCompleteTemplate from '@/components/common/payment/payment-complete-template';
import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { PATH } from '@/constants/path';
import { membershipMutationKey } from '@/service/membership/mutation-option';
import { MembershipType } from '@/types/membership';
import { useMutationState } from '@tanstack/react-query';
import { formatDate } from 'date-fns';

export default function PaymentCompletePage() {
  const variablesHistory = useMutationState<{ membershipType: MembershipType }>(
    {
      filters: {
        mutationKey: membershipMutationKey.payment,
        status: 'success',
      },
      select: (d) => d.state.variables as { membershipType: MembershipType },
    }
  );

  const latestVriables = variablesHistory.at(-1);

  if (!latestVriables?.membershipType)
    return (
      <div className="size-[300px] mx-auto text-center content-center">
        주문 정보가 없습니다.
      </div>
    );

  const option = MEMBERSHIP_OPTION[latestVriables.membershipType];

  const orderInfo = [
    {
      label: option.title,
      price: option.price,
      quantity: 1,
      status: '결제 완료',
    },
  ];

  const resultInfo = [
    {
      label: '결제방법',
      value: '카드',
    },
    {
      label: '주문 완료 일시',
      value: formatDate(new Date(), 'yyyy-MM-dd'),
    },
    {
      label: '결제 금액',
      value: `${option?.price}원`,
    },
  ];

  return (
    <main className="w-[1200px] mx-auto">
      <PaymentCompleteTemplate
        title={'멤버십 결제가 완료되었습니다.'}
        orderInfo={orderInfo}
        resultInfo={resultInfo}
        leftHref={PATH.membershipIntro}
        rightHref={PATH.myMemberShip}
      />
    </main>
  );
}
