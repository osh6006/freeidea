'use client';

import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { cn, formatSocialNumber } from '@/lib/utils';
import { feedQueryKey } from '@/service/feed/query-option';
import {
  useToggleFeedLikeMutation,
  useToggleFeedPangLikeMutation,
  useToggleFeedScrapMutation,
} from '@/service/feed/use-service';
import { loungeFeedQueryKey } from '@/service/lounge/query-option';
import { useMyMembership } from '@/service/mypage/use-service';
import { IFeedDeatil } from '@/types/feed';

import { SecureButton, SecureLink } from '../common/secure-button';
import { Icon, UntitledIcon } from '../icon';
import { useGlobalDialogStore } from '../provider/global-dialog/store';

const BUTTON_STYLE = 'flex items-center gap-x-[6px] ';

interface SocialActionButtonsProps {
  feedId: string;
  contents: string;
  isLiked: boolean;
  isScrapping: boolean;
  isMembershipLiked: boolean;
  likes: number;
  scraps: number;
  comments: number;
  membershipLikes: number;
}

const SocialActionButtons = ({
  feedId,
  comments,
  contents,
  isLiked,
  isMembershipLiked,
  isScrapping,
  likes,
  membershipLikes,
  scraps,
}: SocialActionButtonsProps) => {
  const {
    setQueriesData,
    setInfinitePageQueriesData,
    rollbackQueriesDataList,
  } = useOptimisticUpdate();
  const { setIsUseMembershipDialogOpen } = useGlobalDialogStore();

  const { mutate: pangLikeMutation, isPending: isPangPending } =
    useToggleFeedPangLikeMutation();
  const { mutate: likeMutation, isPending: isLikePending } =
    useToggleFeedLikeMutation();
  const { mutate: scrapMutation, isPending: isScrapPending } =
    useToggleFeedScrapMutation();

  const { data: membershipData } = useMyMembership();

  const handlePangLikeMutation = () => {
    if (membershipData?.membershipType === 'FREE') {
      setIsUseMembershipDialogOpen(true);
      return;
    }

    const previousData = setQueriesData<IFeedDeatil>(
      {
        queryKey: feedQueryKey.detail(feedId),
      },
      (oldData) => ({
        ...oldData,
        isMembershipLiked,
        membershipLikes: !isMembershipLiked
          ? oldData.membershipLikes + 1
          : oldData.membershipLikes - 1,
      })
    );

    const previousInfiniteQueryData = setInfinitePageQueriesData<IFeedDeatil>(
      {
        queryKey: loungeFeedQueryKey.lists(),
      },
      {
        target: (item) => item.feedId === feedId,
        updater: (item) => ({
          ...item,
          isMembershipLiked: !isMembershipLiked,
          membershipLikes: !isMembershipLiked
            ? item.membershipLikes + 1
            : item.membershipLikes - 1,
        }),
      }
    );

    pangLikeMutation(
      {
        feedId,
        isPangLike: !isMembershipLiked,
      },
      {
        onError() {
          rollbackQueriesDataList([previousData, previousInfiniteQueryData]);
        },
      }
    );
  };

  const handleLikeMutation = () => {
    const previousData = setQueriesData<IFeedDeatil>(
      {
        queryKey: feedQueryKey.details(),
      },
      (oldData) => ({
        ...oldData,
        isLiked: !isLiked,
        likes: !isLiked ? oldData.likes + 1 : oldData.likes - 1,
      })
    );

    const previousInfiniteQueryData = setInfinitePageQueriesData<IFeedDeatil>(
      {
        queryKey: loungeFeedQueryKey.lists(),
      },
      {
        target: (item) => item.feedId === feedId,
        updater: (item) => ({
          ...item,
          isLiked: !isLiked,
          likes: !isLiked ? item.likes + 1 : item.likes - 1,
        }),
      }
    );

    likeMutation(
      {
        feedId,
        isLike: !isLiked,
      },
      {
        onError: () => {
          rollbackQueriesDataList([previousData, previousInfiniteQueryData]);
        },
      }
    );
  };

  const handleScrapMutation = () => {
    const previousData = setQueriesData<IFeedDeatil>(
      {
        queryKey: feedQueryKey.detail(feedId),
      },
      (oldData) => ({
        ...oldData,
        isScrapping: !isScrapping,
        scraps: !isScrapping ? oldData.scraps + 1 : oldData.scraps - 1,
      })
    );

    const previousInfiniteQueryData = setInfinitePageQueriesData<IFeedDeatil>(
      {
        queryKey: loungeFeedQueryKey.lists(),
      },
      {
        target: (item) => item.feedId === feedId,
        updater: (item) => ({
          ...item,
          isScrapping: !isScrapping,
          scraps: !isScrapping ? item.scraps + 1 : item.scraps - 1,
        }),
      }
    );

    scrapMutation(
      {
        feedId,
        isScrap: !isScrapping,
      },
      {
        onError: () => {
          rollbackQueriesDataList([previousData, previousInfiniteQueryData]);
        },
      }
    );
  };

  const disabled = isLikePending || isScrapPending || isPangPending;

  return (
    <>
      <div className="flex items-center gap-x-[20px] mt-[20px]">
        <button
          className={BUTTON_STYLE}
          onClick={handlePangLikeMutation}
          disabled={disabled}
        >
          <span className={cn('border  rounded-full aspect-square')}>
            {!isMembershipLiked ? (
              <Icon.Pang className="size-[26px]" />
            ) : (
              <Icon.PangSelect className="size-[26px]" />
            )}
          </span>

          <span>{formatSocialNumber(membershipLikes)}</span>
        </button>

        <SecureButton
          className={BUTTON_STYLE}
          onClick={handleLikeMutation}
          disabled={disabled}
          requiredLevel="USER"
        >
          <UntitledIcon.Heart
            className={cn(
              'w-[26px] untitled-icon',
              isLiked && 'fill-error text-error'
            )}
          />
          <span>{formatSocialNumber(likes)}</span>
        </SecureButton>
        <SecureLink
          href={`${PATH.feedDetail(feedId)}#comments`}
          requiredLevel="USER"
          className={BUTTON_STYLE}
        >
          <UntitledIcon.MessageCircle01
            className={cn('w-[26px] untitled-icon ')}
          />
          <span>{formatSocialNumber(comments)}</span>
        </SecureLink>
        <SecureButton
          className={BUTTON_STYLE}
          onClick={handleScrapMutation}
          disabled={disabled}
          requiredLevel="USER"
        >
          {isScrapping ? <Icon.BookmarkSelect /> : <Icon.Bookmark />}
          <span>{formatSocialNumber(scraps)}</span>
        </SecureButton>
      </div>
    </>
  );
};

export default SocialActionButtons;
