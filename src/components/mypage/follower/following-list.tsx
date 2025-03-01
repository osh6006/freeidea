'use client';

import Empty from '@/components/ui/empty';
import { useFollowingListQuery } from '@/service/mypage/use-service';

import CardList from './card-list';

const FollowingList = () => {
  const {
    data: followingData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useFollowingListQuery();

  if (isLoading) return null;
  if (!followingData) return null;

  return followingData.flattenList.length === 0 ? (
    <Empty>팔로잉한 사람이 없어요</Empty>
  ) : (
    <CardList
      totalCount={followingData.pages.at(-1)?.count || 0}
      list={followingData.flattenList}
      onScrollEnd={() => {
        if (hasNextPage || !isFetchingNextPage) fetchNextPage();
      }}
    />
  );
};

export default FollowingList;
