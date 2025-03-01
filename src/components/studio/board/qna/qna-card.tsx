import Link from 'next/link';
import { useParams } from 'next/navigation';

import SeperatorDot from '@/components/common/seperator-dot';
import { Badge } from '@/components/ui/badge';
import { categoryDict } from '@/constants/dictionary';
import { PATH } from '@/constants/path';
import { formatRelativeDate } from '@/lib/date';
import { extensions } from '@/lib/tiptab/common-options';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { IStudioQna } from '@/types/studio';
import { useEditor } from '@tiptap/react';

import StudioQnaOptions from './qna-option';

const QnaCard = ({
  category,
  nickname,
  contents,
  isShown,
  createdAt,
  qnaAnswerId,
  question,
}: IStudioQna) => {
  const { id: studioId }: { id: string } = useParams();

  const mainEditor = useEditor({
    content: contents || '',
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
  });

  const questionEditor = useEditor({
    content: question?.contents || '삭제된 질문 입니다.',
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
  });

  const { data: myInfo } = useMyInfoQuery();
  const isMe = myInfo?.studioId === studioId;

  return (
    <div
      className={cn(
        'p-[30px] border border-slate-200 rounded-[10px] ',
        !isShown ? 'bg-slate-tint-5' : ''
      )}
    >
      <div className="flex justify-between w-full items-center">
        <span className="flex items-center gap-x-[10px] text-slate-500">
          <Badge
            variant="outline"
            className="h-[30px] flex items-center justify-center typo-body-14-regular-150-tight text-slate-500 rounded-sm"
          >
            {categoryDict.getTranslator('en-ko').translate(category)}
          </Badge>
          <span className="typo-body-16-regular-150">
            <strong className="text-slate-800">{nickname}</strong>님의 질문에{' '}
            <span className="text-primary">답변</span>을 달았습니다.
          </span>
          <span>{formatRelativeDate(createdAt)}</span>
          {!isShown && (
            <>
              <SeperatorDot />
              <span>비공개</span>
            </>
          )}
        </span>
        <StudioQnaOptions
          qnaAnswerId={qnaAnswerId}
          isMe={isMe}
        />
      </div>

      <div className="my-[30px]">
        <p className="line-clamp-3">{mainEditor?.getText()}</p>
      </div>
      <Link
        href={PATH.loungeQnaDetail(question?.qnaId)}
        className={cn(question?.contents ? '' : 'pointer-events-none')}
      >
        <div className="border border-slate-200 rounded-sm space-y-1 p-[10px] transition-colors hover:bg-slate-50">
          <div className="typo-body-16-regular-150">{question?.title}</div>
          <p
            className={cn(
              'text-slate-500 typo-body-14-regular-150-tight line-clamp-3'
            )}
          >
            {questionEditor?.getText()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default QnaCard;
