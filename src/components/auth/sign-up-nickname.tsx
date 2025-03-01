'use client';

import { useFormContext } from 'react-hook-form';

import { SECOND } from '@/constants/time';
import APIError from '@/lib/api-error';
import { SignUpSchemaType } from '@/lib/zod/auth/sign-in-schema';
import {
  useCheckNicknameDuplicationMutation,
  useRandomNicknameQuery,
} from '@/service/auth/use-service';
import { useDebouncedCallback } from 'use-debounce';

import { Button } from '../ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const SignUpNickName = () => {
  const { control, setValue, trigger, formState, getValues } =
    useFormContext<SignUpSchemaType>();
  const { refetch, isFetching } = useRandomNicknameQuery();
  const { mutate: checkNicknameDuplicationMutate } =
    useCheckNicknameDuplicationMutation();
  const debouncedCheckNicknameDuplicationMutate = useDebouncedCallback(
    checkNicknameDuplicationMutate,
    1 * SECOND
  );

  const currentNickname = getValues('nickname.value');

  const handleNicknameDuplicationCheck = (nickname: string) => {
    if (!nickname.trim()) {
      setValue('nickname.isDuplicated', false);
      trigger('nickname.isDuplicated');
      return;
    }
    setValue('nickname.isDuplicated', false);
    debouncedCheckNicknameDuplicationMutate(nickname, {
      onSuccess: () => {
        setValue('nickname.isDuplicated', false);
      },
      onError: (error: Error) => {
        const apiError = error as APIError;
        if (apiError.code === 'NICKNAME_ALREADY_EXISTS') {
          setValue('nickname.isDuplicated', true);
        } else {
          setValue('nickname.isDuplicated', false);
        }
      },
      onSettled: () => {
        trigger('nickname.isDuplicated');
      },
    });
  };

  return (
    <>
      <FormField
        control={control}
        name="nickname.value"
        render={({ field, fieldState, formState }) => (
          <FormItem className="mt-[30px]">
            <FormLabel>닉네임</FormLabel>
            <FormControl>
              <div className="flex items-center mt-[10px] gap-x-[10px]">
                <Input
                  error={
                    !!fieldState.error ||
                    !!formState.errors.nickname?.isDuplicated
                  }
                  placeholder="닉네임을 적어주세요"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleNicknameDuplicationCheck(e.currentTarget.value);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={async () => {
                    const { data } = await refetch();
                    if (!data) throw new Error('닉네임 생성 실패');
                    field.onChange(data.nickname);
                    handleNicknameDuplicationCheck(data.nickname);
                  }}
                  disabled={isFetching}
                >
                  딴거할래요
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {!formState.errors.nickname && currentNickname.trim() && (
        <p className="typo-caption-12-regular-100 text-success mt-[10px]">
          사용 가능한 ID 입니다.
        </p>
      )}
      {formState.errors.nickname?.isDuplicated && (
        <p className="typo-caption-12-regular-100 text-error mt-[10px]">
          이미 사용중인 닉네임입니다.
        </p>
      )}
    </>
  );
};

export default SignUpNickName;
