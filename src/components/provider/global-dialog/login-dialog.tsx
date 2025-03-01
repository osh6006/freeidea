'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { LoginSchemaType, loginSchema } from '@/lib/zod/auth/login-schema';
import { useLoginMutation } from '@/service/auth/use-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from '@untitled-ui/icons-react';

import { Checkbox } from '../../ui/checkbox';
import { useGlobalDialogStore } from './store';

const LoginDialog = () => {
  const { isLoginDialogOpen, setIsLoginDialogOpen } = useGlobalDialogStore();

  return (
    <Dialog
      open={isLoginDialogOpen}
      onOpenChange={setIsLoginDialogOpen}
    >
      <DialogContent className="flex p-0 border-none md:rounded-[10px] rounded-[10px] gap-0 items-center justify-center max-w-[920px] h-[595px]">
        <DialogHeader>
          <DialogTitle className="hidden">login</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col flex-1 h-full md:rounded-l-[10px] justify-between rounded-l-[10px] px-[50px] py-[40px] bg-[#FF96B5]">
          <div className="flex flex-col gap-[20px]">
            <div className="text-[40px] font-[700] text-white break-words">
              환영합니다. <br />
              프리디어입니다.
            </div>
            <div className="text-[16px] font-[500] text-white">
              나의 아트, 나의 공간
            </div>
          </div>
          <div className="pl-[7px] pb-[9px]">
            <Image
              src="/logo-typo-white.png"
              width={136}
              height={33}
              alt="freedea"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 h-full md:rounded-r-[10px] gap-[30px] rounded-r-[10px] px-[50px] py-[40px] bg-white">
          <LoginForm onLoginSuccess={() => setIsLoginDialogOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface ILoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm = ({ onLoginSuccess }: ILoginFormProps) => {
  const { mutate, error } = useLoginMutation('email');

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordVisible, togglePasswordVisibility] = useToggle(false);

  const [isContinueLogin, setIsContinueLogin] = useState<boolean>(true);

  const handleValueChange = (value: boolean) => {
    setIsContinueLogin(value);
  };

  const onSubmit: SubmitHandler<LoginSchemaType> = ({ email, password }) => {
    mutate(
      { email, password },
      {
        onSuccess: onLoginSuccess,
      }
    );
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[20px]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-[14px] mb-[10px] font-[500] text-[#222222]">
                  이메일
                </FormLabel>
                <FormControl>
                  <Input
                    error={!!fieldState.error}
                    placeholder="이메일을 적어주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-[14px] mb-[10px] font-[500] text-[#222222]">
                  비밀번호
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      error={!!fieldState.error}
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="비밀번호를 적어주세요"
                      {...field}
                    />

                    <span
                      className="absolute right-[18px] top-[50%] transform -translate-y-[50%] cursor-pointer"
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
          <div className="flex justify-between">
            <div className="flex items-center gap-[6px]">
              <Checkbox
                onCheckedChange={handleValueChange}
                checked={isContinueLogin}
              />
              <label className="text-[14px] font-[400] text-slate-700">
                로그인 유지
              </label>
            </div>
            <div className="flex text-[14px] font-[400] text-slate-700 cursor-pointer">
              <DialogClose asChild>
                <Link
                  href={PATH.forgotEmail}
                  className="flex items-center gap-[6px]"
                >
                  이메일<span className="w-[1px] h-[8px] bg-slate-300"></span>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link
                  href={PATH.forgotPassword}
                  className="flex items-center pl-[6px]"
                >
                  비밀번호 찾기
                </Link>
              </DialogClose>
            </div>
          </div>

          {error && (
            <div className="text-error typo-caption-12-regular-100">
              {error.message}
            </div>
          )}

          <Button
            type="submit"
            size="2xl"
          >
            로그인
          </Button>
        </form>
      </Form>
      <div className="flex flex-col justify-between h-[188px]">
        <SnsLoginButtonSection />
        <DialogClose asChild>
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href={PATH.signUp}>회원가입</Link>
          </Button>
        </DialogClose>
      </div>
    </>
  );
};

function SnsLoginButtonSection() {
  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      state: crypto.randomUUID(),
    });
  };

  return (
    <div className="flex flex-col gap-[10px] items-center">
      <div className="text-[14px] font-[500] text-slate-500">
        SNS로 간편하게 시작하기
      </div>
      <div className="flex gap-[30px]">
        <div className="flex flex-col items-center gap-[10px] cursor-pointer">
          <DialogClose
            className="flex justify-center items-center w-[50px] h-[50px] bg-[#FEE500] rounded-full"
            onClick={handleKakaoLogin}
          >
            <Image
              src="/kakaoLogo.png"
              width={33}
              height={33}
              alt="kakaoLogo"
            />
          </DialogClose>
          <span className="typo-body-14-medium-100-tight text-slate-300">
            카카오
          </span>
        </div>
        <DialogClose
          className="flex flex-col items-center gap-[10px]"
          asChild
        >
          <a
            href={`${process.env.NEXT_PUBLIC_SERVER_URL}/oauth/twitter/authorize`}
          >
            <div className="flex justify-center items-center w-[50px] h-[50px] bg-[#000000] rounded-full">
              <Image
                src="/xLogo.png"
                width={22}
                height={20}
                alt="xLogo"
              />
            </div>
            <span className="typo-body-14-medium-100-tight text-slate-300">
              트위터X
            </span>
          </a>
        </DialogClose>
      </div>
    </div>
  );
}

export default LoginDialog;
