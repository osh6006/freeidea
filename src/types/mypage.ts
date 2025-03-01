import { AuthorApplyFormSchema } from '@/lib/zod/my-page/author-apply-schema';
import { z } from 'zod';

import { Level } from './auth';
import { IPagination } from './common';
import { MembershipType } from './membership';
import { RegisterStatus } from './store';

export type MyMembershipPaymentRequest = {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
};

export type IMyPageProfile = {
  userId: string;
  profileImageUrl: string | null;
  authType: 'EMAIL' | 'KAKAO' | 'GOOGLE' | 'TWITTER';
  membershipType: MembershipType;
  nickname: string;
  introduction?: string;
  email: string;
};

export type MyProduct = {
  productId: string;
  productNumber: string;
  productImageUrl: string;
  title: string;
  price: number;
  orderCompleted: number;
  registerStatus: RegisterStatus;
  isPending: boolean;
};

export type MyScrapProduct = {
  productId: string;
  productImageUrl: string;
  profileImageUrl: string;
  nickname: string;
  title: string;
  tags: string[];
  price: number;
  isScrapping: boolean;
  registerStatus: RegisterStatus;
};

export type ScrapProductListType = {
  page: number;
  count: number;
  list: MyScrapProduct[];
};

export type Portfolio = {
  portfolioId: string;
  portfolioImageUrl: string;
  isScrapping: boolean;
};

export type ScrapPortfolioListType = {
  page: number;
  count: number;
  list: Portfolio[];
};

export type Feed = {
  feedId: string;
  feedImageUrl: string;
  isScrapping: boolean;
};

export type ScrapFeedListType = {
  page: number;
  count: number;
  list: Feed[];
};

export type MyPageAuthorApplyType = z.infer<typeof AuthorApplyFormSchema>;

export interface IMyPageRequestListParams {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface IMyPageRequesterListParams {
  page?: number;
  limit?: number;
}

export interface IMyPageRequester {
  inquiryId: string;
  title: string;
  applies: [
    {
      inquiryApplyId: string;
      userId: string;
      profileImageUrl: string;
      nickname: string;
      createdAt: Date;
    },
  ];
}

export interface IMypageRequesterWithPage extends IPagination {
  list: IMyPageRequester[];
}

export type IFollow = {
  userId: string;
  studioId: string;
  profileImageUrl: string;
  nickname: string;
  userLevel: Level;
  isFollowing: boolean;
  portfolios: {
    portfolioId: string;
    portfolioImageUrl: string;
  }[];
};

export type IMyFollowerListType = {
  page: number;
  count: number;
  list: IFollow[];
};

export type IMyFollowingListType = {
  page: number;
  count: number;
  list: IFollow[];
};
