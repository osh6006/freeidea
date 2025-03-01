// Feed CURD
import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { objectToQueryString } from '@/lib/utils';
import { IAPIResponse } from '@/types/common';
import {
  FeedCommentListResponseType,
  FeedDetailResponseType,
  FeedListResponseType,
  FeedModifyResponseType,
  FeedWriteSchemaType,
  IFeedBasicParameter,
} from '@/types/feed';

export async function createFeed(body: FeedWriteSchemaType) {
  const res = await api.post(`/user/feed`, {
    body: JSON.stringify(body),
  });
  const { data, code, message }: IAPIResponse = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 작성 오류'));
  }

  return data as { feedId: string };
}
export async function updateFeed(feedId: string, body: FeedWriteSchemaType) {
  const res = await api.put(`/user/feed/${feedId}`, {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 수정 오류'));
  }
}

export async function getFeedList(
  studioId: string,
  params: IFeedBasicParameter
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/feed/list/${studioId}?${queryString}`);

  const { data, code, message }: FeedListResponseType = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 리스트 오류'));
  }

  return data;
}

export async function deleteFeed(feedId: string) {
  const res = await api.delete(`/user/feed/${feedId}`);
  const { code, message }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 삭제 오류'));
  }
}

export async function reportFeed(feedId: string, body: {}) {
  const res = await api.post(`/user/feed/report/${feedId}`, {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 삭제 오류'));
  }
}

// Feed Detail
export async function getFeedDetail(feedId: string) {
  const res = await api.get(`/user/feed/${feedId}`);

  const { data, code, message }: FeedDetailResponseType = await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 디테일 오류'));
  }
  return data;
}

// Feed Modify
export async function getFeedModify(feedId: string) {
  const res = await api.get(`/user/feed/article/${feedId}`);

  const { data, code, message }: FeedModifyResponseType = await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 디테일 오류'));
  }
  return data;
}

// Feed Comment
export async function createFeedComment(feedId: string, comment: string) {
  const res = await api.post(`/user/feed/comments/${feedId}`, {
    body: JSON.stringify({ comment }),
  });

  const { code, message }: APIError = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 댓글 작성 오류'));
  }

  return feedId;
}

export async function getFeedCommentList(
  feedId: string,
  params: IFeedBasicParameter
) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/feed/comments/${feedId}?${queryString}`);

  const { data, code, message }: FeedCommentListResponseType = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 댓글 리스트 오류'));
  }

  return data;
}

export async function deleteFeedComment(feedCommentId: string) {
  const res = await api.delete(`/user/feed/comments/${feedCommentId}`);

  const { code, message }: APIError = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 댓글 삭제 오류'));
  }
}

export async function reportFeedComment(feedId: string, body: {}) {
  const res = await api.post(`/user/feed/comments/report/${feedId}`, {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await res.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 삭제 오류'));
  }
}

// Feed Sicial
export async function togglefeedPangLike(feedId: string, isPangLike: boolean) {
  const res = await api.post(`/user/feed/like/membership/${feedId}`, {
    body: JSON.stringify({
      isMembershipLiked: isPangLike,
    }),
  });

  const { code, message }: APIError = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 팡 좋아요 오류'));
  }

  return feedId;
}
export async function togglefeedLike(feedId: string, isLike: boolean) {
  const res = await api.post(`/user/feed/like/${feedId}`, {
    body: JSON.stringify({
      isLiked: isLike,
    }),
  });

  const { code, message }: APIError = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 좋아요 오류'));
  }

  return feedId;
}
export async function togglefeedScrap(feedId: string, isScrap: boolean) {
  const res = await api.post(`/user/feed/scrap/${feedId}`, {
    body: JSON.stringify({
      isScrapping: isScrap,
    }),
  });

  const { code, message }: APIError = await res.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
  if (!res.ok) {
    throw new Error(ERROR_MESSAGE.unexpected('피드 스크랩 오류'));
  }

  return { feedId, isScrap };
}

export async function scrapToggleFeed(
  id: string,
  body: { isScrapping: boolean }
) {
  const response = await api.post(`/user/feed/scrap/${id}`, {
    body: JSON.stringify(body),
  });
  const { code, message }: IAPIResponse = await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok) throw new Error(ERROR_MESSAGE.unexpected('스크랩 오류'));

  return { feedId: id, isScrapping: body.isScrapping };
}
