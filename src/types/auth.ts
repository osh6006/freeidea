export type Level = 'GUEST' | 'USER' | 'AUTHOR' | 'ADMIN' | 'MASTER';

export const LEVEL_NUMBER = {
  GUEST: 0,
  USER: 1,
  AUTHOR: 2,
  ADMIN: 3,
  MASTER: 4,
};

export type JWT = {
  type: string;
  id: string;
  level: Level;
  iat: number;
  exp: number;
};

export type IMyInfo = {
  userId: string;
  email: string;
  userName: string;
  nickname: string;
  phoneNumber: string;
  studioId: string;
  profileImageUrl: string;
  userStatus: 'JOINED' | 'LEFT';
  userLevel: Exclude<Level, 'GUEST'>;
  myProductCount: number;
  slots: number;
  leftSlots: number;
  followings: number;
  followers: number;
  qnaCount: number;
};

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IKakaoLoginRequest {
  token: string;
  recommendNockname?: string;
}

export interface ITwitterLoginRequest {
  token: string;
  recommendNockname?: string;
  email?: string;
  userName?: string;
  phoneNumber?: string;
  recommendNickname?: string;
  marketingAgreement?: boolean;
}

export type LoginParamsMap = {
  email: ILoginRequest;
  kakao: IKakaoLoginRequest;
  twitter: ITwitterLoginRequest;
};
