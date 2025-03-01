import API_CODE from '@/constants/error-code';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import {
  ChallengeInfo,
  ChallengePortfolio,
  ChallengePortfolioList,
} from '@/types/challenge';
import { IAPIResponse } from '@/types/common';
import {
  IBasicLoungeFeedParams,
  ILoungeAuthorWithPage,
  ILoungeFeedListWithPage,
} from '@/types/lounge';

export async function getChallenge(id: string) {
  const res = await api.get(`/user/lounge/challenge/${id}`);
  const { data, code, message }: IAPIResponse<ChallengeInfo> = await res.json();
  if (code !== API_CODE.success) throw new APIError({ code, message });
  return data;
}

export async function getChallengeList() {
  const res = await api.get('/user/lounge/challenge');
  const { data, code, message }: IAPIResponse<ChallengeInfo[]> =
    await res.json();
  if (code !== API_CODE.success) throw new APIError({ code, message });
  return data;
}

export async function getChallengePortfolioList(
  id: string,
  { page, limit, sort }: { page?: number; limit?: number; sort?: string }
) {
  const queryString = objectToQueryString({ page, limit, sort });
  const res = await api.get(
    `/user/lounge/challenge/portfolio/${id}?${queryString}`
  );
  const { data, code, message }: IAPIResponse<ChallengePortfolioList> =
    await res.json();
  if (code !== API_CODE.success) throw new APIError({ code, message });
  return data;
}

export async function getBestChallengeList(id: string) {
  const res = await api.get(`/user/lounge/challenge/portfolio/best/${id}`);
  const { data, code, message }: IAPIResponse<ChallengePortfolio[]> =
    await res.json();
  if (code !== API_CODE.success) throw new APIError({ code, message });
  return data;
}

export async function getLoungefollowingAuthorList(
  params: IBasicLoungeFeedParams
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/lounge/following?${queryString}`);
  const { data, code, message }: IAPIResponse<ILoungeAuthorWithPage> =
    await res.json();
  if (code !== API_CODE.success) throw new APIError({ code, message });
  return data;
}
export async function getloungeFeedList(params: IBasicLoungeFeedParams) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/lounge/feed?${queryString}`);

  const { data, code, message }: IAPIResponse<ILoungeFeedListWithPage> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ code, message });
  return data;
}

export async function getloungeFeedListByAuthor(
  studioId: string,
  params: IBasicLoungeFeedParams
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/lounge/feed/${studioId}?${queryString}`);
  const { data, code, message }: IAPIResponse<ILoungeFeedListWithPage> =
    await res.json();
  if (code !== API_CODE.success) throw new APIError({ code, message });
  return data;
}
