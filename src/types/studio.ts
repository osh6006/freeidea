import { guestBookSchema } from '@/lib/zod/studio/guest-book-schema';
import { notiSchema } from '@/lib/zod/studio/noti-schema';
import { IAPIResponse, IPagination, IProduct, TCategory } from '@/types/common';
import { z } from 'zod';

import { Level } from './auth';

export type NotiSchemaType = z.infer<typeof notiSchema>;
export type GuestBookSchemaType = z.infer<typeof guestBookSchema>;
export interface IAuthorProfile {
  studioId: string;
  titleImageUrl: string;
  profileImageUrl: string;
  nickname: string;
  introduction: string;
  isFollowing: boolean;
  portfolio: { portfolioId: string; portfolioImageUrl: string }[];
}

export interface IStudioProfile {
  studioId: string;
  userId: string;
  titleImageUrl: string;
  profileImageUrl: string;
  nickname: string;
  introduction: string;
  createdAt: string;
  followers: number;
  followings: number;
  portfolios: number;
  channelUrl: string;
  userLevel: Level;
  isFollowing: boolean;
}

interface IPortfolio {
  portfolioId: string;
  portfolioImageUrl: string;
}

export interface IStudioProfilePopup {
  studioId: string;
  titleImageUrl: string;
  profileImageUrl: string;
  nickname: string;
  introduction: string;
  isFollowing: boolean;
  portfolio: IPortfolio[];
}

interface IStudioPopupListItem {
  studioId: string;
  profileImageUrl: string;
  nickname: string;
}

export interface IStudioFollowInfoListResponse extends IPagination {
  list: IStudioPopupListItem[];
}

export interface IStudioFollowInfoListParameter {
  studioId: string;
  type: 'follower' | 'following';
  limit?: number;
  page?: number;
}

export interface IStudioNotice {
  studioNoticeId: string;
  contents: string;
  isFixed: boolean;
  createdAt: Date;
}

export interface IStudioNoticeList extends IPagination {
  list: IStudioNotice[];
}

export interface IStudioWorkResponse extends IPagination {
  list: IProduct[];
}

export interface IStudioBasicParameter {
  limit?: number;
  page?: number;
}
export interface IStudioWorkListParameter extends IStudioBasicParameter {
  sort?: string;
  category?: string;
  useRange?: string;
}

// GuestBook

export interface IGuestBook {
  studioVisitorId: string;
  userId: string;
  profileImageUrl: string;
  nickname: string;
  contents: string;
  createdAt: Date;
}

export interface IGuestBookData extends IPagination {
  list: IGuestBook[];
}

// AuthorBoard
export interface IAuthorBoard {
  studioId: string;
  slots: number;
  productCount: number;
  products: IProduct[];
}

// qna

export interface IStudioQna {
  qnaAnswerId: string;
  category: TCategory;
  nickname: string;
  contents: string;
  isShown: boolean;
  createdAt: Date;
  question: {
    qnaId: string;
    title: string;
    contents: string;
  };
}

export interface IStudioQnaWithPage extends IPagination {
  list: IStudioQna[];
}

export type TIAuthorProfileResponse = IAPIResponse<IAuthorProfile>;
export type TStudioProfileResponse = IAPIResponse<IStudioProfile>;
export type TStudioProfilePopupResponse = IAPIResponse<IStudioProfilePopup>;

export type TStudioFollowInfoListResponse =
  IAPIResponse<IStudioFollowInfoListResponse>;

export type TStudioWorkListResponse = IAPIResponse<IStudioWorkResponse>;

export type TStudioNoticeResponse = IAPIResponse<IStudioNotice>;
export type TStudioNotiListResponse = IAPIResponse<IStudioNoticeList>;

export type TStudioGuestBookListResponse = IAPIResponse<IGuestBookData>;

export type TAuthorBoardResponse = IAPIResponse<IAuthorBoard>;
