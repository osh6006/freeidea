'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import APIError from '@/lib/api-error';
import {
  ProfileChangePasswordSchemaType,
  profileChangePasswordSchema,
} from '@/lib/zod/profile/profile-schema';
import { useUpdatePassword } from '@/service/mypage/use-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from '@untitled-ui/icons-react';

interface ProfileResetDialogProps {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ProfileResetPasswordDialog = ({
  open,
  setIsOpen,
}: ProfileResetDialogProps) => {
  const form = useForm<ProfileChangePasswordSchemaType>({
    resolver: zodResolver(profileChangePasswordSchema),
    mode: 'onChange',
  });

  const { control, handleSubmit, trigger, setError } = form;

  const { mutate: updatePasswordMutate } = useUpdatePassword();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const togglePasswordCheckVisibility = () =>
    setIsPasswordCheckVisible(!isPasswordCheckVisible);

  const onSubmit = (data: ProfileChangePasswordSchemaType) => {
    updatePasswordMutate(data, {
      onSuccess: () => {
        toast({
          description: '비밀번호 수정 완료',
        });
        setIsOpen(false);
      },
      onError: (error) => {
        const isApiError = error instanceof APIError;
        if (isApiError && error.code === 'WRONG_PASSWORD') {
          setError('currentPassword', { message: error.message });
          return;
        }
        toast({
          description: isApiError ? error.message : '비밀번호 수정 실패',
        });
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setIsOpen}
    >
      <DialogContent
        className="w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogTitle className="typo-title-24-bold-tight text-center">
          비밀번호 변경
        </DialogTitle>
        <div className="typo-body-14-regular-150-tight text-slate-600 text-center">
          변경할 비밀번호를 입력해주세요
        </div>

        <div className="flex flex-col gap-[10px] mt-[14px]">
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit(onSubmit)(e);
              }}
            >
              <FormField
                name="currentPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <FormItem className="mb-[10px]">
                    <FormLabel className="typo-body-14-medium-100-tight">
                      현재 비밀번호
                    </FormLabel>
                    <FormControl className="flex mt-[10px] w-full h-[46px]">
                      <div className="relative">
                        <Input
                          error={!!fieldState.error}
                          type={isPasswordVisible ? 'text' : 'password'}
                          className="pr-[40px]"
                          placeholder="비밀번호를 입력해 주세요"
                          {...field}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 비밀번호 입력 */}
              <FormField
                name="newPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <FormItem className="mb-[10px]">
                    <FormLabel className="typo-body-14-medium-100-tight">
                      새 비밀번호
                    </FormLabel>
                    <FormControl className="flex mt-[10px] w-full h-[46px]">
                      <div className="relative">
                        <Input
                          error={!!fieldState.error}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger('newPassword-check');
                          }}
                          type={isPasswordVisible ? 'text' : 'password'}
                          className="pr-[40px]"
                          placeholder="비밀번호를 입력해 주세요"
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
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              {/* 비밀번호 확인 */}
              <FormField
                name="newPassword-check"
                control={control}
                render={({ field, fieldState }) => (
                  <FormItem className="mb-[244px]">
                    <FormControl className="flex mt-[10px] w-full h-[46px]">
                      <div className="relative">
                        <Input
                          error={!!fieldState.error}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger('newPassword');
                          }}
                          type={isPasswordCheckVisible ? 'text' : 'password'}
                          className="pr-[40px]"
                          placeholder="비밀번호를 한번 더 입력해 주세요"
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
              {/* 제출 버튼 */}
              <Button
                type="submit"
                className="w-full typo-body-16-medium-100-tight mt-[30px]"
                size="2xl"
              >
                확인
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileResetPasswordDialog;
