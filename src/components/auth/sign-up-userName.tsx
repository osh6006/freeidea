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

const SignUpUserName = () => {
  const { control } = useFormContext<SignUpSchemaType>();
  return (
    <FormField
      control={control}
      name="name"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>이름</FormLabel>
          <FormControl>
            <Input
              className="mt-2"
              error={!!fieldState.error}
              placeholder="본인의 이름을 적어주세요"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SignUpUserName;
