'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import SeperatorDot from '@/components/common/seperator-dot';
import { Badge } from '@/components/ui/badge';
import { categoryDict } from '@/constants/dictionary';
import { formatRelativeDate } from '@/lib/date';
import { extensions } from '@/lib/tiptab/common-options';
import { cn, formatSocialNumber } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useQnaDetailQuery } from '@/service/qna/use-service';
import { COMMON_MARKDOWN_STYLE } from '@/styles/common';
import { EditorContent, useEditor } from '@tiptap/react';

import QnaDetailOption from './option';

const QnaDetailContents = () => {
  const { id }: { id: string } = useParams();

  const { data: qnaData } = useQnaDetailQuery(id);
  const { data: myInfo } = useMyInfoQuery();

  const editor = useEditor({
    content: qnaData?.contents || '',
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
  });

  useEffect(() => {
    if (editor && qnaData?.contents) {
      editor.commands.setContent(qnaData.contents);
    }
  }, [editor, qnaData?.contents]);

  if (!qnaData) return null;

  const { title, category, tags, createdAt, viewCount, answers, user, qnaId } =
    qnaData;

  const isMe = myInfo?.userId === user.userId;

  return (
    <section>
      <div className="w-full flex justify-between ">
        <div className="text-slate-500 typo-body-14-regular-150-tight">
          {categoryDict.getTranslator('en-ko').translate(category)}
        </div>
        {
          <QnaDetailOption
            qnaId={qnaId}
            isMe={isMe}
          />
        }
      </div>
      <h1 className="typo-title-24-bold-140-tight mt-5">{title}</h1>
      <div className="mt-10">
        <EditorContent
          className={cn('prose-img:rounded-[10px]', COMMON_MARKDOWN_STYLE)}
          editor={editor}
        />
      </div>
      <div className="flex items-center gap-x-[6px] mt-[60px] typo-body-14-regular-150-tight text-slate-500">
        <span>{formatRelativeDate(createdAt)}</span>
        <SeperatorDot />
        <span>댓글 {formatSocialNumber(answers)}</span>
        <SeperatorDot />
        <span>조회 {formatSocialNumber(viewCount)}</span>
      </div>

      <ul className="flex items-center gap-x-[6px] mt-[30px]">
        {tags.map((el) => {
          return (
            <li key={el}>
              <Badge
                variant="card"
                className="bg-slate-50 text-slate-700"
              >
                # {el}
              </Badge>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default QnaDetailContents;
