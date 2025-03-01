import API_CODE from '@/constants/error-code';
import { ERROR_MESSAGE } from '@/constants/message';
import api from '@/lib/api';
import APIError from '@/lib/api-error';
import { deleteCookie } from '@/lib/cookie';
import { objectToQueryString } from '@/lib/utils';
import { IAPIResponse, IApiResponse, IPagination } from '@/types/common';
import { MyMembership, MyMembershipPayment } from '@/types/membership';
import {
  IMyFollowerListType,
  IMyFollowingListType,
  IMyPageProfile,
  IMyPageRequestListParams,
  IMyPageRequesterListParams,
  IMypageRequesterWithPage,
  MyMembershipPaymentRequest,
  MyPageAuthorApplyType,
  MyProduct,
  ScrapFeedListType,
  ScrapPortfolioListType,
  ScrapProductListType,
} from '@/types/mypage';
import { IQnaWithPage } from '@/types/qna';
import {
  IMyPageRequestStateWithPage,
  IMypageRequestData,
} from '@/types/request';

export async function getMyMembership() {
  const response = await api.get('/user/myPage/membership');
  const { message, data, code }: IAPIResponse<MyMembership> =
    await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyMembershipPayment({
  page,
  limit,
  startDate,
  endDate,
}: MyMembershipPaymentRequest) {
  const queryString = objectToQueryString({ page, limit, startDate, endDate });
  const response = await api.get(
    `/user/myPage/membership/payment?${queryString}`
  );
  const {
    message,
    data,
    code,
  }: IAPIResponse<{ list: MyMembershipPayment[] } & IPagination> =
    await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyProducts({
  page,
  limit,
  isPending,
}: {
  page?: number;
  limit?: number;
  isPending: boolean;
}) {
  const response = await api.get(
    `/user/myPage/inquiry/products?${objectToQueryString({ page, limit, isPending })}`
  );
  const {
    message,
    data,
    code,
  }: IAPIResponse<{ list: MyProduct[] } & IPagination> = await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function toggleProductStatus(
  id: string,
  body: { isClosed: boolean }
) {
  const response = await api.put(
    `/user/myPage/inquiry/products/purchase/${id}`,
    { body: JSON.stringify(body) }
  );
  const { message, code }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return { id, isClosed: body.isClosed };
}

export async function republishProduct(id: string) {
  const response = await api.put(
    `/user/myPage/inquiry/products/republish/${id}`
  );
  const { message, code }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return id;
}

export async function authorApply(body: MyPageAuthorApplyType) {
  const response = await api.post(`/user/myPage/applyAuthor`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export const checkEmailDuplication = async (email: string) => {
  const response = await api.get(`/user/myPage/email?email=${email}`);
  const { code, message }: IApiResponse = await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok)
    throw new Error(
      ERROR_MESSAGE.unexpected('Cannot check email duplication.')
    );

  return code === API_CODE.success;
};

export const sendCode = async ({ email }: { email: string }) => {
  const response = await api.post('/user/myPage/email', {
    body: JSON.stringify({ email }),
  });

  const { code, message }: IAPIResponse = await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok)
    throw new Error(
      ERROR_MESSAGE.unexpected('Cannot send verification email.')
    );

  return code === API_CODE.success;
};

export const verifyCode = async ({
  email,
  verificationNumber,
}: {
  email: string;
  verificationNumber: string;
}) => {
  const response = await api.post('/user/myPage/email/verification', {
    body: JSON.stringify({ email, verificationNumber }),
  });

  const { code, message, data }: IAPIResponse<{ tempToken: string }> =
    await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok)
    throw new Error(ERROR_MESSAGE.unexpected('Cannot verify email.'));

  return data;
};

export const getMyPageProfile = async () => {
  const response = await api.get('/user/myPage/profile');
  const { data, code, message }: IAPIResponse<IMyPageProfile> =
    await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return data;
};

export const updateProfile = async ({
  tempToken,
  nickname,
  introduction,
  email,
  profileImageId,
}: {
  tempToken?: string;
  profileImageId?: string;
  nickname: string;
  introduction: string;
  email: string;
}) => {
  const response = await api.put('/user/myPage/profile', {
    body: JSON.stringify({
      tempToken,
      nickname,
      introduction,
      email,
      profileImageId,
    }),
  });

  const { code, message, data }: IAPIResponse<{ tempToken: string }> =
    await response.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });
  if (!response.ok)
    throw new Error(ERROR_MESSAGE.unexpected('Cannot verify email.'));

  return data;
};

