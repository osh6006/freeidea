import { portfolioNewSchema } from '@/lib/zod/portfolio/portfolio-new-schema';
import { z } from 'zod';

import { IPagination } from './common';

export type PortfolioNewSchemaType = z.infer<typeof portfolioNewSchema>;

export type PortfolioWriteRequestType = {
  tags: string[];
  applyChallenge: boolean;
  challengeId?: string;
  isShown: boolean;
  isCommentUsed: boolean;
  portfolioImageIds: string[];
  title: string;
  contents?: string;
};

export type Challenge = {
  challengeId: string;
  title: string;
  type: 'CONTEST';
  challengeNumber: number;
};

export interface Portfolio {
  portfolioId: string;
  portfolioImageUrl: string;
  isScrapping: boolean;
  isShown: boolean;
}

export interface PortfolioListType extends IPagination {
  list: Portfolio[];
}

export type PortfolioDetailType = {
  portfolioId: string;
  portfolioImages: {
    fileId: string;
    fileUrl: string;
  }[];
  title: string;
  contents: string;
  tags: string[];
  membershipLikes: number;
  likes: number;
  comments: number;
  scraps: number;
  challengeNumber: number | null;
  viewCount: number;
  createdAt: string;
  isShown: boolean;
  isMembershipLiked: boolean;
  isLiked: boolean;
  isScrapping: boolean;
  author: {
    userId: string;
    studioId: string;
    profileImageUrl: string;
    nickname: string;
    introduction: string;
    isFollowing: boolean;
    followers: number;
    portfolio: {
      count: number;
      list: {
        portfolioId: string;
        portfolioImageUrl: string;
        isScrapping: boolean;
      }[];
    };
  };
};

export type PortfolioEditDataType = {
  portfolioId: string;
  tags: string[];
  applyChallenge: boolean;
  challengeId: string | null;
  challengeTitle: string | null;
  challengeType: 'CONTEST' | null;
  challengeNumber: number | null;
  isShown: boolean;
  isCommentUsed: boolean;
  portfolioImages: {
    fileId: string;
    fileUrl: string;
  }[];
  title: string;
  contents?: string;
};

export interface PortfolioCommentListType extends IPagination {
  isCommentUsed: boolean;
  list: {
    portfolioCommentId: string;
    comment: string;
    profileImageUrl: string;
    nickname: string;
    createdAt: string;
    userId: string;
    studioId: string;
  }[];
}

export type PortfolioCommentRequestParams = {
  id: string;
  page?: number;
  limit?: number;
};
