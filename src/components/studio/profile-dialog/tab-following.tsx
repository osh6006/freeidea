import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CommonAvatar } from '@/components/ui/avatar';
import Spinner from '@/components/ui/spinner';
import { TabsContent } from '@/components/ui/tabs';
import { PATH } from '@/constants/path';
import { useStudioFollowInfoListQuery } from '@/service/studio/use-service';

const TabFollowing = () => {
  const { id }: { id: string } = useParams();
  const {
    data: followerList,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useStudioFollowInfoListQuery({
    studioId: id,
    type: 'following',
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  if (isLoading) return null;
  if (!followerList) return null;

  const { list } = followerList;

  return (
    <TabsContent value="following">
      {list.length > 0 && (
        <>
          <ul className="space-y-[10px]">
            {list.map(({ nickname, profileImageUrl, studioId }) => (
              <li key={studioId}>
                <Link href={PATH.studio(studioId)}>
                  <div className="flex items-center gap-x-[10px]">
                    <CommonAvatar
                      nickname={nickname}
                      src={profileImageUrl}
                      className="size-8 border"
                    />
                    <span>{nickname}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {isRefetching && (
        <div className="w-full flex items-center justify-center ">
          <Spinner />
        </div>
      )}
      <div ref={ref} />
    </TabsContent>
  );
};

export default TabFollowing;
