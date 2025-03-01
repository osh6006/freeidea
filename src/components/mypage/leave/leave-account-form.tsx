'use client';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PATH } from '@/constants/path';
import { useLeaveAccountMutation } from '@/service/mypage/use-service';

interface FormData {
  confirmChecked: boolean;
  reasons: string[];
  otherReason: string;
}

const reasonsList = [
  '이용빈도 낮음',
  '재가입',
  '콘텐츠/제품정보/상품 부족',
  '개인정보보호',
  '회원특혜/쇼핑혜택 부족',
  '기타',
];

export default function LeaveAccountForm() {
  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      confirmChecked: false,
      reasons: [],
      otherReason: '',
    },
  });
  const router = useRouter();
  const { mutate: leaveAccountMutate } = useLeaveAccountMutation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestBody, setRequestBody] = useState({ leaveReason: '' });

  const onSubmit = (data: FormData) => {
    const leaveReason =
      data.reasons.includes('기타') && data.otherReason
        ? [
            ...data.reasons.filter((reason) => reason !== '기타'),
            data.otherReason,
          ].join(', ')
        : data.reasons.join(', ');

    const newRequestBody = {
      leaveReason,
    };

    setRequestBody(newRequestBody);

    setDialogOpen(true);
  };

  const confirmChecked = watch('confirmChecked');
  const reasons = watch('reasons');
  const showOtherReasonInput = reasons.includes('기타');

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    leaveAccountMutate(requestBody.leaveReason, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  return (
    <>
      <form
        className="flex flex-col gap-[40px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="confirmChecked"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-[10px]">
              <Checkbox
                className="w-[20px] h-[20px]"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
              <span className="typo-body-14-bold-100-tight">
                위 내용을 모두 확인했습니다.
              </span>
            </label>
          )}
        />

        <div className="flex flex-col gap-[20px]">
          <h3 className="typo-title-20-bold-100-tight">
            프리디어 회원을 탈퇴하시려는 이유가 무엇인가요?
          </h3>
          <Controller
            name="reasons"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-[12px]">
                {reasonsList.map((reason) => (
                  <label
                    key={reason}
                    className="flex items-center gap-[6px]"
                  >
                    <Checkbox
                      checked={field.value.includes(reason)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, reason]
                          : field.value.filter((v) => v !== reason);
                        field.onChange(newValue);
                      }}
                    />
                    <span className="typo-body-14-regular-150-tight text-slate-600">
                      {reason}
                    </span>
                  </label>
                ))}
                {showOtherReasonInput && (
                  <Controller
                    name="otherReason"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="탈퇴 의견을 적어주세요"
                          maxLength={100}
                          className="w-full h-[60px] px-[10px] border border-slate-200 rounded-[2px]"
                        />
                        <div className="absolute right-[10px] bottom-1 typo-body-14-regular-150-tight text-slate-500">
                          {field.value.length}/100
                        </div>
                      </div>
                    )}
                  />
                )}
              </div>
            )}
          />
        </div>

        <Button
          size="2xl"
          className="w-[400px]"
          type="submit"
          variant={
            confirmChecked &&
            reasons.length > 0 &&
            (!showOtherReasonInput || watch('otherReason'))
              ? 'accent'
              : 'outline'
          }
          disabled={
            !confirmChecked ||
            reasons.length === 0 ||
            (showOtherReasonInput && !watch('otherReason'))
          }
        >
          탈퇴하기
        </Button>
      </form>

      {/* 다이얼로그 */}
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className="flex flex-col gap-[20px] w-[380px]">
          <DialogHeader>
            <DialogTitle className="text-start">
              회원 탈퇴 신청을 하시겠습니까?
            </DialogTitle>
            <DialogDescription className="text-start">
              회원 탈퇴 신청 시 회원님의 계정이 삭제됩니다.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-[8px] mt-[20px]">
            <Button
              size="md"
              variant="outline"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              size="md"
              variant="accent"
              onClick={handleConfirm}
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
