import { IPagination } from './common';

export interface ILoungeAuthor {
  studioId: string;
  profileImageUrl: string;
  nickname: string;
  userId: string;
}

export interface ILoungeAuthorWithPage extends IPagination {
  list: ILoungeAuthor[];
}

export interface ILoungeFeed {
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

export interface ILoungeFeedListWithPage extends IPagination {
  list: ILoungeFeed[];
}

export interface IBasicLoungeFeedParams {
  page?: number;
  limit?: number;
}
