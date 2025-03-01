'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useParams } from 'next/navigation';

import Spinner from '@/components/ui/spinner';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useQnaAnswerList, useQnaDetailQuery } from '@/service/qna/use-service';

import QnaDetailAnswerCard from './answer-card';
import { QnaAnswerProvider } from './answer-provider';
import QnaDetailAnswerWrite from './answer-write';

const QnaDetailAnswerList = () => {
  const [reportOpen, setReportOpen] = useState(false);

  const { id }: { id: string } = useParams();
  const {
    data: answerData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useQnaAnswerList(id, { limit: 10 });

  const { data: myInfo } = useMyInfoQuery();
  const { data: qnaData } = useQnaDetailQuery(id);

  const isMe = qnaData?.user.userId === myInfo?.userId;

  const { ref } = useInView({
    onChange: (inView) => {
      if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
    },
  });

  return (
    <>
      {!isMe && !answerData?.isAnswered && <QnaDetailAnswerWrite />}

      <ul className="space-y-[30px] mt-[10px]">
        {answerData?.flattenList.map((answer) => {
          return (
            <QnaAnswerProvider
              key={answer.qnaAnswerId}
              data={answer}
            >
              <QnaDetailAnswerCard
                key={answer.qnaAnswerId}
                setReportOpen={setReportOpen}
              />
            </QnaAnswerProvider>
          );
        })}
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

export default QnaDetailAnswerList;
