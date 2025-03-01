import { QueryFilters, Updater } from '@tanstack/react-query';

/** @deprecated IAPIResponse를 사용해주세요*/
export interface IApiResponse<T = unknown> {
  code: string;
  message: string;
  data: T extends undefined ? undefined : T;
}

export interface IAPIResponse<T = unknown> {
  code?: string;
  message?: string;
  data: T;
}

export interface IPagination {
  page: number;
  count: number;
}

export interface Pagination<T> {
  page: number;
  count: number;
  list: T;
}

export type TSort = 'LATEST' | 'LOWEST_PRICE' | 'HIGHEST_PRICE';
export type TCategory =
  | 'ILLUSTRATION'
  | 'VIRTUAL'
  | 'WEBTOON'
  | 'WRITING'
  | 'DESIGN';
export type TUseRange = 'NON_PROFIT' | 'PROFIT';

export interface IDecodedAccessToken {
  type: string;
  id: string;
  level: string;
  iat: number;
  exp: number;
}

// Object
export interface IProduct {
  productId: string;
  studioId: string;
  productImageUrl: string;
  profileImageUrl: string;
  nickname: string;
  title: string;
  tags: string[];
  price: number;
  isScrapping: boolean;
}

export interface AffectedQueryOption<T> {
  filter: QueryFilters;
  updater: Updater<T | undefined, T | undefined>;
}
