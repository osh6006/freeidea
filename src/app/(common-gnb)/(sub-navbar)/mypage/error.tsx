'use client';

import { Button } from '@/components/ui/button';

export default function ErrorPage() {
  return (
    <div className="h-[300px] flex flex-col gap-4 items-center justify-center">
      알 수 없는 에러가 발생했어요.
      <Button>다시 시도하기</Button>
    </div>
  );
}
