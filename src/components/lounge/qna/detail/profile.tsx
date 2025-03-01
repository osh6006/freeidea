'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CommonAvatar } from '@/components/ui/avatar';
import { PATH } from '@/constants/path';
import { useQnaDetailQuery } from '@/service/qna/use-service';

const QnaDetailProfile = () => {
  const { id }: { id: string } = useParams();

  const { data: qnaData } = useQnaDetailQuery(id);

  return (
    <div className="border border-slate-200 rounded-[10px] p-5">
      <Link href={qnaData ? PATH.studio(qnaData?.user.studioId) : '#'}>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-x-[20px]">
            <CommonAvatar
              nickname={qnaData?.user.nickname}
              src={qnaData?.user.profileImageUrl}
              className="size-16 border"
            />
            <div className="">
              <div>{qnaData?.user.nickname}님</div>
              <div>작성한 질문 수 {qnaData?.user.qnaCount}</div>
            </div>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default QnaDetailProfile;
