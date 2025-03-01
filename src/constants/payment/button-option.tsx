import { ReactNode } from 'react';

import Image from 'next/image';

export type TPayButtonOption = {
  payMethod: string;
  label: string;
  icon?: ReactNode;
};

export const EASY_PAY_BUTTON_OPTIONS: TPayButtonOption[] = [
  {
    payMethod: 'tossPay',
    icon: (
      <Image
        src="/pngs/toss-logo.png"
        fill
        sizes="20px"
        className="object-contain"
        alt="tosspay-logo"
      />
    ),
    label: '토스페이',
  },
  {
    payMethod: 'naverPay',
    icon: (
      <Image
        src="/pngs/naverpay-logo.png"
        fill
        sizes="40px"
        className="object-contain"
        alt="naverpay-logo"
      />
    ),
    label: '네이버페이',
  },
  {
    payMethod: 'kakaoPay',
    icon: (
      <Image
        src="/pngs/kakaopay-logo.png"
        fill
        sizes="40px"
        className="object-contain"
        alt="kakaopay-logo"
      />
    ),
    label: '카카오페이',
  },
  {
    payMethod: 'payco',
    icon: (
      <Image
        src="/pngs/payco-logo.png"
        fill
        sizes="40px"
        className="object-contain"
        alt="payco-logo"
      />
    ),
    label: '페이코',
  },
];

export const PAY_BUTTON_OPTIONS: TPayButtonOption[] = [
  {
    label: '카드',
    payMethod: 'card',
    icon: undefined,
  },
  {
    label: '무통장 입금',
    payMethod: 'virtualAccount',
    icon: undefined,
  },
  {
    payMethod: 'mobile',
    label: '휴대폰 결제',
    icon: undefined,
  },
];

export const PAY_OPTIONS = {
  tossPay: {
    channelKey: process.env.NEXT_PUBLIC_TOSSPAY_CHANNEL_KEY,
    payMethod: 'EASY_PAY',
    easyPay: {
      easyPayProvider: 'EASY_PAY_PROVIDER_TOSSPAY',
    },
  },
  naverPay: {
    payMethod: 'EASY_PAY',
    easyPay: {
      easyPayProvider: 'EASY_PAY_PROVIDER_NAVERPAY',
    },
  },
  kakaoPay: {
    payMethod: 'EASY_PAY',
    easyPay: {
      easyPayProvider: 'EASY_PAY_PROVIDER_KAKAOPAY',
    },
  },
  payco: {
    payMethod: 'EASY_PAY',
    easyPay: {
      easyPayProvider: 'EASY_PAY_PROVIDER_PAYCO',
    },
  },
  card: {
    payMethod: 'CARD',
  },
  virtualAccount: {
    payMethod: 'VIRTUAL_ACCOUNT',
    virtualAccount: {
      accountExpiry: {
        validHours: 1,
      },
    },
  },
  mobile: {
    payMethod: 'MOBILE',
    productType: 'PRODUCT_TYPE_DIGITAL',
  },
} as const;
