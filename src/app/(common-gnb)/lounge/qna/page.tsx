import Inner from '@/components/common/inner';
import ScrollUpButton from '@/components/common/scroll-up-button';
import QnaCommentRank from '@/components/lounge/qna/comment-rank';
import QnaWriteLinkButton from '@/components/lounge/qna/link-button';
import QnaList from '@/components/lounge/qna/qna-list';
import { metadataMap } from '@/lib/metadata';
import { qnaListQueryOption } from '@/service/qna/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const metadata = metadataMap.qna;

export default async function LoungeQnaPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(qnaListQueryOption({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Inner maxWidth={1200}>
        <main className="w-full flex justify-between pt-[50px] pb-[200px] mx-auto">
          <QnaList />
          <div>
            <QnaCommentRank />
            <QnaWriteLinkButton />
          </div>
        </main>
      </Inner>
      <ScrollUpButton />
    </HydrationBoundary>
  );
}
