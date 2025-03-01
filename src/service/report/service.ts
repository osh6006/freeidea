import API_CODE from '@/constants/error-code';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { IAPIResponse } from '@/types/common';

export const REPORT_ENDPOINT = {
  store: '/user/store/product/report',
  author: '/user/author/report',
  storeReview: '/user/store/product/comments/report',
  portfolio: '/user/portfolio/report',
  portfolioReview: '/user/portfolio/comments/report',
  request: '/user/inquiry/report',
  studioNotice: '/user/studio/notice/report',
  studioGuestbook: '/user/studio/visitor/report',
  qna: '/user/qna/report',
  qnaAnswer: '/user/qna/answer/report',
  qnaAnswerComment: '/user/qna/answer/comments/report',
  feed: '/user/feed/report',
  feedComment: '/user/feed/comments/report',
  chatMessage: '/user/chat/message/report',
};

export async function report(
  endpoint: keyof typeof REPORT_ENDPOINT,
  id: string,
  body: { title: string; contents: string }
) {
  const res = await api.post(`${REPORT_ENDPOINT[endpoint]}/${id}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return id;
}
