'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import Link from 'next/link';

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
import { SECOND } from '@/constants/time';
import useTimer from '@/hooks/use-timer';
import APIError from '@/lib/api-error';
import { cn } from '@/lib/utils';
import {
  forgotEmailSchema,
  forgotEmailSchemaSchemaType,
} from '@/lib/zod/auth/forgot-schema';
import {
  useFindUserEmailMutation,
  useForgotSendAlimTalkMutation,
  useVerifyAlimCodeMutation,
} from '@/service/auth/use-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatDate } from 'date-fns';

import ResetEmail from './reset-email';

const ForgotEmailForm = () => {
  const form = useForm<forgotEmailSchemaSchemaType>({
    resolver: zodResolver(forgotEmailSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      code: '',
    },
  });
  const [foundEmail, setFoundEmail] = useState('');
  const [tempToken, setTempToken] = useState('');
  const { control, handleSubmit, getValues, setError } = form;

  const { time, startTimer, stopTimer } = useTimer(180 * SECOND);

  const { mutate: findUserEmail, isSuccess: isFindEmail } =
    useFindUserEmailMutation();
  const { mutate: sendAlimTalkMutate, isSuccess: isSendAlimTalkSuccess } =
    useForgotSendAlimTalkMutation();
  const { mutate: verifyAlimCodeMutate, isSuccess: isVerifyAlimCodeSuccess } =
    useVerifyAlimCodeMutation();

  const onSendAlimTalkClick = (phone: string) => {
    sendAlimTalkMutate(phone, {
      onSuccess: () => startTimer(),
      onError: (error) => {
        if (error instanceof APIError) {
          setError('phone', { message: error.message });
        }
      },
    });
  };

  const onVerifyCodeClick = () => {
    verifyAlimCodeMutate(
      {
        phoneNumber: getValues('phone'),
        verificationNumber: getValues('code'),
      },
      {
        onSuccess: ({ tempToken }) => {
          setTempToken(tempToken);
          stopTimer();
        },
        onError: (error) => {
          if (error instanceof APIError) {
            setError('code', { message: error.message });
          }
        },
      }
    );
  };

  const onSubmit = (data: forgotEmailSchemaSchemaType) => {
    findUserEmail(
      {
        userName: data.name,
        phoneNumber: data.phone,
        tempToken,
      },
      {
        onSuccess: ({ email }) => {
          setFoundEmail(email);
          startTimer();
        },
      }
    );
  };

  const isVerifyingCode = time > 0 && isSendAlimTalkSuccess;
  return (
    <div className="flex justify-center w-[560px] px-[100px] py-[60px] border-[1px] border-slate-200 rounded-[20px]">
      {isFindEmail ? (
        <ResetEmail email={foundEmail} />
      ) : (
        <div className="flex flex-col w-[360px] items-center gap-[40px]">
          <Image
            src="/logo-typo.png"
            width={190}
            height={50}
            alt="freedea"
          />
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-[20px] font-bold text-slate-800">
              이메일 찾기
            </h2>
            <p className="text-[14px] text-slate-500">
              가입 시 등록했던 메일을 찾아드릴게요.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-[360px] gap-[30px]"
            >
              <FormField
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="이름을 입력해주세요"
                        className={cn(
                          fieldState.error ? 'border-error bg-pink-50' : '',
                          'text-[14px] font-[400] px-[10px] py-[12px] mt-2'
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormField
                  control={control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>본인인증</FormLabel>
                      <FormControl>
                        <div className="flex items-center mt-[10px] gap-x-[10px]">
                          <Input
                            error={!!fieldState.error}
                            {...field}
                            disabled={isVerifyAlimCodeSuccess}
                            placeholder="휴대폰 번호를 입력해주세요"
                            className={
                              'text-[14px] font-[400] px-[10px] py-[12px]'
                            }
                          />
                          <Button
                            className="w-[100px]"
                            variant="outline"
                            type="button"
                            disabled={
                              !field.value ||
                              !!fieldState.error ||
                              isVerifyAlimCodeSuccess
                            }
                            onClick={() => onSendAlimTalkClick(field.value)}
                            size="lg"
                          >
                            {isVerifyingCode ? '재발송' : '인증'}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isSendAlimTalkSuccess && (
                  <FormField
                    control={control}
                    name="code"
                    render={({ field, fieldState }) => (
                      <FormItem className="mt-[10px]">
                        <FormControl>
                          <div className="flex items-center gap-x-[10px] m-0 p-0">
                            <div className="w-full relative ">
                              <Input
                                error={!!fieldState.error}
                                {...field}
                                placeholder="인증번호 6자리를 입력해 주세요"
                                disabled={isVerifyAlimCodeSuccess}
                              />
                              {isVerifyingCode && (
                                <div className="absolute text-error right-[18px] top-1/2 -translate-y-1/2 typo-body-14-medium-100-tight">
                                  <time>
                                    {formatDate(new Date(time), 'mm:ss')}
                                  </time>
                                </div>
                              )}
                            </div>
                            <Button
                              className="w-[100px]"
                              variant="outline"
                              type="button"
                              disabled={isVerifyAlimCodeSuccess}
                              onClick={onVerifyCodeClick}
                              size="lg"
                            >
                              확인
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage>
                          {isVerifyAlimCodeSuccess && (
                            <span className="text-success">
                              인증이 완료되었습니다.
                            </span>
                          )}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <Button
                className="w-[360px] h-[54px] mt-2"
                type="submit"
                disabled={!isVerifyAlimCodeSuccess}
              >
                이메일 찾기
              </Button>
            </form>
          </Form>
          <div className="flex justify-between w-full text-slate-500 text-[16px] font-medium">
            <Link href={PATH.forgotPassword}>비밀번호 찾기</Link>
            <Link href={PATH.home}>
              <span className="cursor-pointer underline underline-offset-1">
                메인으로 이동
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotEmailForm;
