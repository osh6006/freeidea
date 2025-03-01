import Link from 'next/link';

import { UntitledIcon } from '@/components/icon';
import MembershipFlatCard from '@/components/membership/membership-flat-card';
import ProfileEmailInputs from '@/components/mypage/profile/profile-email';
import ProfileForm from '@/components/mypage/profile/profile-form';
import ProfileImage from '@/components/mypage/profile/profile-image';
import ProfileIntroduction from '@/components/mypage/profile/profile-introduction';
import ProfileNickName from '@/components/mypage/profile/profile-nickname';
import ProfilePassword from '@/components/mypage/profile/profile-password';
import { Separator } from '@/components/ui/separator';
import { PATH } from '@/constants/path';
import {
  myPageProfileQueryOption,
} from '@/service/mypage/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(myPageProfileQueryOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex pl-[40px] pt-[40px] flex-col gap-[20px] pb-[200px]">
        <div className="flex flex-col gap-[16px]">
          <div className="typo-title-24-bold-tight">프로필 관리</div>
          <Separator />
        </div>
        <ProfileForm>
          <ProfileImage />
          <MembershipFlatCard />
          <ProfileNickName />
          <ProfileIntroduction />
          <ProfileEmailInputs />
          <ProfilePassword />
        </ProfileForm>
        <Link
          href={`${PATH.myProfile}/leave`}
          className="flex items-center gap-[10px] typo-body-14-medium-100-tight"
        >
          <span>탈퇴하기</span>
          <UntitledIcon.ChevronRight />
        </Link>
      </main>
    </HydrationBoundary>
  );
}
