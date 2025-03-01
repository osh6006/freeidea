'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import SignUpReferrer from '@/components/auth/sign-up-referrer';
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
  KakaoSignUpSchemaType,
  kakaoSignUpSchema,
} from '@/lib/zod/auth/sign-in-schema';
import { useLoginMutation } from '@/service/auth/use-service';
import { zodResolver } from '@hookform/resolvers/zod';

const KakaoSignUpForm = ({
  searchParams: { token, nickname },
}: {
  searchParams: { token?: string; nickname?: string };
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<KakaoSignUpSchemaType>({
    resolver: zodResolver(kakaoSignUpSchema),
    mode: 'onChange',
  });

  const { mutate: kakaoLoginMutate } = useLoginMutation('kakao');
  const { toast } = useToast();

  const onValid = ({ referrer }: KakaoSignUpSchemaType) => {
    if (!token) throw new Error('Invalid token');
    kakaoLoginMutate(
      { token, recommendNockname: referrer },
      {
        onSuccess: () => setIsDialogOpen(true),
      }
    );
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
          <SignUpReferrer />

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

export default KakaoSignUpForm;
