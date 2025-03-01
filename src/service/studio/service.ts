import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import { IAPIResponse } from '@/types/common';
import {
  IStudioBasicParameter,
  IStudioFollowInfoListParameter,
  IStudioQnaWithPage,
  IStudioWorkListParameter,
  NotiSchemaType,
  TAuthorBoardResponse,
  TStudioFollowInfoListResponse,
  TStudioGuestBookListResponse,
  TStudioNotiListResponse,
  TStudioNoticeResponse,
  TStudioProfilePopupResponse,
  TStudioProfileResponse,
  TStudioWorkListResponse,
} from '@/types/studio';

// === Follow === //
export async function followAuthor(
  studioId: string,
  body: { isFollowing: boolean }
) {
  const res = await api.post(`/user/studio/follow/${studioId}`, {
    body: JSON.stringify(body),
  });

  const { message, code }: IAPIResponse = await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('작가 팔로우 관련 오류'));
  }

  return body.isFollowing;
}

export async function getStudioFollowInfoList(
  type: string,
  studioId: string,
  params: Omit<IStudioFollowInfoListParameter, 'type' | 'studioId'>
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(
    `/user/studio/profile/${type}/${studioId}?${queryString}`
  );
  const { data, code, message }: TStudioFollowInfoListResponse =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }

  if (!res.ok) {
    throw new Error(
      ERROR_MESSAGE.unexpected('스튜디오 팔로우 리스트 관련 오류')
    );
  }

  return data;
}

// === Profile === //

export async function getStudioProfileInfo(studioId: string) {
  const res = await api.get(`/user/studio/profile/${studioId}`);
  const { data, code, message }: TStudioProfileResponse = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('스튜디오 상세 정보 오류'));
  }

  return data;
}

export async function getStudioProfilePopup(studioId: string) {
  const res = await api.get(`/user/studio/profile/popup/${studioId}`);
  const { data, code, message }: TStudioProfilePopupResponse = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('스튜디오 프로필 팝업 오류'));
  }
  return data;
}

// === Banner === //

export async function clearStudioBanner(studioId: string) {
  const res = await api.put(`/user/studio/titleImage/${studioId}`);
  const data: IAPIResponse = await res.json();

  if (data.code !== API_CODE.success)
    throw new APIError({ message: data.message, code: data.code });

  return data;
}

export async function updateStudioBanner(
  studioId: string,
  titleImageId: string
) {
  const res = await api.put(`/user/studio/titleImage/${studioId}`, {
    body: JSON.stringify({ titleImageId }),
  });

  const data: IAPIResponse = await res.json();

  if (data.code !== API_CODE.success)
    throw new APIError({ message: data.message, code: data.code });

  return data;
}

// === Work === //

export async function getStudioWorkList(
  studioId: string,
  params: IStudioWorkListParameter
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/studio/product/${studioId}?${queryString}`);
  const { data, code, message }: TStudioWorkListResponse = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('스튜디오 작품 리스트 오류'));
  }

  return data;
}

// === Notice === //

export async function getStudioNotice(studioId: string) {
  const res = await api.get(`/user/studio/notice/fixed/${studioId}`);
  const { data, code, message }: TStudioNoticeResponse = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('스튜디오 공지 오류'));
  }

  return data;
}

export async function createStudioNoti(studioId: string, body: NotiSchemaType) {
  const res = await api.post(`/user/studio/notice/${studioId}`, {
    body: JSON.stringify({
      contents: body.contents,
      isFixed: body.isFixed || false,
    }),
  });

  const { message, code }: IAPIResponse = await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function updateStudioNoti(noticeId: string, body: NotiSchemaType) {
  const res = await api.put(`/user/studio/notice/${noticeId}`, {
    body: JSON.stringify({
      contents: body.contents,
      isFixed: body.isFixed || false,
    }),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function getStudioNotiList(
  studioId: string,
  params: IStudioBasicParameter
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/studio/notice/${studioId}?${queryString}`);
  const { data, code, message }: TStudioNotiListResponse = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('스튜디오 공지 리스트 오류'));
  }

  return data;
}

export async function deleteStudioNoti(noticeId: string) {
  const res = await api.delete(`/user/studio/notice/${noticeId}`);
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function reportStudioNoti(
  noticeId: string,
  body: {
    title: string;
    contents: string;
  }
) {
  const res = await api.post(`/user/studio/notice/report/${noticeId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function toggleStudioNotiFix(noticeId: string, isFixed: boolean) {
  const res = await api.put(`/user/studio/notice/fixed/${noticeId}`, {
    body: JSON.stringify({
      isFixed: !isFixed,
    }),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

// === Guest Book === //
export async function createStudioGuestBook(
  studioId: string,
  body: {
    contents: string;
  }
) {
  const res = await api.post(`/user/studio/visitor/${studioId}`, {
    body: JSON.stringify({
      contents: body.contents,
    }),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return { studioId, contents: body.contents };
}

export async function updateStudioGuestBook(
  guestBookId: string,
  body: {
    contents: string;
  }
) {
  const res = await api.put(`/user/studio/visitor/${guestBookId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function getStudioGuestBookList(
  studioId: string,
  params: IStudioBasicParameter
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/studio/visitor/${studioId}?${queryString}`);
  const { data, code, message }: TStudioGuestBookListResponse =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('스튜디오 방명록 리스트 오류'));
  }

  return data;
}

export async function deleteStudioGuestBook(guestbookId: string) {
  const res = await api.delete(`/user/studio/visitor/${guestbookId}`);
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function reportStudioGuestBook(
  guestbookId: string,
  body: {
    title: string;
    contents: string;
  }
) {
  const res = await api.post(`/user/studio/visitor/report/${guestbookId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function getStudioAuthorBoard(studioId: string) {
  const res = await api.get(`/user/studio/authorBoard/${studioId}`);
  const { data, message, code }: TAuthorBoardResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getStudioQnaList(
  studioId: string,
  params: IStudioBasicParameter
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/studio/qna/${studioId}?${queryString}`);
  const { data, code, message }: IAPIResponse<IStudioQnaWithPage> =
    await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('스튜디오 Q&A 리스트 오류'));
  }

  return data;
}
