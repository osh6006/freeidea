import { requestSchema } from '@/lib/zod/request/create-schema';
import { z } from 'zod';

import { IAPIResponse, IPagination, TCategory, TUseRange } from './common';

export type RequestSchemaType = z.infer<typeof requestSchema>;
export type RequestToServerType = Omit<
  RequestSchemaType,
  'dueDate' | 'budget' | 'useRange'
> & {
  dueDate: string;
  budget: number;
  useRange: string[];
};

export interface IRequestListParam {
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  useRange?: string;
  inProgressOnly?: boolean;
}

export interface IRequest {
  inquiryId: string;
  nickname: string;
  category: string;
  budget: number;
  dueDate: Date;
  useRange: TUseRange[];
  title: string;
  viewCount: number;
  createdAt: Date;
  isDiscussionPossible: boolean;
  isFinished: boolean;
}

export interface IMyPageRequest extends IRequest {
  applications: number;
}

export interface IRequestData extends IPagination {
  list: IRequest[];
}

export interface IMypageRequestData extends IPagination {
  list: IMyPageRequest[];
}

export interface IMyPageRequestStateWithPage extends IPagination {
  list: {
    inquiryApplyId: string;
    title: string;
    createdAt: Date;
    dueDate: Date;
    isFinished: boolean;
    inquiryId: string;
  }[];
}

export interface IRequestDetail {
  inquiryId: string;
  studioId: string;
  category: TCategory;
  budget: number;
  isDiscussionPossible: boolean;
  isFinished: boolean;
  dueDate: Date;
  useRange: string[];
  usePurpose: string;
  title: string;
  contents: string;
  userId: string;
  nickname: string;
  profileImageUrl: string;
  viewCount: number;
  createdAt: Date;
}

export type TRequestResponse = IAPIResponse<IRequestData>;
export type TRequestDeatilResponse = IAPIResponse<IRequestDetail>;
