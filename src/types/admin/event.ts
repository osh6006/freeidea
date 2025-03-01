import { adminEventFilterSchema } from '@/lib/zod/admin/event-filter-schema';
import { eventWriteSchema } from '@/lib/zod/admin/event-write-schema';
import { z } from 'zod';

import { IPagination } from '../common';

type Modify<T, R> = Omit<T, keyof R> & R;
export type EventWriteSchemaType = z.infer<typeof eventWriteSchema>;
export type EventWriteBodyType = Modify<
  Omit<EventWriteSchemaType, 'thumbnailImageUrl'>,
  { publishedAt: string }
>;

export type AdminEventFilterSchemaType = z.infer<typeof adminEventFilterSchema>;

export type AdminEventKeywordType = 'TITLE' | 'CONTENTS' | 'TITLE_AND_CONTENTS';

export interface IAdminEventParams {
  page?: number;
  limit?: number;
  keywordType?: AdminEventKeywordType;
  keyword?: string;
  createStartDate?: string;
  createEndDate?: string;
  publishStartDate?: string;
  publishEndDate?: string;
  isUsed?: boolean;
}

export interface IAdminEvent {
  eventId: string;
  title: string;
  createdAt: Date;
  publishedAt: Date;
  isUsed: boolean;
  viewCount: number;
}

export interface IAdminEventWithPage extends IPagination {
  usedCount: number;
  unusedCount: number;
  list: IAdminEvent[];
}

export interface IAdminEventDetail {
  eventId: string;
  publishedAt: Date;
  thumbnailImage: {
    fileId: string;
    fileUrl: string;
  };
  title: string;
  description: string;
  contents: string;
}
