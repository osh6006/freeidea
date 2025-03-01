'use client';

import { useFormContext } from 'react-hook-form';

import { PAY_BUTTON_OPTIONS } from '@/constants/payment/button-option';
import { MembershipPaymentSchema } from '@/types/membership';

import PaymentMethodsSection from '../common/payment/payment-methods-section';
import { FormField, FormItem } from '../ui/form';

export default function MembershipPaymentMethodsSection() {
  const { control } = useFormContext<MembershipPaymentSchema>();
  const payButtonOptions = PAY_BUTTON_OPTIONS.filter(
    ({ payMethod }) => payMethod === 'card'
  );

  return (
    <FormField
      control={control}
      name="payMethod"
      render={({ field }) => (
        <FormItem>
          <PaymentMethodsSection
            payButtonOptions={payButtonOptions}
            payMethod={field.value}
            onPayMethodChange={field.onChange}
          />
        </FormItem>
      )}
    />
  );
}
