import FollowerList from '@/components/mypage/follower/follower-list';
import FollowerTabBar from '@/components/mypage/follower/follower-tab-bar';
import FollowingList from '@/components/mypage/follower/following-list';
import { Separator } from '@/components/ui/separator';
import {
  myFollowerListOption,
  myFollowingListOption,
} from '@/service/mypage/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

export default async function FollowerPage({
  searchParams,
}: {
  searchParams: { tab: 'follower' | 'following' };
}) {
  const queryClient = new QueryClient();

  const tab = searchParams.tab ?? 'follower';

  if (tab === 'follower') {
    await queryClient.prefetchInfiniteQuery(myFollowerListOption({}));
  } else {
    await queryClient.prefetchInfiniteQuery(myFollowingListOption({}));
  }

  return (
    <div className="flex pl-[40px] flex-col mt-[40px]">
      <div className="flex flex-col gap-[16px]">
        <div className="typo-title-24-bold-tight">팔로워</div>
        <Separator />
      </div>
      <div className="mt-[20px]">
        <FollowerTabBar />
        <HydrationBoundary state={dehydrate(queryClient)}>
          {tab === 'follower' && <FollowerList />}
          {tab === 'following' && <FollowingList />}
        </HydrationBoundary>
      </div>
    </div>
  );
}
