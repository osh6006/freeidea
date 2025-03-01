'use client';

import { useParams } from 'next/navigation';

import { useFeedCommentListQuery } from '@/service/feed/use-service';

import FeedDetailCommentForm from './comment-form';
import FeedDetailCommentList from './comment-list';

const FeedComments = () => {
  const { id: feedId }: { id: string } = useParams();
  const { data: feedCommentData } = useFeedCommentListQuery(feedId, {});

  return (
    <section
      className="mt-[50px]"
      id="comments"
    >
      <div className="typo-title-20-bold-100-tight text-slate-800">
        댓글
        <strong className="text-primary"> {feedCommentData?.count || 0}</strong>
      </div>
      <FeedDetailCommentForm />
      <FeedDetailCommentList />
    </section>
  );
};

export default FeedComments;
