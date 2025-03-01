import { feedWriteSchema } from '@/lib/zod/feed/schema';
import { z } from 'zod';

import { IAPIResponse, IPagination, IProduct } from './common';

export type FeedWriteSchemaType = z.infer<typeof feedWriteSchema>;

export interface IFeedList {
  feedId: string;
  profileImageUrl: string;
  nickname: string;
  feedImageUrl: string;
  contents: string;
  createdAt: Date;
  membershipLikes: number;
  likes: number;
  comments: number;
  scraps: number;
  isMembershipLiked: boolean;
  isLiked: boolean;
  isScrapping: boolean;
  userId: string;
  studioId: string;
}

export interface IFeedProduct extends IProduct {
  productId: string;
  productImageUrl: string;
  title: string;
  price: number;
  nickname: string;
  registerStatus: string;
  positionX: number;
  positionY: number;
}

export interface IFeedImage {
  feedImageId: string;
  feedImageUrl: string;
  products: IFeedProduct[];
}

export interface IFeedProfile {
  userId: string;
  profileImageUrl: string;
  studioId: string;
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
}

export interface IFeedDeatil {
  feedId: string;
  feedImages: IFeedImage[];
  contents: string;
  membershipLikes: number;
  likes: number;
  comments: number;
  scraps: number;
  viewCount: number;
  createdAt: Date;
  isMembershipLiked: boolean;
  isLiked: boolean;
  isScrapping: boolean;
  author: IFeedProfile;
  taggedProducts: {
    count: number;
    list: {
      productId: string;
      productImageUrl: string;
      title: string;
      price: number;
    }[];
  };
  studioId: string;
}

export interface IFeedListWithPage extends IPagination {
  list: IFeedList[];
}

export interface IFeedBasicParameter {
  page?: number;
  limit?: number;
}

export interface IFeedComment {
  userId: string;
  feedCommentId: string;
  comment: string;
  profileImageUrl: string;
  nickname: string;
  createdAt: string;
  studioId: string;
}

export interface IFeedCommentListWithPage extends IPagination {
  list: IFeedComment[];
}

export interface IFeedModify {
  feedId: string;
  feedImages: IFeedImage[];
  contents: string;
}

export type FeedListResponseType = IAPIResponse<IFeedListWithPage>;
export type FeedDetailResponseType = IAPIResponse<IFeedDeatil>;
export type FeedCommentListResponseType =
  IAPIResponse<IFeedCommentListWithPage>;
export type FeedModifyResponseType = IAPIResponse<IFeedModify>;
