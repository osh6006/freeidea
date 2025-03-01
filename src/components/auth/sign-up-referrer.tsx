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
import { SignUpSchemaType } from '@/lib/zod/auth/sign-in-schema';

const SignUpReferrer = () => {
  const { control } = useFormContext<SignUpSchemaType>();

  return (
    <>
      <FormField
        control={control}
        name="referrer"
        render={({ field, fieldState }) => (
          <FormItem className="mt-[30px]">
            <FormLabel>추천인 (선택 항목)</FormLabel>
            <FormControl>
              <Input
                error={
                  !!fieldState.error &&
                  !!field.value &&
                  field.value?.trim() !== ''
                }
                placeholder="추천인 닉네임을 적어주세요"
                {...field}
                className="mt-2"
              />
            </FormControl>
            {fieldState.error?.message && field.value?.trim() !== '' && (
              <FormMessage>{fieldState.error.message}</FormMessage>
            )}
          </FormItem>
        )}
      />
    </>
  );
};

export default SignUpReferrer;
