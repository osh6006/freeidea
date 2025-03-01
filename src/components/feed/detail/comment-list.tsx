import React from 'react';
import { useInView } from 'react-intersection-observer';

import { useParams } from 'next/navigation';

import Review from '@/components/common/review';
import Spinner from '@/components/ui/spinner';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useDeleteFeedCommentMutation,
  useFeedCommentListQuery,
} from '@/service/feed/use-service';
import { useReportMutation } from '@/service/report/use-service';

const FeedDetailCommentList = () => {
  const { id: feedId }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();
  const { mutate: reportMutate } = useReportMutation('feedComment');
  const { mutate: deleteCommentMutate } = useDeleteFeedCommentMutation();

  const {
    data: feedCommentData,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFeedCommentListQuery(feedId, { limit: 10 });

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  return (
    <ul className="flex flex-col gap-y-2">
      {feedCommentData?.list.map(
        ({
          feedCommentId,
          userId,
          studioId,
          comment,
          createdAt,
          profileImageUrl,
          nickname,
        }) => (
          <li
            key={feedCommentId}
            className="border-b border-slate-200"
          >
            <Review
              studioId={studioId}
              content={comment}
              createdAt={createdAt}
              isMine={myInfo?.userId === userId}
              onReportValidSubmit={({ title, contents }) =>
                reportMutate({ id: feedCommentId, body: { title, contents } })
              }
              onDeleteClick={() => deleteCommentMutate({ feedCommentId })}
              profileImageUrl={profileImageUrl}
              nickname={nickname}
            />
          </li>
        )
      )}
      {isRefetching && (
        <div className="w-full flex items-center justify-center mt-2">
          <Spinner />
        </div>
      )}
      <div ref={ref} />
    </ul>
  );
};

export default FeedDetailCommentList;
