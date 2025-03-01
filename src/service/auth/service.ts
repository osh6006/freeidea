import api from '@/lib/api';
import { ILoginResponse, IMyInfo, LoginParamsMap } from '@/types/auth';

export async function login<T extends keyof LoginParamsMap>(
  params: LoginParamsMap[T],
  type: T
) {
  const endpoint = {
    email: '/auth/login',
    kakao: '/oauth/kakao',
    twitter: '/oauth/twitter',
  };
  const { data } = await api.post<ILoginResponse>(endpoint[type], {
    body: JSON.stringify(params),
  });

  return data;
}

export const logout = async () => {
  const res = await api.post('/auth/logout');
  return res.ok;
};

export const getNewToken = async (refreshToken: string) => {
  const { data } = await api.post<{
    accessToken: string;
    refreshToken: string;
  }>('/auth/token', {
    body: JSON.stringify({ refreshToken }),
    next: {
      tags: ['refreshToken'],
    },
  });
  return data;
};

export const getMyInfo = async () => {
  const { data } = await api.get<IMyInfo>('/user/account/myInfo');
  return data;
};

export const getRandomNickname = async () => {
  const { data } = await api.get<{ nickname: string }>('/auth/nickname');
  return data;
};

export const checkEmailDuplication = async (email: string) => {
  const response = await api.get(`/auth/checkEmail?email=${email}`);
  return response.ok;
};

export const checkPhoneDuplication = async (phoneNumber: string) => {
  const response = await api.get(
    `/auth/checkPhoneNumber?phoneNumber=${phoneNumber}`
  );
  return response.ok;
};

export const checkNicknameDuplication = async (nickname: string) => {
  const response = await api.get(`/auth/checkNickname?nickname=${nickname}`);
  return response.ok;
};

export const sendAlimTalk = async ({
  phoneNumber,
  checkPhoneNumber,
}: {
  phoneNumber: string;
  checkPhoneNumber: boolean;
}) => {
  const response = await api.post('/auth/alimtalk', {
    body: JSON.stringify({ phoneNumber, checkPhoneNumber }),
  });
  return response.ok;
};

export const verifyAlimCode = async ({
  phoneNumber,
  verificationNumber,
}: {
  phoneNumber: string;
  verificationNumber: string;
}) => {
  const { data } = await api.post<{ tempToken: string }>('/auth/verification', {
    body: JSON.stringify({ phoneNumber, verificationNumber }),
  });
  return data;
};

export const submitSignUp = async (signupData: {
  tempToken: string;
  email: string;
  password: string;
  userName: string;
  nickname: string;
  recommendNickname?: string;
  phoneNumber: string;
  marketingAgreement: boolean;
}) => {
  const response = await api.post('/auth/join', {
    body: JSON.stringify(signupData),
  });
  return response.ok;
};

export const findUserEmail = async ({
  tempToken,
  userName,
  phoneNumber,
}: {
  tempToken: string;
  userName: string;
  phoneNumber: string;
}): Promise<{ email: string }> => {
  const { data } = await api.post<{ email: string }>('/auth/findEmail', {
    body: JSON.stringify({ tempToken, userName, phoneNumber }),
  });
  return data;
};

export const findUserPassword = async (email: string) => {
  const response = await api.post('/auth/findPassword', {
    body: JSON.stringify({ email }),
  });

  return response.ok;
};

export const resetUserPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  const response = await api.put('/auth/resetPassword', {
    body: JSON.stringify({ token, newPassword }),
  });
  return response.ok;
};

export const checkResetPasswordToken = async (token: string) => {
  const response = await api.get(`/auth/resetPassword/token?token=${token}`);
  return response.ok;
};
