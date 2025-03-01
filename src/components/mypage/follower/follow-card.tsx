import Image from 'next/image';
import Link from 'next/link';

import SeperatorDot from '@/components/common/seperator-dot';
import { CommonAvatar } from '@/components/ui/avatar';
import { CardThumbnail, CardThumbnailImage } from '@/components/ui/card';
import Tag from '@/components/ui/tag';
import { BLUR_IMG } from '@/constants/common';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { useFollowAuthorMutation } from '@/service/studio/use-service';
import { Level } from '@/types/auth';
import { IFollow } from '@/types/mypage';

interface FollowCardProps extends IFollow {}

const FollowCard = ({
  isFollowing,
  studioId,
  userId,
  profileImageUrl,
  nickname,
  userLevel,
  portfolios,
}: FollowCardProps) => {
  const { mutate: followAuthor } = useFollowAuthorMutation();
  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const handleFollowToggle = () => {
    const prevData = setInfinitePageQueriesData<IFollow>(
      {
        queryKey: [],
      },
      {
        target: (item) => item.userId === userId,
        updater: (prev) => ({
          ...prev,
          isFollowing: !prev.isFollowing,
        }),
      }
    );

    followAuthor(
      {
        studioId,
        isFollowing: !isFollowing,
      },
      {
        onError: () => rollbackQueriesData(prevData),
      }
    );
  };

  const fixedPortfolios = portfolios.slice(0, 3);
  const emptySlots = 3 - fixedPortfolios.length;
  const filledPortfolios = [
    ...fixedPortfolios,
    ...Array(emptySlots).fill(null),
  ];

  const LEVEL_TAG: Record<
    Level,
    { color: 'gray' | 'yellow' | 'green' | 'blue' | 'pink'; label: string }
  > = {
    GUEST: {
      color: 'gray',
      label: '손님',
    },
    USER: {
      color: 'yellow',
      label: '회원',
    },
    AUTHOR: {
      color: 'green',
      label: '작가',
    },
    ADMIN: {
      color: 'blue',
      label: '관리자',
    },
    MASTER: {
      color: 'pink',
      label: '마스터',
    },
  } as const;

  return (
    <div className="flex justify-center w-[296px] h-[310px] p-[20px] bg-slate-50 rounded-[6px]">
      <div className="flex flex-col items-center gap-[20px]">
        <Link href={PATH.studio(studioId)}>
          <CommonAvatar
            nickname={nickname}
            src={profileImageUrl}
            className="w-[96px] h-[96px]"
          />
        </Link>
        <div>
          <div className="flex items-center flex-col gap-[10px]">
            <div className="flex items-center gap-[4px]">
              <div className="typo-body-14-bold-100-tight">{nickname}</div>
              <SeperatorDot />
              <button
                onClick={handleFollowToggle}
                className={`typo-body-14-bold-100-tight cursor-pointer ${
                  isFollowing ? 'text-slate-300' : 'text-pink-500'
                }`}
              >
                {isFollowing ? '팔로잉' : '팔로우'}
              </button>
            </div>
            <Tag
              size="sm"
              variant={LEVEL_TAG[userLevel].color}
              className="typo-body-14-medium-100-tight rounded-full"
            >
              {LEVEL_TAG[userLevel].label}
            </Tag>
          </div>
        </div>
        <div>
          <ul className="flex gap-[5px]">
            {filledPortfolios.map((portfolio, i) =>
              portfolio ? (
                <li
                  key={portfolio.portfolioId}
                  className="size-[82px] rounded-[4px] relative"
                >
                  <CardThumbnail>
                    <Link href={PATH.portfolioDetail(portfolio.portfolioId)}>
                      <CardThumbnailImage
                        src={portfolio.portfolioImageUrl}
                        className="object-cover"
                        alt={'portfolio' + i}
                        fill
                        placeholder="blur"
                        blurDataURL={BLUR_IMG}
                      />
                    </Link>
                  </CardThumbnail>
                </li>
              ) : (
                <li
                  key={`empty-${i}`}
                  className="size-[82px] rounded-[4px] bg-slate-200"
                />
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FollowCard;
