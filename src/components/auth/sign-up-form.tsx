'use client';

import { useState } from 'react';
import { FieldErrors, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { SignUpSchemaType, signUpSchema } from '@/lib/zod/auth/sign-in-schema';
import { useSubmitSignUpMutation } from '@/service/auth/use-service';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import SignCheckList from './sign-up-check-list';
import SignUpDialog from './sign-up-dialog';
import SignUpEmail from './sign-up-email';
import SignUpNickName from './sign-up-nickname';
import SignUpPassword from './sign-up-password';
import SignUpPhone from './sign-up-phone';
import SignUpReferrer from './sign-up-referrer';
import SignUpUserName from './sign-up-userName';

const SignUpForm = ({ defaultValues }: { defaultValues: SignUpSchemaType }) => {
  const { mutate: signupMutate } = useSubmitSignUpMutation();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues,
    criteriaMode: 'all',
  });
  const { toast } = useToast();

  const nickname = useWatch({
    control: form.control,
    name: 'nickname.value',
  });

  const [showDialog, setShowDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);

  const isCheckListError = (errors: FieldErrors<SignUpSchemaType>) => {
    return (
      !!errors.ageCheck || !!errors.serviceCheck || !!errors.indivisualCheck
    );
  };

  const onValid = async (values: SignUpSchemaType) => {
    const signUpData = {
      tempToken: values.tempToken,
      email: values.email.value,
      password: values.password.password,
      userName: values.name,
      recommendNickname: values.referrer ?? undefined,
      nickname: values.nickname.value,
      phoneNumber: values.phone,
      marketingAgreement: values.maketingCheck || false,
    };

    signupMutate(signUpData, { onSuccess: () => setShowDialog(true) });
  };

  const onInvalid = (errors: FieldErrors<SignUpSchemaType>) => {
    if (!form.getValues('isPhoneVerified')) {
      form.setError('phone', {
        type: 'manual',
        message: '휴대폰 인증이 필요합니다.',
      });
    }
    if (isCheckListError(errors)) {
      setErrorDialog(true);
      return;
    }

    toast({
      variant: 'destructive',
      description: '입력 값을 확인해주세요.',
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid, onInvalid)}
          className="w-[360px] mt-[40px]"
          autoComplete="off"
        >
          <SignUpUserName />
          <SignUpEmail />
          <SignUpNickName />
          <SignUpPassword />
          <SignUpPhone />
          <SignUpReferrer />
          <SignCheckList />

          <Button
            type="submit"
            className="w-full mt-[30px]"
            size="2xl"
          >
            가입하기
          </Button>
        </form>
      </Form>

      <SignUpDialog
        open={showDialog}
        nickname={nickname}
      />

      <Dialog
        open={errorDialog}
        onOpenChange={setErrorDialog}
      >
        <DialogContent className="flex flex-col gap-[20px] w-[380px]">
          <DialogHeader>
            <DialogTitle className="text-start">
              이용약관에 동의해주세요.
            </DialogTitle>
            <DialogDescription>
              필수 이용약관에 동의 해주시지 않으면 가입이 어렵습니다.
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              className="w-full mt-[20px]"
              variant="accent"
              onClick={() => setErrorDialog(false)}
            >
              확인
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpForm;
