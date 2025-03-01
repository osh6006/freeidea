'use client';

import { useForm, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Spinner from '@/components/ui/spinner';
import { MINUTE } from '@/constants/time';
import useTimer from '@/hooks/use-timer';
import { ProfileSchemaType } from '@/lib/zod/profile/profile-schema';
import {
  useMyPageProfileQuery,
  useSendCodeMutation,
  useVerifyCodeMutation,
} from '@/service/mypage/use-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDate } from 'date-fns';
import { z } from 'zod';
import { create } from 'zustand';

const useEmailChangeStore = create<{
  isEmailChangeInProgress: boolean;
  setIsEmailChangeInProgress: (isEmailChangeInProgress: boolean) => void;
}>((set) => ({
  isEmailChangeInProgress: false,
  setIsEmailChangeInProgress: (isEmailChangeInProgress) =>
    set({ isEmailChangeInProgress }),
}));

export default function ProfileEmailInputs() {
  const { getValues, setValue } = useFormContext<ProfileSchemaType>();
  const { setIsEmailChangeInProgress } = useEmailChangeStore();
  const { time, startTimer, isTimerRunning } = useTimer(3 * MINUTE);
  const {
    mutate: sendCodeMutate,
    isPending,
    isError,
    isSuccess,
  } = useSendCodeMutation();

  const onCodeInputVisibleChange = () => {
    setIsEmailChangeInProgress(true);
  };

  const onSendClick = () => {
    startTimer();
    sendCodeMutate({ email: getValues('email') });
  };

  const onVerifySuccess = (tempToken: string) => {
    setIsEmailChangeInProgress(false);
    setValue('tempToken', tempToken);
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <EmailInputField
        onChangeButtonClick={onCodeInputVisibleChange}
        onSendClick={onSendClick}
      />
      {isPending && <Spinner />}
      {isSuccess && (
        <EmailCodeInputField
          time={isTimerRunning ? time : undefined}
          onVerifySuccess={onVerifySuccess}
        />
      )}
      {isError && (
        <span className="typo-body-14-medium-100-tight text-error">
          인증 번호 전송 실패
        </span>
      )}
    </div>
  );
}

function EmailInputField({
  onChangeButtonClick,
  onSendClick,
}: {
  onChangeButtonClick: () => void;
  onSendClick: () => void;
}) {
  const { isEmailChangeInProgress } = useEmailChangeStore();
  const { control } = useFormContext<ProfileSchemaType>();
  const { data: myPageProfile } = useMyPageProfileQuery();
  const isKakaoEmail = myPageProfile?.authType === 'KAKAO';
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem className="flex flex-col gap-[10px]">
          <FormLabel>이메일</FormLabel>
          <div className="flex gap-[10px]">
            <div className="relative flex-1">
              <FormControl>
                <Input
                  {...field}
                  disabled={!isEmailChangeInProgress}
                />
              </FormControl>
              {!isKakaoEmail && !isEmailChangeInProgress && (
                <button
                  type="button"
                  className="absolute top-[12px] right-[10px] flex items-center w-[44px] h-[20px] rounded-[4px] p-[10px] bg-white typo-body-14-regular-150-tight "
                  onClick={onChangeButtonClick}
                >
                  변경
                </button>
              )}
            </div>

            {isEmailChangeInProgress && (
              <Button
                type="button"
                onClick={onSendClick}
                size="lg"
              >
                인증
              </Button>
            )}
          </div>
          {!isEmailChangeInProgress && (
            <span className="typo-caption-12-regular-100 text-slate-500">
              {isKakaoEmail
                ? '카카오 로그인 계정은 이메일 변경이 불가능합니다.'
                : '이메일을 변경하면 이메일 주소를 재인증해야 해요.'}
            </span>
          )}
        </FormItem>
      )}
    />
  );
}

function EmailCodeInputField({
  time,
  onVerifySuccess,
}: {
  time?: number;
  onVerifySuccess: (tempToken: string) => void;
}) {
  const codeSchema = z.object({
    code: z.string().length(6),
  });

  const { getValues } = useFormContext<ProfileSchemaType>();

  const {
    control,
    formState,
    setError,
    getValues: getValuesFromLocalForm,
  } = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: '',
    },
  });

  const { mutate: verifyCodeMutate, isSuccess } = useVerifyCodeMutation();

  const onVerifyClick = () => {
    verifyCodeMutate(
      {
        email: getValues('email'),
        verificationNumber: getValuesFromLocalForm('code'),
      },
      {
        onSuccess: (data) => onVerifySuccess(data.tempToken),
        onError: (error) => {
          setError('code', {
            type: 'manual',
            message: error.message || '인증번호가 올바르지 않습니다.',
          });
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <span className="typo-body-14-medium-100-tight text-success">
        인증이 완료되었습니다.
      </span>
    );
  }

  return (
    <div className="flex gap-[10px]">
      <FormField
        control={control}
        name="code"
        render={({ field }) => (
          <FormItem className="flex-1">
            <div className="relative ">
              <FormControl>
                <Input
                  {...field}
                  maxLength={6}
                  disabled={isSuccess}
                  placeholder="인증번호를 입력해주세요"
                />
              </FormControl>
              {time && (
                <span className="typo-body-14-medium-100-tight absolute right-[18px] top-1/2 -translate-y-1/2 text-error">
                  {formatDate(time, 'mm:ss')}
                </span>
              )}
            </div>
            <FormMessage>{formState.errors.code?.message}</FormMessage>
          </FormItem>
        )}
      />
      <Button
        type="button"
        size="lg"
        onClick={onVerifyClick}
        disabled={!formState.isValid || isSuccess}
      >
        확인
      </Button>
    </div>
  );
}
