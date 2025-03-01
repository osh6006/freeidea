import { Dictionary } from 'ji-dictionary';

export const useRangeDict = new Dictionary({
  profit: {
    ko: '상업용',
    en: 'PROFIT',
  },
  nonProfit: {
    ko: '비상업용',
    en: 'NON_PROFIT',
  },
} as const);

export const sortDict = new Dictionary({
  latest: {
    ko: '최신순',
    en: 'LATEST',
  },
  reviewStars: {
    ko: '별점순',
    en: 'REVIEW_STARS',
  },
  lowestPrice: {
    ko: '가격낮은 순',
    en: 'LOWEST_PRICE',
  },
  highestPrice: {
    ko: '가격높은 순',
    en: 'HIGHEST_PRICE',
  },
  followers: {
    ko: '인기순',
    en: 'FOLLOWERS',
  },
  scraps: {
    ko: '스크랩 순',
    en: 'SCRAP',
  },
  likes: {
    ko: '좋아요 순',
    en: 'LIKE',
  },
  ranking: {
    ko: '랭킹순',
    en: 'RANKING',
  },
} as const);

export const categoryDict = new Dictionary({
  illustration: {
    ko: '일러스트',
    en: 'ILLUSTRATION',
  },
  virtual: {
    ko: '버츄얼',
    en: 'VIRTUAL',
  },
  // webtoon: {
  //   ko: '웹툰',
  //   en: 'WEBTOON',
  // },
  writing: {
    ko: '글',
    en: 'WRITING',
  },
  design: {
    ko: '디자인',
    en: 'DESIGN',
  },
  etc: {
    ko: '기타',
    en: 'ETC',
  },
} as const);

export const paymentMethodDict = new Dictionary({
  virtualAccount: {
    backend: 'PaymentMethodVirtualAccount',
    ko: '가상 계좌',
    en: 'virtualAccount',
  },
  easyPay: {
    backend: 'PaymentMethodEasyPay',
    ko: '간편 결제',
    en: 'easyPay',
  },
  mobile: {
    backend: 'PaymentMethodMobile',
    ko: '모바일',
    en: 'mobile',
  },
  card: {
    backend: 'PaymentMethodCard',
    ko: '카드',
    en: 'card',
  },
  kakaoPay: {
    backend: 'PaymentMethodKakaoPay',
    ko: '카카오페이',
    en: 'kakaoPay',
  },
} as const);

export const scrapTabDict = new Dictionary({
  product: {
    ko: '판매작품',
    en: 'PRODUCT',
  },
  portfolio: {
    ko: '포트폴리오',
    en: 'PORTFOLIO',
  },
  feed: {
    ko: '피드',
    en: 'FEED',
  },
});

export const studioTabDict = new Dictionary({
  home: {
    ko: '홈',
    en: 'home',
  },
  store: {
    ko: '커미션',
    en: 'store',
  },
  feed: {
    ko: '피드',
    en: 'feed',
  },
  portfolio: {
    ko: '포트폴리오',
    en: 'portfolio',
  },
  board: {
    ko: '게시판',
    en: 'board',
  },
});

export const snsLinkDict = new Dictionary({
  youtube: {
    ko: '유튜브',
    en: 'YOUTUBE',
  },
  instagram: {
    ko: '인스타그램',
    en: 'INSTAGRAM',
  },
  tiktok: {
    ko: '틱톡',
    en: 'TIKTOK',
  },
  twitter: {
    ko: '트위터',
    en: 'TWITTER',
  },
  facebook: {
    ko: '페이스북',
    en: 'FACEBOOK',
  },
  blog: {
    ko: '블로그',
    en: 'BLOG',
  },
  etc: {
    ko: '기타',
    en: 'ETC',
  },
  none: {
    ko: '없음',
    en: 'NONE',
  },
});

export const requestDateRangeDict = new Dictionary({
  WITHIN_7_DAYS: {
    en: 'WITHIN_SEVEN_DAYS',
    ko: '7일 이내',
  },
  WITHIN_2_WEEKS: {
    en: 'WITHIN_TWO_WEEKS',
    ko: '2주 이내',
  },
  WITHIN_3_WEEKS: {
    en: 'WITHIN_THREE_WEEKS',
    ko: '3주 이내',
  },
  WITHIN_1_MONTH: {
    en: 'WITHIN_ONE_MONTH',
    ko: '1개월 이내',
  },
  MORE_THAN_1_MONTH: {
    en: 'MORE_THEN_ONE_MONTH',
    ko: '1개월 이상',
  },
});

export const requestPriceRangeDict = new Dictionary({
  FiveThousandToTenThousand: {
    en: 'FIVE_THOUSAND_TO_TEN_THOUSAND',
    ko: '5천원 ~ 1만원',
  },
  TenThousandToThirtyThousand: {
    en: 'TEN_THOUSAND_TO_THIRTY_THOUSAND',
    ko: '1만원 ~ 3만원',
  },
  ThirtyThousandToFiftyThousand: {
    en: 'THIRTY_THOUSAND_TO_FIFTY_THOUSAND',
    ko: '3만원 ~ 5만원',
  },
  FiftyThousandToHundredThousand: {
    en: 'FIFTY_THOUSAND_TO_HUNDRED_THOUSAND',
    ko: '5만원 ~ 10만원',
  },
  MoreThanHundredThousand: {
    en: 'MORE_THAN_HUNDRED_THOUSAND',
    ko: '10만원 이상',
  },
});

export const authorApplyStatusDict = new Dictionary({
  create: {
    en: 'CREATED',
    ko: '대기',
    color: 'text-orange-500',
  },
  approved: {
    en: 'APPROVED',
    ko: '승인',
    color: 'text-green-500',
  },
  rejected: {
    en: 'REJECTED',
    ko: '거절',
    color: 'text-red-500',
  },
});

export const userStatusDict = new Dictionary({
  left: {
    en: 'LEFT',
    ko: '탈퇴',
    color: 'text-red-500',
  },
  joined: {
    en: 'JOINED',
    ko: '활성화',
    color: 'text-green-500',
  },
  suspended: {
    en: 'SUSPENDED',
    ko: '비 활성화',
    color: 'text-orange-500',
  },
});

export const userLevelDict = new Dictionary({
  guest: {
    en: 'GUEST',
    ko: '손님',
  },
  user: {
    en: 'USER',
    ko: '일반',
  },
  author: {
    en: 'AUTHOR',
    ko: '작가',
  },
  admin: {
    en: 'ADMIN',
    ko: '관리자',
  },
  master: {
    en: 'MASTER',
    ko: '마스터',
  },
});

export const MembershipDict = new Dictionary({
  free: {
    en: 'FREE',
    textColor: 'text-slate-500',
    bgColor: 'text-slate-50',
  },
  lite: {
    en: 'LITE',
    textColor: 'text-neonGreen-500',
    bgColor: 'bg-neonGreen-tint-5',
  },
  plus: {
    en: 'PLUS',
    textColor: 'text-neonPurple-600',
    bgColor: 'bg-neonPurple-tint-5',
  },
  vip: {
    en: 'VIP',
    textColor: 'text-mustard-600',
    bgColor: 'bg-mustard-tint-5',
  },
});
