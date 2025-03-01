import { z } from 'zod';

import { IAuthor } from './author';
import { IAPIResponse, IPagination, IProduct } from './common';
import { IQna } from './qna';
import { IRequest } from './request';

export const recentlySearchSchema = z.object({
  keyword: z.string(),
  type: z.string().optional(),
});

export type RecentlySearchType = z.infer<typeof recentlySearchSchema>;

export interface ISearchParameter {
  keyword?: string;
  page?: number;
  sort?: string;
  useRange?: string;
  limit?: number;
  category?: string;
}

export type ISearchProductData = IPagination & {
  list: IProduct[];
  relatedKeywords: string[];
};
export type ISearchRequestData = IPagination & {
  list: IRequest[];
  relatedKeywords: string[];
};
export interface ISearchAuthorData extends IPagination {
  list: IAuthor[];
  relatedKeywords: string[];
}

export interface ISearchQnaWithPage extends IPagination {
  list: IQna[];
}

export interface ISearchAutoComplete {
  id: string;
  title: string;
  type: 'product' | 'author' | 'request' | 'qna';
}

export type TInfiniteSearchResult<T> = {
  data: T[];
  relatedKeywords: string[];
  page: number;
  hasMore: boolean;
};

export type TSearchProductResponse = IAPIResponse<ISearchProductData>;
export type TSearchRequestResponse = IAPIResponse<ISearchRequestData>;
export type TSearchAuthorResponse = IAPIResponse<ISearchAuthorData>;
export type TSearchQnaResponse = IAPIResponse<ISearchQnaWithPage>;
