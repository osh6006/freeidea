import { IAPIResponse, IPagination, IProduct } from '@/types/common';

// 배너
export interface IBanner {
  bannerId?: string;
  title: string;
  nickname: string;
  bannerImageUrl: string;
  bannerLinkUrl: string;
  profileImageUrl?: string;
}

export interface IBannerData {
  topBanner: IBanner;
  bottomBanners: Omit<IBanner, 'profileImageUrl'>[];
}

// 베스트 작가
export interface IBestAuthor {
  studioId: string;
  representImageUrl: string;
  profileImageUrl: string;
  nickname: string;
}

// 카테고리 별 추천 픽
export interface ICategoryRecommend {
  category: string;
  products: IProduct[];
}

// 작가 큐레이션
export interface IAuthorCurationProduct
  extends Omit<
    IProduct,
    'nickname' | 'tags' | 'profileImageUrl' | 'studioId'
  > {}

export interface IAuthorCuration {
  curationId: string;
  studioId: string;
  curationImageUrl: string;
  title: string;
  description: string;
  products: IAuthorCurationProduct[];
}

// 작품 추천
export interface IRecommendWork extends IPagination {
  list: IProduct[];
}

// 의뢰 후기
export interface INewAuthor {
  studioId: string;
  profileImageUrl: string;
  nickname: string;
}

export interface INewAuthorData extends IPagination {
  list: INewAuthor[];
}

// 이벤트
export interface IEvent {
  eventId: string;
  thumbnailImageUrl: string;
  title: string;
  description: string;
}

export interface IEventDetail extends IEvent {
  contents: string;
  nickname: string;
  createdAt: Date;
}

export interface IEventWithPage extends IPagination {
  list: IEvent[];
}

export interface IBasicEventParams {
  page?: number;
  limit?: number;
}

// API 응답 타입
export type TBannerResponse = IAPIResponse<IBannerData>;
export type TBestAuthorResponse = IAPIResponse<IBestAuthor[]>;
export type TCategoryRecommendResponse = IAPIResponse<ICategoryRecommend[]>;
export type TAuthorCurationResponse = IAPIResponse<IAuthorCuration[]>;
export type TRecommendWork = IAPIResponse<IRecommendWork>;
export type TNewAuthorResponse = IAPIResponse<INewAuthorData>;
