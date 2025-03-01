export type StoreType = {
  productId: string;
  productImageUrl: string;
  profileImageUrl: string;
  studioId: string;
  nickname: string;
  title: string;
  tags: string[];
  price: number;
  isScrapping: boolean;
};

export type StoreListType = {
  page: number;
  count: number;
  list: StoreType[];
};

export type TCompletePaymentResult = {
  orderId: string;
  options: {
    optionName: string;
    optionPrice: number;
    optionQuantity: number;
  }[];
  additionalFee: number;
  paymentMethod: string;
  easyPayProvider: string;
  orderedAt: string;
  paidAmount: number;
  remitterName: string;
  bank: string;
  accountNumber: string;
  remitteeName: string;
  expiredAt: string;
  product: {
    productId: string;
    thumbnailImageUrl: string;
    title: string;
    nickname: string;
    profileImageUrl: string;
  };
};

export type TStoreReviewList = {
  page: number;
  count: number;
  list: {
    productCommentId: string;
    comment: string;
    profileImageUrl: string;
    nickname: string;
    createdAt: string;
    userId: string;
    studioId: string;
  }[];
};

export type RegisterStatus =
  | 'CREATED'
  | 'CLOSED'
  | 'REPORTED'
  | 'MEMBERSHIP_EXPIRED';
