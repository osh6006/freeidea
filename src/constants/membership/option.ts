export const MEMBERSHIP_OPTION = {
  FREE: {
    title: 'Free',
    variants: 'free',
    upperCase: 'FREE',
    price: 0,
    benefits: ['판매 슬롯 4개'],
  },
  LITE: {
    title: 'Lite',
    variants: 'lite',
    price: 990,
    benefits: ['판매 슬롯 6개', '팡 좋아요'],
  },
  PLUS: {
    title: 'Plus',
    variants: 'plus',
    price: 2900,
    benefits: ['판매 슬롯 10개', '팡 좋아요'],
  },
  VIP: {
    title: 'VIP',
    variants: 'vip',
    price: 4900,
    benefits: ['판매 슬롯 무제한', '프리미엄 이모티콘 사용 가능'],
  },
} as const;
