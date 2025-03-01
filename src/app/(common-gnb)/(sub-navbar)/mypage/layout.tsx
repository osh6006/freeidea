import { PropsWithChildren } from 'react';

import { MyPageSideNav } from '@/components/navbar/mypage-sidenav';
import { metadataMap } from '@/lib/metadata';

export const metadata = metadataMap.mypage;

export default function MayPageLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative w-[1200px] mx-auto flex gap-0">
      <MyPageSideNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
