import { adminMemberFilterSchema } from '@/lib/zod/admin/member-filter-schema';
import { z } from 'zod';

import { Level } from '../auth';
import { IPagination } from '../common';
import { MembershipType, PaymentMethodType } from '../membership';

export type AdminMemberFilterSchemaType = z.infer<
  typeof adminMemberFilterSchema
>;

export type AdminMemberKeywordType =
  | 'ALL'
  | 'EMAIL'
  | 'USER_NAME'
  | 'NICKNAME'
  | 'PHONE_NUMBER';

export type AdminMemberLevelType =
  | 'ALL'
  | 'USER'
  | 'AUTHOR'
  | 'ADMIN'
  | 'MASTER';
export type AdminMemberStatusType = 'ALL' | 'JOINED' | 'LEFT' | 'SUSPENDED';

export interface IAdminMemberParams {
  page?: number;
  limit?: number;
  keyword?: string;
  keywordType?: AdminMemberKeywordType;
  createStartDate?: string;
  createEndDate?: string;
  userLevel?: AdminMemberLevelType;
  userStatus?: AdminMemberStatusType;
}

export interface IAdminMemberList {
  userId: string;
  email: string;
  userName: string;
  nickname: string;
  phoneNumber: string;
  createdAt: Date;
  recentLoginAt: Date;
  userLevel: AdminMemberLevelType;
  userStatus: AdminMemberStatusType;
}

export interface IAdminMemberListWithPage extends IPagination {
  userCount: number;
  authorCount: number;
  list: IAdminMemberList[];
}

export interface IAdminMemberDetail {
  userId: string;
  profileImageUrl: string;
  email: string;
  userName: string;
  nickname: string;
  phoneNumber: string;
  createdAt: Date;
  recentLoginAt: Date;
  articleCount: number;
  snsLinkUrl: string;
  membershipType: MembershipType;
  orderedAt: Date;
  reportCount: 5;
  userStatus: Exclude<AdminMemberStatusType, 'ALL'>;
  userLevel: Exclude<Level, 'GUEST'>;
}

export interface IAdminMembershipParams {
  page?: number;
  limit?: number;
}

export interface IAdminMembership {
  membershipOrderId: string;
  paymentMethod: PaymentMethodType;
  orderedAt: Date;
  paidAmount: number;
  membershipType: Exclude<AdminMemberStatusType, 'ALL'>;
}

export interface IAdminMembershipListWithPage extends IPagination {
  list: IAdminMembership[];
}
