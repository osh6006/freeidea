import { qnaWriteSchema } from '@/lib/zod/qna/qna-write-schema';
import { z } from 'zod';

import { IPagination, TCategory } from './common';

export type QnaWriteSchemaType = z.infer<typeof qnaWriteSchema>;

export interface IQnaBasicParams {
  page?: number;
  limit?: number;
}

export interface IQna {
  qnaId: string;
  category: TCategory;
  title: string;
  contents: string;
  answers: number;
  answeredUsers: [
    {
      qnaAnswerId: string;
      userId: string;
      profileImageUrl: string;
      nickname: string;
    },
  ];
  viewCount: number;
  createdAt: Date;
}

export interface IQnaWithPage extends IPagination {
  list: IQna[];
}

export interface IQnaDetail {
  qnaId: string;
  category: TCategory;
  title: string;
  contents: string;
  tags: string[];
  viewCount: number;
  answers: number;
  answered: boolean;
  createdAt: Date;
  user: {
    userId: string;
    nickname: string;
    profileImageUrl: string;
    qnaCount: number;
    studioId: string;
  };
}

export interface IQnaAnswer {
  qnaAnswerId: string;
  userId: string;
  profileImageUrl: string;
  nickname: string;
  introduction: string;
  contents: string;
  membershipLikes: number;
  likes: number;
  comments: number;
  createdAt: Date;
  isMembershipLiked: boolean;
  isLiked: boolean;
  studioId: string;
  isFollowing: boolean;
  isShown: boolean;
}
export interface IQnaAnswerWithPage extends IPagination {
  list: IQnaAnswer[];
  isAnswered: boolean;
}
export interface IQnaActiveAuthor {
  userId: string;
  profileImageUrl: string;
  nickname: string;
  introduction: string;
  ranking: number;
  studioId: string;
}

export interface IRecentlyQna {
  qnaId: string;
  title: string;
  createdAt: Date;
  viewCount: number;
  answers: number;
}

export interface ICategoryAuthorQna {
  userId: string;
  profileImageUrl: string;
  nickname: string;
  introduction: string;
}

export interface IQnaAnswerComment {
  qnaAnswerCommentId: string;
  userId: string;
  nickname: string;
  comment: string;
  createdAt: Date;
}

export interface IQnaAnswerCommentWithPage extends IPagination {
  list: IQnaAnswerComment[];
}
