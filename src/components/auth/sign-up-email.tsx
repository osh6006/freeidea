'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SECOND } from '@/constants/time';
import APIError from '@/lib/api-error';
import { SignUpSchemaType } from '@/lib/zod/auth/sign-in-schema';
import { useCheckEmailDuplicationMutation } from '@/service/auth/use-service';
import { useDebouncedCallback } from 'use-debounce';

const SignUpEmail = () => {
  const { control, setValue, trigger, formState } =
    useFormContext<SignUpSchemaType>();
  const { mutate: checkEmailDuplicationMutate } =
    useCheckEmailDuplicationMutation();
  const debouncedCheckEmailDuplicationMutate = useDebouncedCallback(
    checkEmailDuplicationMutate,
    1 * SECOND
  );

  const handleEmailDuplicationCheck = (email: string) => {
    setValue('email.isDuplicated', false);
    debouncedCheckEmailDuplicationMutate(email, {
      onSuccess: () => {
        setValue('email.isDuplicated', false);
      },
      onError: (error) => {
        if (!(error instanceof APIError)) throw error;
        if (error.code === 'USER_ALREADY_EXISTS') {
          setValue('email.isDuplicated', true);
        }
      },
      onSettled: () => {
        trigger('email.isDuplicated');
      },
    });
  };

  return (
    <>
      <FormField
        control={control}
        name="email.value"
        render={({ field, fieldState, formState }) => (
          <FormItem className="mt-[30px]">
            <FormLabel>이메일</FormLabel>
            <FormControl>
              <Input
                error={
                  !!formState.errors.email?.isDuplicated || !!fieldState.error
                }
                placeholder="아이디로 사용할 이메일을 적어주세요"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleEmailDuplicationCheck(e.currentTarget.value);
                }}
                className="mt-2"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {formState.errors.email?.isDuplicated && (
        <p className="typo-caption-12-regular-100 text-error mt-[10px]">
          이미 사용 중인 이메일입니다.
        </p>
      )}
    </>
  );
};

export default SignUpEmail;
