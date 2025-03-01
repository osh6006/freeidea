import Inner from '@/components/common/inner';
import QnaDetailAnswerList from '@/components/lounge/qna/detail/answer-list';
import QnaDetailContents from '@/components/lounge/qna/detail/contents';
import QnaDetailProfile from '@/components/lounge/qna/detail/profile';
import RecentlyQna from '@/components/lounge/qna/detail/recently-qna';
import QnaDetailRecommendAuthor from '@/components/lounge/qna/detail/recommend-author';
import { metadataMap } from '@/lib/metadata';
import { qnaDetailQueryOption } from '@/service/qna/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export const generateMetadata = metadataMap.qnaDetail;

const QnaDetailPage = async ({ params }: { params: { id: string } }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(qnaDetailQueryOption(params.id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Inner maxWidth={1200}>
        <main className="flex justify-between w-full gap-x-[60px] pt-[50px] pb-[200px]">
          <div className="flex-1 space-y-[60px] ">
            <QnaDetailContents />
            <QnaDetailAnswerList />
          </div>
          <div className="w-[410px] space-y-5">
            <QnaDetailProfile />
            <RecentlyQna />
            <QnaDetailRecommendAuthor />
          </div>
        </main>
      </Inner>
    </HydrationBoundary>
  );
};

export default QnaDetailPage;
