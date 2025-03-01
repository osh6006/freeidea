'use client';

import Empty from '@/components/ui/empty';
import { useFollowerListQuery } from '@/service/mypage/use-service';

import CardList from './card-list';

const FollowerList = () => {
  const {
    data: followerData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useFollowerListQuery();

  if (!followerData) return null;

  const followerList = followerData.flattenList;

  return followerList.length === 0 ? (
    <Empty>팔로워가 없어요</Empty>
  ) : (
    <CardList
      totalCount={followerData.pages.at(-1)?.count || 0}
      list={followerList}
      onScrollEnd={() => {
        if (hasNextPage || !isFetchingNextPage) fetchNextPage();
      }}
    />
  );
};

export default FollowerList;
