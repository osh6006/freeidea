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

export default function NotFound() {
  return (
    <ErrorBox className="flex items-center justify-center flex-col w-dvw h-dvh pc-screen:flex-row">
      <ErrorImage src={'/errors/404.png'} />
      <ErrorContent className="flex items-center justify-center pc-screen:items-start">
        <ErrorTitle>404</ErrorTitle>
        <ErrorDescription>해당 페이지를 찾을 수 없어요.</ErrorDescription>
        <ErrorButtonGroup>
          <Button asChild>
            <Link href={PATH.home}>홈으로 가기</Link>
          </Button>
        </ErrorButtonGroup>
      </ErrorContent>
    </ErrorBox>
  );
}
