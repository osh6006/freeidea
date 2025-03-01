'use client';

import { useEffect } from 'react';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { Icon } from '@/components/icon';
import { PATH } from '@/constants/path';
import { useLoginMutation } from '@/service/auth/use-service';

export default function OauthProcessing() {
  const { sns } = useParams<{
    sns: 'kakao' | 'twitter';
    token: string;
  }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { mutate: loginWithSns, isPending } = useLoginMutation(sns);

  useEffect(() => {
    const token = searchParams.get('token');
    const prevUrl = searchParams.get('previous-url');

    if (!token) return;
    loginWithSns(
      { token },
      {
        onSettled: () => {
          router.replace(prevUrl || PATH.home);
        },
      }
    );
  }, [loginWithSns, router, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      {isPending && <Icon.TosomLoading />}
    </div>
  );
}
