'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';

import ResetPassword from '@/components/auth/reset-password';
import { Button } from '@/components/ui/button';
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
import APIError from '@/lib/api-error';
import { forgotPasswordSchema } from '@/lib/zod/auth/forgot-schema';
import { useFindUserPasswordMutation } from '@/service/auth/use-service';
import { zodResolver } from '@hookform/resolvers/zod';

interface IPhoneNumberData {
  email: string;
}

const ForgotPasswordForm = () => {
  const form = useForm<IPhoneNumberData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    criteriaMode: 'all',
  });

  const { mutate: findUserPassword, isSuccess: isFindUserPassword } =
    useFindUserPasswordMutation();

  const { control, handleSubmit, getValues, setError } = form;

  const onSubmit: SubmitHandler<IPhoneNumberData> = (data) => {
    findUserPassword(data.email, {
      onError: (error) => {
        if (!(error instanceof APIError)) throw error;
        setError('email', { message: error.message });
      },
    });
  };

  return (
    <>
      <div className="flex justify-center w-[560px px-[100px] py-[60px] border-[1px] border-slate-200 rounded-[20px]">
        {!isFindUserPassword ? (
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
                  비밀번호 찾기
                </div>
                <div className="flex flex-col justify-center items-center  text-[14px] text-slate-500 font-[400]">
                  <div className="w-fit">가입 시 등록했던 이메일로 </div>
                  <div>비밀번호를 변경할 수 있는 메일을 보내드릴게요.</div>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <Form {...form}>
                  <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-[14px] font-[500] text-[#222222]">
                            이메일
                          </FormLabel>
                          <div className="mt-[10px] gap-[10px]">
                            <FormControl className="flex w-full h-[46px]">
                              <Input
                                error={!!fieldState.error}
                                {...field}
                                className="text-[14px] font-[400] px-[10px] py-[12px]"
                                placeholder="이메일 주소를 입력해주세요"
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="w-full h-[54px] mt-[40px] rounded-[4px] text-[16px] font-[500]"
                      type="submit"
                      disabled={!form.formState.isValid || isFindUserPassword}
                    >
                      비밀번호 재설정
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
            <div className="flex w-full justify-between text-slate-500 text-[16px] font-[500]">
              <Link href={PATH.forgotEmail}>이메일 찾기</Link>
              <Link href={PATH.home}>
                <div className="text-slate-500 text-[16px] font-[500] cursor-pointer underline underline-offset-1">
                  메인으로 이동
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <ResetPassword email={getValues('email')} />
        )}
      </div>
    </>
  );
};
export default ForgotPasswordForm;
