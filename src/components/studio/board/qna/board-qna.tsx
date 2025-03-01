import { useInView } from 'react-intersection-observer';

import { useParams } from 'next/navigation';

import BoardQnaSkeleton from '@/components/common/skeleton/board-qna-skeleton';
import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useStudioQnaListQuery } from '@/service/studio/use-service';

import BoardEmpty from '../board-empty';
import QnaCard from './qna-card';

const BoardQna = () => {
  const { id: studioId }: { id: string } = useParams();

  const {
    data,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useStudioQnaListQuery(studioId, {});

  const { ref } = useInView({
    onChange(inView) {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  const qnaList = data?.flattenList || [];
  const isLength = qnaList.length > 0;

  return (
    <>
      <ul
        className={cn(
          'flex flex-col gap-y-[20px] ',
          isLength ? 'w-full' : 'w-full'
        )}
      >
        {isLoading ? (
          <>
            <BoardQnaSkeleton />
            <BoardQnaSkeleton />
          </>
        ) : (
          <>
            {qnaList?.map((qna) => (
              <li key={qna.qnaAnswerId}>
                <QnaCard {...qna} />
              </li>
            ))}
          </>
        )}
        {!isLength && !isLoading && (
          <BoardEmpty>등록된 Q&A가 없어요</BoardEmpty>
        )}
        {isRefetching && (
          <div className="w-full flex items-center justify-center ">
            <Spinner />
          </div>
        )}
        <div ref={ref} />
      </ul>
    </>
  );
};

export default BoardQna;
