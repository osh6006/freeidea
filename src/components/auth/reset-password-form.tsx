'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PATH } from '@/constants/path';
import { useToggle } from '@/hooks/use-toggle';
import {
  forgotResetPasswordSchema,
  forgotResetPasswordSchemaType,
} from '@/lib/zod/auth/forgot-schema';
import { useResetUserPasswordMutation } from '@/service/auth/use-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from '@untitled-ui/icons-react';

import { useGlobalDialogStore } from '../provider/global-dialog/store';

interface PassWordData {
  password: string;
  'password-check': string;
}

const ResetPasswordForm = () => {
  const { setIsLoginDialogOpen } = useGlobalDialogStore();
  const form = useForm<forgotResetPasswordSchemaType>({
    resolver: zodResolver(forgotResetPasswordSchema),
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      'password-check': '',
      password: '',
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const { mutate: resetUserPassword, isSuccess: isResetUserPassword } =
    useResetUserPasswordMutation();
  const [isPasswordVisible, togglePasswordVisibility] = useToggle(false);
  const [isPasswordCheckVisible, togglePasswordCheckVisibility] =
    useToggle(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { control, handleSubmit, trigger } = form;

  const onSubmit: SubmitHandler<PassWordData> = (values) => {
    if (!token) {
      console.error('토큰 값이 없습니다.');
      return;
    }
    resetUserPassword({
      newPassword: values['password-check'],
      token: token,
    });
    setIsOpen(true);
  };

  const errors = Object.values(form.formState.errors.password?.types || {});
  console.log(errors);

  return (
    <div>
      <div className="flex justify-center w-[560px] border-[1px] border-slate-200 rounded-[20px] px-[100px] py-[60px]">
        <div className="flex flex-col w-[360px] items-center gap-[40px]">
          <Image
            src="/logo-typo.png"
            width={190}
            height={50}
            alt="freedea"
          />
          <div className="flex flex-col w-full gap-[30px]">
            <div className="flex flex-col items-center gap-[20px]">
              <div className="text-[20px] text-slate-800 font-[700]">
                비밀번호 재설정
              </div>
              <div className="flex flex-col justify-center items-center  text-[14px] text-slate-500 font-[400]">
                <div className="w-fit">가입 시 등록했던 이메일로 </div>
                <div>비밀번호를 변경할 수 있는 메일을 보내드릴게요.</div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* 비밀번호 입력 */}
                  <FormField
                    control={control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <FormItem className="mb-[10px]">
                        <FormLabel className="text-[14px] font-[500] text-[#222222]">
                          비밀번호
                        </FormLabel>
                        <FormControl className="flex mt-[10px] w-full h-[46px]">
                          <div className="relative">
                            <Input
                              error={!!fieldState.error}
                              type={isPasswordVisible ? 'text' : 'password'}
                              className="pr-[40px]"
                              placeholder="비밀번호를 입력해 주세요"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                trigger('password-check');
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
                    )}
                  />
                  {/* 비밀번호 확인 */}
                  <FormField
                    control={control}
                    name="password-check"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormControl className="flex w-full h-[46px]">
                          <div className="relative">
                            <Input
                              error={!!fieldState.error}
                              type={
                                isPasswordCheckVisible ? 'text' : 'password'
                              }
                              className="pr-[40px]"
                              placeholder="비밀번호를 한번 더 입력해 주세요"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                trigger('password');
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
                  <Dialog
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="w-full h-[54px] mt-[40px] rounded-[4px] text-[16px] font-[500]"
                        type="submit"
                        disabled={!form.formState.isValid}
                      >
                        비밀번호 재설정
                      </Button>
                    </DialogTrigger>
                    {isResetUserPassword && (
                      <DialogContent className="w-[380px] p-[24px] md:rounded-[16px] rounded-[16px] h-[211px]">
                        <DialogTitle className="hidden">
                          ResetPassword
                        </DialogTitle>
                        <div className="flex justify-center items-center flex-col gap-[20px]">
                          <div className="text-[24px] font-[700] text-slate-800">
                            비밀번호 재설정 완료
                          </div>
                          <div className="text-[14px] font-[400] text-slate-800">
                            비밀번호 재설정이 정상처리되었어요.
                          </div>
                          <div className="flex gap-[8px] mt-[20px]">
                            <DialogClose asChild>
                              <Button
                                asChild
                                className="w-[162px] h-[40px] hover:bg-slate-tint-5 bg-white rounded-[4px] border-[1px] border-slate-200 font-[500] text-[16px] text-slate-600"
                              >
                                <Link href={PATH.home}>나중에</Link>
                              </Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                asChild
                                onClick={() => setIsLoginDialogOpen(true)}
                                className="w-[162px] h-[40px] bg-[#FF96B5] text-white font-[500] rounded-[4px]"
                              >
                                <Link href={PATH.home}>로그인</Link>
                              </Button>
                            </DialogClose>
                          </div>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </form>
              </Form>
            </div>
          </div>
          <div className="flex w-full justify-center items-center text-slate-500 text-[16px] font-[500]">
            <Link href={PATH.home}>
              <div className="text-slate-500 text-[16px] font-[500] cursor-pointer underline underline-offset-2">
                다음에 변경하기
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