export const updatePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.put('/user/account/password', {
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const { data, code, message }: IApiResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
  return data;
};
export async function getMyQuestions({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) {
  const res = await api.get(
    `/user/myPage/qna/?${objectToQueryString({ page, limit })}`
  );
  const { message, data, code }: IAPIResponse<IQnaWithPage> = await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyPageRequestList(params: IMyPageRequestListParams) {
  const res = await api.get(
    `/user/myPage/inquiry/?${objectToQueryString(params)}`
  );
  const { message, data, code }: IAPIResponse<IMypageRequestData> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function toggleRequstFinish(
  requestId: string,
  body: {
    isFinished: boolean;
  }
) {
  const response = await api.put(`/user/myPage/inquiry/finished/${requestId}`, {
    body: JSON.stringify(body),
  });
  const { message, code }: IAPIResponse = await response.json();
  if (code !== API_CODE.success) throw new APIError({ message, code });
}

export async function getMyPageRequesterList(
  params: IMyPageRequesterListParams
) {
  const res = await api.get(
    `/user/myPage/inquiry/applies?${objectToQueryString(params)}`
  );
  const { message, data, code }: IAPIResponse<IMypageRequesterWithPage> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyPageRequesterDetail(id: string) {
  const res = await api.get(`/user/myPage/inquiry/applies/${id}`);
  const {
    message,
    data,
    code,
  }: IAPIResponse<{
    inquiryApplyId: string;
    urlAddress: string;
    estimatedBudget: string;
    estimatedDate: string;
    memo: string;
  }> = await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyPageRequestStateList(
  params: IMyPageRequestListParams
) {
  const res = await api.get(
    `/user/myPage/inquiry/applies/my?${objectToQueryString(params)}`
  );
  const { message, data, code }: IAPIResponse<IMyPageRequestStateWithPage> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyScrapProductList(params: {
  page?: number;
  limit?: number;
}) {
  const queryString = objectToQueryString(params);

  const res = await api.get(`/user/myPage/scraps/product?${queryString}`);
  const { data, code, message }: IAPIResponse<ScrapProductListType> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyScrapPortfolioList(params: {
  page?: number;
  limit?: number;
}) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/myPage/scraps/portfolio?${queryString}`);
  const { data, code, message }: IAPIResponse<ScrapPortfolioListType> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyScrapFeedList(params: {
  page?: number;
  limit?: number;
}) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/myPage/scraps/feed?${queryString}`);
  const { data, code, message }: IAPIResponse<ScrapFeedListType> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyFollowerList(params: {
  page?: number;
  limit?: number;
}) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/myPage/followers?${queryString}`);
  const { data, code, message }: IAPIResponse<IMyFollowerListType> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function getMyFollowingList(params: {
  page?: number;
  limit?: number;
}) {
  const queryString = objectToQueryString(params);
  const res = await api.get(`/user/myPage/followings?${queryString}`);
  const { data, code, message }: IAPIResponse<IMyFollowingListType> =
    await res.json();

  if (code !== API_CODE.success) throw new APIError({ message, code });

  return data;
}

export async function leaveAccount(leaveReason: string) {
  const response = await api.delete('/user/account/leave', {
    body: JSON.stringify({ leaveReason }),
  });

  const { code, message }: IAPIResponse = await response.json();

  if (code !== API_CODE.success) {
    throw new APIError({ message, code });
  }
}
