'use client';

import { useFormContext } from 'react-hook-form';

import { useParams } from 'next/navigation';

import ScrollUpButton from '@/components/common/scroll-up-button';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { CommentNewSchemaType } from '@/lib/zod/comment-new-schema';
import { portfolioQueryKey } from '@/service/portfolio/query-option';
import {
  useLikePortfolio,
  usePangPortfolio,
  usePortfolioCommentList,
  usePortfolioDetail,
  useScrapPortfolio,
} from '@/service/portfolio/use-service';
import { PortfolioDetailType } from '@/types/portfolio';
import { MessageCircle01 } from '@untitled-ui/icons-react';

function EngagementBar() {
  const { id } = useParams<{ id: string }>();
  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();
  const { data: portfolio } = usePortfolioDetail(id);
  const { mutate: likeMutate } = useLikePortfolio();
  const { mutate: scrapMutate } = useScrapPortfolio();
  const { mutate: pangMutate } = usePangPortfolio();
  const { setFocus } = useFormContext<CommentNewSchemaType>();
  const { data: commentData } = usePortfolioCommentList({ id });

  if (!portfolio) throw new Error('portfolio not found');

  const {
    isMembershipLiked,
    isLiked,
    isScrapping,
    likes,
    scraps,
    membershipLikes,
    comments,
  } = portfolio;

  const onPangClick = () => {
    const prevData = setQueriesData<PortfolioDetailType>(
      {
        queryKey: portfolioQueryKey.detail(id),
      },
      (prev) => ({
        ...prev,
        isMembershipLiked: !isMembershipLiked,
        membershipLikes: !isMembershipLiked
          ? membershipLikes + 1
          : membershipLikes - 1,
      })
    );
    pangMutate(
      { portfolioId: id, isMembershipLiked: !isMembershipLiked },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  const onLikeClick = () => {
    const prevData = setQueriesData<PortfolioDetailType>(
      {
        queryKey: portfolioQueryKey.detail(id),
      },
      (prev) => ({
        ...prev,
        isLiked: !isLiked,
        likes: !isLiked ? likes + 1 : likes - 1,
      })
    );
    likeMutate(
      { id, isLiked: !isLiked },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  const onScrapClick = () => {
    const prevData = setQueriesData<PortfolioDetailType>(
      {
        queryKey: portfolioQueryKey.detail(id),
      },
      (prev) => ({
        ...prev,
        isScrapping: !isScrapping,
        scraps: !isScrapping ? scraps + 1 : scraps - 1,
      })
    );
    scrapMutate(
      { portfolioId: id, isScrapping: !isScrapping },
      { onError: () => rollbackQueriesData(prevData) }
    );
  };

  const buttonProps = [
    {
      key: 'pang',
      label: isMembershipLiked ? (
        <Icon.PangSelect className="size-[60px]" />
      ) : (
        <Icon.Pang className="size-[60px]" />
      ),
      onClick: onPangClick,
      count: membershipLikes,
    },
    {
      key: 'heart',
      label: isLiked ? <Icon.HeartSelect /> : <Icon.Heart />,
      onClick: onLikeClick,
      count: likes,
    },
    {
      key: 'comment',
      label: <MessageCircle01 />,
      count: comments,
      onClick: () => setFocus('comment'),
      disabled: !commentData?.pages[0].isCommentUsed,
    },
    {
      key: 'scrap',
      label: isScrapping ? <Icon.BookmarkSelect /> : <Icon.Bookmark />,
      onClick: onScrapClick,
      count: scraps,
    },
  ];

  return (
    <aside
      style={{ left: 'calc(50% + 360px + 30px)' }}
      className="sticky w-min flex flex-col justify-between items-center"
    >
      <div className="sticky top-[60px] mb-20 flex flex-col gap-[30px]">
        {buttonProps.map(({ key, label, count, onClick, disabled }) => (
          <div
            key={key}
            className="flex flex-col items-center [&>button]:size-[60px] [&>button]:p-0 [&>svg]:size-[30px] gap-[12px]"
          >
            <Button
              type="button"
              variant="outline"
              rounded
              onClick={onClick}
              disabled={disabled}
            >
              {label}
            </Button>
            <span className="typo-body-16-medium-100-tight">{count}</span>
          </div>
        ))}
      </div>

      <ScrollUpButton className="sticky bottom-[60px] size-[60px]" />
    </aside>
  );
}

export default EngagementBar;
