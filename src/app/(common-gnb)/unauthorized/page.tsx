'use client';

import Link from 'next/link';

import {
  ErrorBox,
  ErrorButtonGroup,
  ErrorContent,
  ErrorDescription,
  ErrorImage,
  ErrorTitle,
} from '@/components/common/error-box';
import { useGlobalDialogStore } from '@/components/provider/global-dialog/store';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';

export default function UnauthorizedPage() {
  const { setIsLoginDialogOpen } = useGlobalDialogStore();

  return (
    <ErrorBox className="flex items-center justify-center flex-col w-dvw h-dvh pc-screen:flex-row">
      <ErrorImage src={'/errors/403.png'} />
      <ErrorContent className="flex items-center justify-center pc-screen:items-start">
        <ErrorTitle>403</ErrorTitle>
        <ErrorDescription>접근할 수 없는 페이지 입니다.</ErrorDescription>
        <ErrorButtonGroup>
          <Button>
            <Link href={PATH.home}>홈으로 가기</Link>
          </Button>
          <Button onClick={() => setIsLoginDialogOpen(true)}>로그인</Button>
        </ErrorButtonGroup>
      </ErrorContent>
    </ErrorBox>
  );
}
