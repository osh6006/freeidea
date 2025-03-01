'use client';

import { useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SECOND } from '@/constants/time';
import useTimer from '@/hooks/use-timer';
import { SignUpSchemaType } from '@/lib/zod/auth/sign-in-schema';
import {
  useSendAlimTalkMutation,
  useVerifyAlimCodeMutation,
} from '@/service/auth/use-service';
import { formatDate } from 'date-fns';

const SignUpPhone = () => {
  const { control, getValues, setError, setValue, clearErrors } =
    useFormContext<SignUpSchemaType>();
  const { time, startTimer, stopTimer } = useTimer(180 * SECOND);

  const { mutate: sendAlimTalkMutate, isSuccess: isSendAlimTalkSuccess } =
    useSendAlimTalkMutation();

  const { mutate: verifyAlimCodeMutate, isSuccess: isVerifyAlimCodeSuccess } =
    useVerifyAlimCodeMutation();

  const onSendAlimTalkClick = async (phoneNumber: string) => {
    sendAlimTalkMutate(phoneNumber, {
      onSuccess: () => {
        startTimer();
        setValue('isPhoneVerified', true);
        clearErrors('phone');
      },
      onError: (error) => {
        setError('phone', { message: error.message });
      },
    });
  };

  const onVerifyCodeClick = () => {
    verifyAlimCodeMutate(
      {
        phoneNumber: getValues('phone'),
        verificationNumber: getValues('code'),
      },
      {
        onSuccess: ({ tempToken }) => {
          setValue('tempToken', tempToken);
          stopTimer();
        },
        onError: (error) => {
          setError('code', { message: error.message });
        },
      }
    );
  };

  const isVerifyingCode = time > 0 && isSendAlimTalkSuccess;

  return (
    <>
      <FormField
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <FormItem className="mt-[30px]">
            <FormLabel>본인인증</FormLabel>
            <FormControl>
              <div className="flex items-center mt-[10px] gap-x-[10px]">
                <Input
                  error={!!fieldState.error}
                  placeholder="휴대폰 번호를 입력해주세요"
                  {...field}
                  value={field.value || ''}
                  disabled={isVerifyAlimCodeSuccess}
                />
                <Button
                  className="w-[100px]"
                  variant="outline"
                  type="button"
                  disabled={
                    !field.value?.trim() ||
                    (!!fieldState.error &&
                      fieldState.error.type !== 'manual') ||
                    isVerifyAlimCodeSuccess
                  }
                  onClick={() => onSendAlimTalkClick(field.value)}
                  size="lg"
                >
                  {isVerifyingCode ? '재발송' : '인증'}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isSendAlimTalkSuccess && (
        <FormField
          control={control}
          name="code"
          render={({ field, fieldState }) => (
            <FormItem className="mt-[10px]">
              <FormControl>
                <div className="flex items-center gap-x-[10px] m-0 p-0">
                  <div className="w-full relative ">
                    <Input
                      error={!!fieldState.error}
                      {...field}
                      placeholder="인증번호 6자리를 입력해 주세요"
                      disabled={isVerifyAlimCodeSuccess}
                    />
                    {isVerifyingCode && (
                      <div className="absolute text-error right-[18px] top-1/2 -translate-y-1/2 typo-body-14-medium-100-tight">
                        <time>{formatDate(new Date(time), 'mm:ss')}</time>
                      </div>
                    )}
                  </div>
                  <Button
                    className="w-[100px]"
                    variant="outline"
                    type="button"
                    disabled={isVerifyAlimCodeSuccess}
                    onClick={onVerifyCodeClick}
                    size="lg"
                  >
                    확인
                  </Button>
                </div>
              </FormControl>
              <FormMessage>
                {isVerifyAlimCodeSuccess && (
                  <span className="text-success">인증이 완료되었습니다.</span>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default SignUpPhone;
