'use client';

import { useFormContext } from 'react-hook-form';

import TextCounter from '@/components/common/text-counter';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ProfileSchemaType } from '@/lib/zod/profile/profile-schema';

const ProfileIntroduction = () => {
  const { control } = useFormContext<ProfileSchemaType>();
  return (
    <FormField
      control={control}
      name="introduction"
      render={({ field }) => (
        <FormItem>
          <FormLabel>한 줄 자기소개</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                className="mt-[10px] pr-[78px]"
                value={field.value}
                placeholder="간단한 자기소개를 입력하세요."
              />
            </FormControl>
            <TextCounter
              className="absolute right-[10px] top-1/2 -translate-y-1/2"
              count={field.value.length}
              limit={20}
            />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProfileIntroduction;
