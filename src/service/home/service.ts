import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import { IAPIResponse } from '@/types/common';
import {
  IAuthorCuration,
  IBannerData,
  IBasicEventParams,
  IBestAuthor,
  ICategoryRecommend,
  IEvent,
  IEventDetail,
  IEventWithPage,
  INewAuthorData,
  IRecommendWork,
  TAuthorCurationResponse,
  TBannerResponse,
  TBestAuthorResponse,
  TCategoryRecommendResponse,
  TNewAuthorResponse,
  TRecommendWork,
} from '@/types/home';
import { IAuthorProfile, TIAuthorProfileResponse } from '@/types/studio';

export const getBanners = async (): Promise<IBannerData> => {
  const response = await api.get('/user/home/banners', {
    cache: 'no-store',
  });
  const resData: TBannerResponse = await response.json();
  return resData.data;
};

export const getTopBanner = async (): Promise<IBannerData['topBanner']> => {
  const response = await api.get('/user/home/banners', {
    cache: 'no-store',
  });
  const resData: TBannerResponse = await response.json();
  return resData?.data?.topBanner;
};

export const getGridBanners = async (): Promise<
  IBannerData['bottomBanners']
> => {
  const response = await api.get('/user/home/banners', {
    cache: 'no-store',
  });
  const resData: TBannerResponse = await response.json();
  return resData?.data?.bottomBanners;
};

export const getBestAuthors = async (): Promise<IBestAuthor[]> => {
  const response = await api.get('/user/home/bestAuthors', {
    cache: 'no-store',
  });
  const resData: TBestAuthorResponse = await response.json();
  return resData.data;
};

export const getRecommendPicks = async (): Promise<ICategoryRecommend[]> => {
  const response = await api.get(`/user/home/categoryPick`, {
    cache: 'no-store',
  });
  const resData: TCategoryRecommendResponse = await response.json();

  return resData.data;
};

export const getAuthorCurations = async (): Promise<IAuthorCuration[]> => {
  const response = await api.get('/user/home/authorCuration', {
    cache: 'no-store',
  });
  const resData: TAuthorCurationResponse = await response.json();
  return resData.data;
};

export const getRecommendWorks = async (): Promise<IRecommendWork> => {
  const response = await api.get(
    '/user/home/productRecommend?page=1&limit=12',
    {
      cache: 'no-store',
    }
  );
  const resData: TRecommendWork = await response.json();
  return resData.data;
};

export const getNewAuthors = async (): Promise<INewAuthorData> => {
  const response = await api.get('/user/home/newAuthor', {
    cache: 'no-store',
  });
  const resData: TNewAuthorResponse = await response.json();
  return resData.data;
};

export const getAuthorProfile = async (
  studioId: string
): Promise<IAuthorProfile> => {
  const response = await api.get(`/user/studio/profile/popup/${studioId}`, {
    cache: 'no-store',
  });
  const resData: TIAuthorProfileResponse = await response.json();

  return resData.data;
};

export const getEventList = async (params: IBasicEventParams) => {
  const res = await api.get(`/user/home/event?${objectToQueryString(params)}`);

  const { data, code, message }: IAPIResponse<IEventWithPage> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ code, message });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('이벤트 리스트 오류'));
  }

  return data;
};

export const getEventDetail = async (eventId: string) => {
  const res = await api.get(`/user/home/event/${eventId}`);

  const { data, code, message }: IAPIResponse<IEventDetail> = await res.json();

  if (code !== API_CODE.success) throw new APIError({ code, message });

  return data;
};
