'use client';

import { useInView } from 'react-intersection-observer';

import { useParams } from 'next/navigation';

import Review from '@/components/common/review';
import Spinner from '@/components/ui/spinner';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useDeleteComment,
  usePortfolioCommentList,
} from '@/service/portfolio/use-service';
import { useReportMutation } from '@/service/report/use-service';

import CommentWriteSection from './comment-write-section';

function CommentSection() {
  const params = useParams<{ id: string }>();
  const {
    data: commentData,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = usePortfolioCommentList({
    id: params.id,
  });
  const { data: myInfo } = useMyInfoQuery();
  const { mutate: reportMutate } = useReportMutation('portfolioReview');
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { ref } = useInView({
    onChange: (inView) => {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  if (isLoading) return <Spinner />;
  if (!commentData) return null;

  const { flattenList: commentList, pages } = commentData;
  const { count } = pages[0];

  return (
    <section
      id="comment-section"
      className="scroll-m-[100px]"
    >
      <h2 className="typo-title-20-bold-100-tight mb-[20px] flex items-center gap-[4px]">
        댓글 <span className="text-pink-500">{count}</span>
        {isRefetching && <Spinner className="size-[20px]" />}
      </h2>

      <CommentWriteSection />

      {commentList.length > 0 && (
        <ul className="flex flex-col divide-y divide-border">
          {commentList.map(
            ({
              comment,
              portfolioCommentId,
              profileImageUrl,
              nickname,
              createdAt,
              userId,
              studioId,
            }) => (
              <li key={portfolioCommentId}>
                <Review
                  profileImageUrl={profileImageUrl}
                  nickname={nickname}
                  createdAt={createdAt}
                  content={comment}
                  studioId={studioId}
                  isMine={myInfo?.userId === userId}
                  onReportValidSubmit={(data) =>
                    reportMutate({ id: portfolioCommentId, body: data })
                  }
                  onDeleteClick={() => deleteCommentMutate(portfolioCommentId)}
                />
              </li>
            )
          )}
        </ul>
      )}
      <div ref={ref} />
      {isFetchingNextPage && <Spinner />}
    </section>
  );
}

export default CommentSection;
