import { deleteJwtCookies, setJwtCookies } from '@/lib/token';
import { LoginParamsMap } from '@/types/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  myInfoQueryKey,
  myInfoQueryOption,
  signUpMutationKey,
} from './query-option';
import {
  checkEmailDuplication,
  checkNicknameDuplication,
  checkPhoneDuplication,
  checkResetPasswordToken,
  findUserEmail,
  findUserPassword,
  getRandomNickname,
  login,
  logout,
  resetUserPassword,
  sendAlimTalk,
  submitSignUp,
  verifyAlimCode,
} from './service';

export function useLoginMutation<T extends 'email' | 'kakao' | 'twitter'>(
  type: T
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: LoginParamsMap[T]) => login<T>(params, type),
    onSuccess: async (data) => {
      await setJwtCookies(data.accessToken, data.refreshToken);
      queryClient.cancelQueries({ queryKey: myInfoQueryOption.queryKey });
      queryClient.refetchQueries({ queryKey: myInfoQueryOption.queryKey });
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onMutate: () => {
      queryClient.setQueryData(myInfoQueryKey, null);
    },
    onError: () => {},
    onSettled: async () => {
      await deleteJwtCookies();
      queryClient.invalidateQueries({ queryKey: myInfoQueryKey });
    },
  });
}

export function useMyInfoQuery() {
  return useQuery(myInfoQueryOption);
}

export function useRandomNicknameQuery() {
  return useQuery({
    queryKey: ['randomNickname'],
    queryFn: getRandomNickname,
    retry: false,
    enabled: false,
  });
}

export function useCheckEmailDuplicationMutation() {
  return useMutation({
    mutationFn: checkEmailDuplication,
    onError: () => {},
  });
}
export function useCheckNicknameDuplicationMutation() {
  return useMutation({
    mutationFn: checkNicknameDuplication,
    onError: () => {},
  });
}

export function useSendAlimTalkMutation() {
  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      const isValid = await checkPhoneDuplication(phoneNumber);
      const result = await sendAlimTalk({
        phoneNumber,
        checkPhoneNumber: isValid,
      });
      return result;
    },
    onError: () => {},
  });
}

export function useForgotSendAlimTalkMutation() {
  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      const result = await sendAlimTalk({
        phoneNumber,
        checkPhoneNumber: false,
      });
      return result;
    },
  });
}

export function useVerifyAlimCodeMutation() {
  return useMutation({
    mutationKey: signUpMutationKey.verifyAlimCode,
    mutationFn: verifyAlimCode,
    onError: () => {},
  });
}

export function useSubmitSignUpMutation() {
  return useMutation({
    mutationFn: submitSignUp,
  });
}

export function useFindUserEmailMutation() {
  return useMutation({
    mutationFn: findUserEmail,
    onError: () => {},
  });
}

export function useFindUserPasswordMutation() {
  return useMutation({
    mutationFn: findUserPassword,
    onError: () => {},
  });
}

export function useResetUserPasswordMutation() {
  return useMutation({
    mutationFn: resetUserPassword,
    onError: () => {},
  });
}

export function useCheckResetPasswordTokenMutation() {
  return useMutation({
    mutationFn: async (token: string) => {
      return await checkResetPasswordToken(token);
    },
  });
}
