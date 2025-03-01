import { create } from 'zustand';

interface UserDataStoreType {
  userId: string;
  email: string;
  nickname: string;
  profileImageUrl: string;
  userStatus: 'JOINED' | string;
  myProductCount: number;
  accessToken: string;
  isLogin: boolean;
}

interface UserDataSetType {
  setNickname: (newNickname: string) => void;
  setAccessToken: (newAccessToken: string) => void;
  setIsLogin: (newIsLogin: boolean) => void;
  setUserId: (id: string) => void;
}

/**
 * @deprecated
 * useMyInfoQuery 를 사용하는 것을 권장합니다.
 */
export const userDataStore = create<UserDataStoreType & UserDataSetType>(
  (set) => ({
    userId: '',
    email: '',
    nickname: '',
    profileImageUrl: '',
    userStatus: '',
    myProductCount: 0,
    accessToken: '',
    isLogin: false,
    setNickname: (newNickname: string) => set({ nickname: newNickname }),
    setAccessToken: (newAccessToken: string) =>
      set({ accessToken: newAccessToken }),
    setIsLogin: (newIsLogin: boolean) => {
      set({ isLogin: newIsLogin });
    },
    setUserId: (id: string) => set({ userId: id }),
  })
);
