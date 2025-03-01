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
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="h-screen flex justify-center items-center">
          <ErrorBox>
            <ErrorImage src={'/errors/unknown.png'} />
            <ErrorContent>
              <ErrorTitle>ERROR</ErrorTitle>
              <ErrorDescription>알 수 없는 에러가 발생했어요!</ErrorDescription>
              <ErrorButtonGroup>
                <Button asChild>
                  <Link href={PATH.home}>홈으로 가기</Link>
                </Button>
                <Button onClick={reset}>다시 시도하기</Button>
              </ErrorButtonGroup>
            </ErrorContent>
          </ErrorBox>
        </main>
      </body>
    </html>
  );
}
