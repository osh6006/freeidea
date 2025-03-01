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
import { ProfileSchemaType } from '@/lib/zod/profile/profile-schema';
import { useCheckNicknameDuplicationMutation } from '@/service/auth/use-service';
import { useDebouncedCallback } from 'use-debounce';

const ProfileNickName = () => {
  const { control } = useFormContext<ProfileSchemaType>();
  const { mutate: checkNicknameDuplicationMutate, error } =
    useCheckNicknameDuplicationMutation();
  const debouncedCheckNicknameDuplicationMutate = useDebouncedCallback(
    checkNicknameDuplicationMutate,
    1 * SECOND
  );

  const handleNicknameDuplicationCheck = (nickname: string) => {
    debouncedCheckNicknameDuplicationMutate(nickname);
  };

  const apiError = error instanceof APIError ? error : null;
  const isDuplicated = apiError?.code === 'NICKNAME_ALREADY_EXISTS';

  return (
    <div>
      <FormField
        control={control}
        name="nickname"
        render={({ field, fieldState, formState }) => (
          <FormItem>
            <FormLabel>닉네임</FormLabel>
            <FormControl>
              <div className="flex items-center mt-[10px] gap-x-[10px]">
                <Input
                  {...field}
                  placeholder="닉네임을 적어주세요"
                  error={!!fieldState.error || !!isDuplicated}
                  onChange={(e) => {
                    field.onChange(e);
                    handleNicknameDuplicationCheck(e.currentTarget.value);
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {isDuplicated && (
        <p className="typo-caption-12-regular-100 text-error mt-[10px]">
          이미 사용중인 닉네임입니다.
        </p>
      )}
    </div>
  );
};

export default ProfileNickName;
