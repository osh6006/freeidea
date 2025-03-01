'use client';

import { Fragment } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TPayButtonOption } from '@/constants/payment/button-option';
import { cn } from '@/lib/utils';

interface Props {
  easyPayButtonOptions?: TPayButtonOption[];
  payButtonOptions?: TPayButtonOption[];
  onPayMethodChange?: (payMethod?: string) => void;
  payMethod?: string;
}

export default function PaymentMethodsSection({
  easyPayButtonOptions,
  payButtonOptions,
  onPayMethodChange,
  payMethod,
}: Props) {
  const payButtonGroups = [
    easyPayButtonOptions ? [...easyPayButtonOptions] : undefined,
    payButtonOptions ? [...payButtonOptions] : undefined,
  ].filter((v) => v !== undefined);

  return (
    <section className="flex flex-col gap-[20px]">
      <h2>결제 수단</h2>

      <div className="flex gap-[16px] flex-col">
        {payButtonGroups.map((payButtonOptions, index) => (
          <Fragment key={payButtonOptions.map(({ label }) => label).join()}>
            <div className="flex gap-[10px]">
              {payButtonOptions.map(
                ({ label, payMethod: optionMethod, icon }) => (
                  <Button
                    key={label}
                    type="button"
                    className={cn(
                      'w-[174px]',
                      optionMethod === payMethod &&
                        'border-pink-500 text-pink-500 hover:border-pink-500'
                    )}
                    variant="outline"
                    size="2xl"
                    onClick={() => onPayMethodChange?.(optionMethod)}
                  >
                    {icon && (
                      <div className={`relative size-[20px] mr-[6px]`}>
                        {icon}
                      </div>
                    )}
                    {label}
                  </Button>
                )
              )}
            </div>
            {index < payButtonGroups.length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
