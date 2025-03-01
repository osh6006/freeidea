import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import { IAPIResponse } from '@/types/common';
import {
  ICategoryAuthorQna,
  IQnaActiveAuthor,
  IQnaAnswerCommentWithPage,
  IQnaAnswerWithPage,
  IQnaBasicParams,
  IQnaDetail,
  IQnaWithPage,
  IRecentlyQna,
  QnaWriteSchemaType,
} from '@/types/qna';

export async function createQna(body: QnaWriteSchemaType) {
  const res = await api.post(`/user/qna`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function getQnaList(params: IQnaBasicParams) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/qna?${queryString}`);
  const { data, code, message }: IAPIResponse<IQnaWithPage> = await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function updateQna(qnaId: string, body: QnaWriteSchemaType) {
  const res = await api.put(`/user/qna/${qnaId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return qnaId;
}

export async function deleteQna(qnaId: string) {
  const res = await api.delete(`/user/qna/${qnaId}`);
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function reportQna(
  qnaId: string,
  body: {
    title: string;
    contents: string;
  }
) {
  const res = await api.post(`/user/qna/${qnaId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

// QnaDetail

export async function getQnaDetail(qnaId: string) {
  const res = await api.get(`/user/qna/${qnaId}`);
  const { data, code, message }: IAPIResponse<IQnaDetail> = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('Q&A 수정사항 오류'));
  }
  return data;
}

export async function getQnaDetailModify(qnaId: string) {
  const res = await api.get(`/user/qna/article/${qnaId}`, {
    cache: 'no-store',
  });
  const { data, code, message }: IAPIResponse<QnaWriteSchemaType> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('Q&A 수정사항 오류'));
  }
  return data;
}

// Answer

export async function createQnaAnswer(
  qnaId: string,
  body: {
    contents: string;
  }
) {
  const res = await api.post(`/user/qna/answer/${qnaId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function updateQnaAnswer(
  qnaAnswerId: string,
  body: { contents: string }
) {
  const res = await api.put(`/user/qna/answer/${qnaAnswerId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return {
    qnaAnswerId,
  };
}

export async function getQnaAnswerList(qnaId: string, params: IQnaBasicParams) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/qna/answer/${qnaId}?${queryString}`);
  const { data, code, message }: IAPIResponse<IQnaAnswerWithPage> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('Q&A 답변 리스트 오류'));
  }

  return data;
}

export async function deleteQnaAnswer(qnaAnswerId: string) {
  const res = await api.delete(`/user/qna/answer/${qnaAnswerId}`);
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function toggleQnaAnswerShown(
  qnaAnswerId: string,
  body: {
    isShown: boolean;
  }
) {
  const res = await api.put(`/user/qna/answer/showing/${qnaAnswerId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function toggleQnaAnswerMembershipLike(
  qnaAnswerId: string,
  body: { isMembershipLiked: boolean }
) {
  const res = await api.post(
    `/user/qna/answer/like/membership/${qnaAnswerId}`,
    {
      body: JSON.stringify(body),
    }
  );
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function toggleQnaAnswerLike(
  qnaAnswerId: string,
  body: { isLiked: boolean }
) {
  const res = await api.post(`/user/qna/answer/like/${qnaAnswerId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function createQnaAnswerComment(
  qnaAnswerId: string,
  body: { comment: string }
) {
  const res = await api.post(`/user/qna/answer/comments/${qnaAnswerId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function getQnaAnswerCommentList(
  qnaAnswerId: string,
  params: IQnaBasicParams
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(
    `/user/qna/answer/comments/${qnaAnswerId}?${queryString}`
  );
  const { data, code, message }: IAPIResponse<IQnaAnswerCommentWithPage> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('Q&A 리스트 관련 오류'));
  }
  return data;
}

export async function updateQnaAnswerComment(
  qnaAnswerCommentId: string,
  body: { comment: string }
) {
  const res = await api.put(`/user/qna/answer/comments/${qnaAnswerCommentId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}
export async function deleteQnaAnswerComment(qnaAnswerCommentId: string) {
  const res = await api.delete(
    `/user/qna/answer/comments/${qnaAnswerCommentId}`
  );
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}
export async function reportQnaAnswer(
  qnaAnswerCommentId: string,
  body: { title: string; contents: string }
) {
  const res = await api.put(`/user/qna/answer/comments/${qnaAnswerCommentId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

// rest

export async function getRecentActiveAuthorList() {
  const res = await api.get(`/user/qna/misc/authors/frequent`);
  const { data, code, message }: IAPIResponse<IQnaActiveAuthor[]> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('Q&A 최근 활동한 작가 관련 오류'));
  }
  return data;
}

export async function getRecentQnaList() {
  const res = await api.get(`/user/qna/misc/recent`);
  const { data, code, message }: IAPIResponse<IRecentlyQna[]> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  if (!res.ok) {
    throw new Error(
      ERROR_MESSAGE.unexpected('최근 올라온 Q&A 리스트 관련 오류')
    );
  }

  return data;
}

export async function getQnaAuthorListByCategory() {
  const res = await api.get(`/user/qna/misc/authors/category`);
  const { data, code, message }: IAPIResponse<ICategoryAuthorQna[]> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  if (!res.ok) {
    throw new Error(
      ERROR_MESSAGE.unexpected('카테고리별 Q&A 작가 리스트 관련 오류')
    );
  }
  return data;
}
