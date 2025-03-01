import { useInView } from 'react-intersection-observer';

import TotalNumber from '@/components/common/total-number';
import { IFollow } from '@/types/mypage';

import FollowerCard from './follow-card';

const CardList = ({
  totalCount,
  list,
  onScrollEnd,
}: {
  totalCount: number;
  list: IFollow[];
  onScrollEnd: () => void;
}) => {
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) onScrollEnd?.();
    },
  });

  return (
    <>
      <TotalNumber
        number={totalCount}
        unit="명"
      />

      <ul className="grid grid-cols-3 mt-[20px] gap-[20px] mb-[220px]">
        {list?.map((following) => {
          const {
            studioId,
            userId,
            profileImageUrl,
            nickname,
            userLevel,
            isFollowing,
            portfolios,
          } = following;
          return (
            <li key={userId}>
              <FollowerCard
                studioId={studioId}
                userId={userId}
                isFollowing={isFollowing}
                profileImageUrl={profileImageUrl}
                nickname={nickname}
                userLevel={userLevel}
                portfolios={portfolios}
              />
            </li>
          );
        })}
        <div ref={ref} />
      </ul>
    </>
  );
};

export default CardList;
