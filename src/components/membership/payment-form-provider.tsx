'use client';

import { PropsWithChildren } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';

import { PAY_OPTIONS } from '@/constants/payment/button-option';
import { useToast } from '@/hooks/use-toast';
import { compressUUID } from '@/lib/utils';
import { membershipPaymentSchema } from '@/lib/zod/membership/schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useRegistMembershipMutation } from '@/service/membership/use-service';
import { MembershipPaymentSchema } from '@/types/membership';
import { zodResolver } from '@hookform/resolvers/zod';
import * as PortOne from '@portone/browser-sdk/v2';

import { Icon } from '../icon';
import { Form } from '../ui/form';

interface Props {
  defaultValues: DefaultValues<MembershipPaymentSchema>;
}

export default function PaymentFormProvider({
  children,
  defaultValues,
}: PropsWithChildren<Props>) {
  const methods = useForm<MembershipPaymentSchema>({
    resolver: zodResolver(membershipPaymentSchema),
    defaultValues,
  });
  const { data: myInfo } = useMyInfoQuery();
  const { mutate: resgistMutate, isPending } = useRegistMembershipMutation();
  const { toast } = useToast();

  const onValid = async ({ payMethod, level }: MembershipPaymentSchema) => {
    const option = PAY_OPTIONS[payMethod];
    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;
    const issueId = `payment${crypto.randomUUID()}`.replaceAll('-', '');

    const issueResponse = await PortOne.requestIssueBillingKey({
      storeId,
      channelKey,
      billingKeyMethod: option.payMethod,
      issueId,
      customer: {
        customerId: compressUUID(myInfo?.userId ?? ''),
      },
    });

    if (issueResponse?.code !== undefined)
      throw new Error(`빌링키 발급 실패: ${issueResponse?.message}`);

    if (!issueResponse || !issueResponse?.billingKey)
      throw new Error('issueResponse not found');

    resgistMutate({
      billingKey: issueResponse.billingKey,
      membershipType: level,
    });
  };

  const onInvalid = () => {
    toast({
      variant: 'destructive',
      description: '결제 수단 또는 동의 항목 선택을 확인해주세요.',
    });
  };

  return (
    <Form {...methods}>
      {isPending && (
        <div className="fixed z-[51] inset-0 flex flex-col justify-center items-center gap-4 bg-black/50">
          <Icon.TosomLoading />
          <span className="typo-title-18-medium-100 text-white">
            결제 처리 중입니다.
          </span>
        </div>
      )}
      <form onSubmit={methods.handleSubmit(onValid, onInvalid)}>
        {children}
      </form>
    </Form>
  );
}
