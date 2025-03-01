'use client';

import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToggle } from '@/hooks/use-toggle';
import { SignUpSchemaType } from '@/lib/zod/auth/sign-in-schema';
import { Eye, EyeOff } from '@untitled-ui/icons-react';

import { Input } from '../ui/input';

const SignUpPassword = () => {
  const { control, trigger } = useFormContext<SignUpSchemaType>();
  const [isPasswordVisible, togglePasswordVisibility] = useToggle(false);
  const [isPasswordCheckVisible, togglePasswordCheckVisibility] =
    useToggle(false);

  return (
    <div>
      <FormField
        control={control}
        name="password.password"
        render={({ field, fieldState }) => {
          return (
            <FormItem className="mt-[30px]">
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    error={!!fieldState.error}
                    type={isPasswordVisible ? 'text' : 'password'}
                    className="mt-[10px] pr-[40px]"
                    placeholder="비밀번호를 입력해 주세요"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger('password.password-check');
                    }}
                  />
                  <span
                    className="absolute right-[13px] top-[50%] transform -translate-y-[50%] cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <Eye className="size-[20px]" />
                    ) : (
                      <EyeOff className="size-[20px]" />
                    )}
                  </span>
                </div>
              </FormControl>
              <FormMessage mode="multiple" />
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name="password.password-check"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <Input
                  error={!!fieldState.error}
                  type={isPasswordCheckVisible ? 'text' : 'password'}
                  className="mt-[10px] pr-[40px]"
                  placeholder="비밀번호를 한번 더 입력해 주세요"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger('password.password');
                  }}
                />
                <span
                  className="absolute right-[13px] top-[50%] transform -translate-y-[50%] cursor-pointer"
                  onClick={togglePasswordCheckVisibility}
                >
                  {isPasswordCheckVisible ? (
                    <Eye className="size-[20px]" />
                  ) : (
                    <EyeOff className="size-[20px]" />
                  )}
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default SignUpPassword;
