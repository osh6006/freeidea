'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import SignUpCheckList from '@/components/auth/sign-up-check-list';
import SignUpEmail from '@/components/auth/sign-up-email';
import SignUpPhone from '@/components/auth/sign-up-phone';
import SignUpReferrer from '@/components/auth/sign-up-referrer';
import SignUpUserName from '@/components/auth/sign-up-userName';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { PATH } from '@/constants/path';
import { useToast } from '@/hooks/use-toast';
import {
  TwitterSignUpSchemaType,
  twitterSignUpSchema,
} from '@/lib/zod/auth/sign-in-schema';
import { useLoginMutation } from '@/service/auth/use-service';
import { zodResolver } from '@hookform/resolvers/zod';

const TwitterSignUpForm = ({
  searchParams: { token, nickname },
}: {
  searchParams: { token?: string; nickname?: string };
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<TwitterSignUpSchemaType>({
    resolver: zodResolver(twitterSignUpSchema),
    mode: 'onChange',
  });

  const { mutate: loginMutate } = useLoginMutation('twitter');
  const { toast } = useToast();

  const onValid = ({
    tempToken,
    email,
    name,
    referrer,
    phone,
    maketingCheck,
  }: TwitterSignUpSchemaType) => {
    if (!token) throw new Error('Invalid token');

    const signUpData = {
      token,
      tempToken: tempToken,
      email: email.value,
      userName: name,
      recommendNickname: referrer ?? undefined,
      phoneNumber: phone,
      marketingAgreement: maketingCheck || false,
    };

    loginMutate(signUpData, {
      onSuccess: () => setIsDialogOpen(true),
    });
  };

  const onInvalid = () => {
    toast({ variant: 'destructive', description: '입력 값을 확인해주세요.' });
    return;
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid, onInvalid)}
          className="w-[360px] mt-[40px]"
        >
          <SignUpUserName />
          <SignUpEmail />
          <SignUpPhone />
          <SignUpReferrer />
          <SignUpCheckList />
          <Button
            type="submit"
            className="w-full mt-[30px]"
            size="2xl"
          >
            가입하기
          </Button>
        </form>
      </Form>
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{nickname}님, 환영합니다!</DialogTitle>
            <DialogDescription>
              이제 프리디어의 다양한 서비스를 경험해보세요!
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                size="2xl"
                className="w-full"
                asChild
              >
                <Link href={PATH.home}>확인</Link>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TwitterSignUpForm;
