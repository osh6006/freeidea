import { authorApprovalSchema } from '@/lib/zod/admin/author-approval-schema';
import { z } from 'zod';

import { Level } from '../auth';
import { IPagination } from '../common';

export type AuthorApprovalSchemaType = z.infer<typeof authorApprovalSchema>;

export type AuthorApprovalkeywordType =
  | 'ALL'
  | 'EMAIL'
  | 'USER_NAME'
  | 'NICKNAME'
  | 'PHONE_NUMBER';

export type AuthorApprovalRequestStatusType =
  | ''
  | 'CREATED'
  | 'APPROVED'
  | 'REJECTED';

export interface IAuthorApprovalParams {
  page?: number;
  limit?: number;
  keywordType?: AuthorApprovalkeywordType;
  keyword?: string;
  applyStartDate?: string;
  applyEndDate?: string;
  examineStartDate?: string;
  examineEndDate?: string;
  requestStatus?: AuthorApprovalRequestStatusType;
}

export interface IAuthorApproval {
  authorApplyId: string;
  email: string;
  userName: string;
  nickname: string;
  phoneNumber: string;
  createdAt: Date;
  examinedAt: Date;
  requestStatus: string;
}

export interface IAuthorApprovalWithPage extends IPagination {
  list: IAuthorApproval[];
  newApplyCount: number;
}

export interface IAuthorApprovalDetail {
  authorApplyId: string;
  userId: string;
  email: string;
  userName: string;
  nickname: string;
  snsType: string;
  snsLinkUrl: string;
  productImages: [
    {
      fileId: string;
      fileUrl: string;
    },
  ];
  createdAt: Date;
  examinedAt: Date;
  requestStatus: string;
  userStatus: string;
  userLevel: Level;
}
