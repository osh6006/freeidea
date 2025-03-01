'use client';

import { useFormContext } from 'react-hook-form';

import { useSearchParams } from 'next/navigation';

import { MEMBERSHIP_OPTION } from '@/constants/membership/option';
import { MembershipPaymentSchema } from '@/types/membership';

import PaymentSidebar from '../common/payment/payment-side-bar';
import { FormField, FormItem } from '../ui/form';

export default function MembershipPaymentSidebar() {
  const { control } = useFormContext<MembershipPaymentSchema>();
  const searchParams = useSearchParams();
  const level = searchParams.get('level');

  if (!(level === 'LITE' || level === 'PLUS' || level === 'VIP'))
    throw new Error('level is invalid');

  const option = MEMBERSHIP_OPTION[level];

  const priceWithoutVat = Math.round((option.price * 10) / 11);
  const vat = Math.round(option.price - priceWithoutVat);
  return (
    <FormField
      control={control}
      name="agreement"
      render={({ field, formState }) => (
        <FormItem>
          <PaymentSidebar
            className="sticky top-[50px]"
            prices={[
              { name: `${option.title} 멤버십`, price: priceWithoutVat },
              { name: '부가세', price: vat },
            ]}
            totlaPrice={0}
            agree={field.value}
            allAgree={field.value}
            onAgreeChange={field.onChange}
            onAllAgreeChange={field.onChange}
            disabled={!formState.isValid}
          />
        </FormItem>
      )}
    />
  );
}
