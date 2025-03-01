import { useInView } from 'react-intersection-observer';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CommonAvatar } from '@/components/ui/avatar';
import Spinner from '@/components/ui/spinner';
import { TabsContent } from '@/components/ui/tabs';
import { PATH } from '@/constants/path';
import { useStudioFollowInfoListQuery } from '@/service/studio/use-service';

const TabFollower = () => {
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
    type: 'follower',
  });

  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  if (isLoading) return null;
  if (!followerList) return null;

  const { list } = followerList;

  return (
    <TabsContent value="follower">
      {list.length > 0 && (
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

export default TabFollower;
