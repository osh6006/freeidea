import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import { IAPIResponse } from '@/types/common';
import {
  Challenge,
  PortfolioCommentListType,
  PortfolioCommentRequestParams,
  PortfolioDetailType,
  PortfolioEditDataType,
  PortfolioListType,
  PortfolioWriteRequestType,
} from '@/types/portfolio';

export async function createPortfolio(body: PortfolioWriteRequestType) {
  const response = await api.post('/user/portfolio', {
    body: JSON.stringify(body),
  });

  const { code, message, data }: IAPIResponse<{ portfolioId: string }> =
    await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok)
    throw new Error(ERROR_MESSAGE.unexpected('포트폴리오 작성 오류'));

  return data;
}

export async function updatePortfolio(
  id: string,
  body: PortfolioWriteRequestType
) {
  const response = await api.put(`/user/portfolio/${id}`, {
    body: JSON.stringify(body),
  });
  const { code }: IAPIResponse = await response.json();

  return code === API_CODE.success;
}

export async function getPortfolio(id: string) {
  const response = await api.get(`/user/portfolio/${id}`);

  const { code, message, data }: IAPIResponse<PortfolioDetailType> =
    await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok)
    throw new Error(ERROR_MESSAGE.unexpected('챌린지 목록 조회 오류'));

  return data;
}

export async function getPortfolioList(
  studioId: string,
  params: { page?: number; limit?: number }
) {
  const queryString = objectToQueryString(params);
  const response = await api.get(
    `/user/portfolio/list/${studioId}?${queryString}`
  );
  const { code, message, data }: IAPIResponse<PortfolioListType> =
    await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok)
    throw new Error(
      ERROR_MESSAGE.unexpected('포트폴리오 리스트 목록 조회 오류')
    );

  return data;
}

export async function getPortfolioEditData(id: string) {
  const { data } = await api.get<PortfolioEditDataType>(
    `/user/portfolio/article/${id}`
  );
  return data;
}

export async function deletePortfolio(id: string) {
  const response = await api.delete(`/user/portfolio/${id}`);
  const { code, message }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok)
    throw new Error(ERROR_MESSAGE.unexpected('포트폴리오 삭제 오류'));
}

export async function getChallengeList() {
  const response = await api.get('/user/portfolio/challenge');
  const { code, message, data }: IAPIResponse<Challenge[]> =
    await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok)
    throw new Error(ERROR_MESSAGE.unexpected('챌린지 목록 조회 오류'));

  return data;
}

export async function getCommentList({
  id,
  page = 1,
  limit = 10,
}: PortfolioCommentRequestParams) {
  const queryString = objectToQueryString({ page, limit });
  const response = await api.get(
    `/user/portfolio/comments/${id}?${queryString}`
  );

  const { code, message, data }: IAPIResponse<PortfolioCommentListType> =
    await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok) throw new Error(ERROR_MESSAGE.unexpected('댓글 조회 오류'));

  return data;
}

export async function createComment(id: string, body: { comment: string }) {
  const response = await api.post(`/user/portfolio/comments/${id}`, {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok) throw new Error(ERROR_MESSAGE.unexpected('댓글 작성 오류'));
}
export async function deleteComment(id: string) {
  const response = await api.delete(`/user/portfolio/comments/${id}`);
  const { code, message }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return id;
}

export async function likePortfolio(id: string, body: { isLiked: boolean }) {
  const response = await api.post(`/user/portfolio/like/${id}`, {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok) throw new Error(ERROR_MESSAGE.unexpected('좋아요 오류'));
}

export async function scrapPortfolio(
  id: string,
  body: { isScrapping: boolean }
) {
  const response = await api.post(`/user/portfolio/scrap/${id}`, {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok) throw new Error(ERROR_MESSAGE.unexpected('스크랩 오류'));

  return { portfolioId: id, isScrapping: body.isScrapping };
}

export async function pangPortfolio(
  id: string,
  body: { isMembershipLiked: boolean }
) {
  const response = await api.post(`/user/portfolio/like/membership/${id}`, {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return { portfolioId: id };
}
