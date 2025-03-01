'use client';

import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Link from 'next/link';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { EXTERNAL_PATH } from '@/constants/path';
import { SignUpSchemaType } from '@/lib/zod/auth/sign-in-schema';

import { Checkbox } from '../ui/checkbox';

const SignUpCheckList = () => {
  const { control, setValue } = useFormContext<SignUpSchemaType>();

  const handleAllCheckboxChange = (checked: boolean) => {
    setValue('ageCheck', checked);
    setValue('serviceCheck', checked);
    setValue('indivisualCheck', checked);
    setValue('maketingCheck', checked);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mt-[30px]">
        <FormField
          control={control}
          name="allCheck"
          render={({ field }) => (
            <FormItem className="flex gap-[10px]">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    handleAllCheckboxChange(checked as boolean);
                  }}
                  className="size-[20px]"
                />
              </FormControl>

              <FormLabel className="typo-body-14-bold-100-tight">
                전체 동의
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
      <div className="bg-slate-50 py-[20px] space-y-[12px] px-[30px] mt-[10px] rounded-[10px]">
        <FormField
          control={control}
          name="ageCheck"
          render={({ field }) => (
            <FormItem className="flex items-center gap-x-3">
              <FormControl className="h-full">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="size-4 "
                />
              </FormControl>
              <div className="space-y-1 leading-[21px] flex w-full justify-between items-center text-[15px] font-bold tracking-[-2.5%]">
                <FormLabel className="text-slate-600 font-normal">
                  만 14세 이상입니다.
                  <strong className="text-slate-600 font-bold"> (필수)</strong>
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="serviceCheck"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="size-4 "
                />
              </FormControl>
              <div className="space-y-1 leading-[21px] flex w-full justify-between items-center text-[15px] font-bold tracking-[-2.5%]">
                <FormLabel className="text-slate-600 font-normal">
                  서비스 이용 약관에 동의합니다.
                  <strong className="text-slate-600 font-bold"> (필수)</strong>
                </FormLabel>
                <Link
                  href={EXTERNAL_PATH.termsOfService}
                  className="underline text-slate-600 font-normal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  보기
                </Link>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="indivisualCheck"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="size-4 "
                />
              </FormControl>
              <div className="space-y-1 leading-[21px] flex w-full justify-between items-center text-[15px] font-bold tracking-[-2.5%]">
                <FormLabel className="text-slate-600 font-normal">
                  개인정보 수집 · 이용에 동의합니다.
                  <strong className="text-slate-600 font-bold"> (필수)</strong>
                </FormLabel>
                <Link
                  href={EXTERNAL_PATH.privacyPolicy}
                  className="underline text-slate-600 font-normal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  보기
                </Link>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="maketingCheck"
          render={({ field }) => (
            <FormItem className="flex items-start space-x-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  className="size-4 "
                />
              </FormControl>
              <div className="space-y-1 leading-[21px] flex w-full justify-between items-start text-[15px] font-bold tracking-[-2.5%]">
                <FormLabel className="text-slate-600 font-normal whitespace-pre-line w-[232px]">
                  마케팅 수신 · 홍보 목적의 개인정보 수집 및 이용에 동의합니다.
                  (선택)
                </FormLabel>
                <Link
                  href={EXTERNAL_PATH.marketingConsent}
                  className="underline text-slate-600 font-normal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  보기
                </Link>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default SignUpCheckList;
