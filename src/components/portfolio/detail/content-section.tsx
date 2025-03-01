'use client';

import { Fragment } from 'react';

import { useParams } from 'next/navigation';

import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import { DialogTrigger } from '@/components/ui/dialog';
import { formatCreatedTimeDate } from '@/lib/date';
import { extensions } from '@/lib/tiptab/common-options';
import { usePortfolioDetail } from '@/service/portfolio/use-service';
import { useReportMutation } from '@/service/report/use-service';
import { COMMON_MARKDOWN_STYLE } from '@/styles/common';
import { EditorContent, useEditor } from '@tiptap/react';

function ContentSection() {
  const params = useParams<{ id: string }>();
  const { data } = usePortfolioDetail(params.id);
  const { mutate: reportMutate } = useReportMutation('portfolio');

  const editor = useEditor({
    content: data?.contents,
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
  });

  if (!data) throw new Error('Check the data initialization');
  const {
    title,
    tags,
    scraps,
    comments,
    viewCount,
    likes,
    membershipLikes,
    createdAt,
    challengeNumber,
    isShown,
  } = data;

  const metrics = [
    { label: formatCreatedTimeDate(new Date(createdAt)), count: undefined },
    ...(isShown
      ? [
          { label: '팡', count: membershipLikes },
          { label: '좋아요', count: likes },
          { label: '댓글', count: comments },
          { label: '스크랩', count: scraps },
          { label: '조회', count: viewCount },
        ]
      : [{ label: '비공개 글' }]),
  ];

  const tagsWithChallengeTag = [
    challengeNumber ? `${challengeNumber}기 도전작` : null,
    ...tags,
  ].filter(Boolean);

  return (
    <section className="flex flex-col gap-[10px]">
      <h2 className="typo-title-20-bold-100-tight">{title}</h2>
      <div className="typo-body-16-regular-150">
        <EditorContent
          className={COMMON_MARKDOWN_STYLE}
          editor={editor}
        />
      </div>
      <div className="flex gap-[16px] text-pink-500 typo-body-14-regular-150-tight">
        {tagsWithChallengeTag.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[6px] text-slate-500 typo-body-14-regular-150-tight items-center mt-[20px]">
          {metrics.map(({ label, count }, index) => (
            <Fragment key={index}>
              <span>
                {label} {count}
              </span>
              {index < metrics.length - 1 && (
                <div className="size-[4px] rounded-full bg-slate-500" />
              )}
            </Fragment>
          ))}
        </div>
        <ReportDialog>
          <DialogTrigger className="typo-body-14-medium-100-tight text-slate-500">
            신고하기
          </DialogTrigger>
          <ReportDialogContent
            onValidSubmit={(data) => {
              reportMutate({ id: params.id, body: data });
            }}
          />
        </ReportDialog>
      </div>
    </section>
  );
}

export default ContentSection;
