import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import GlobalAlertDialog from '@/components/common/global-alert-dialog';
import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import { DialogTrigger } from '@/components/ui/dialog';
import Spinner from '@/components/ui/spinner';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useDeleteQnaAnswerComment,
  useQnaAnswerCommentList,
} from '@/service/qna/use-service';
import { useReportMutation } from '@/service/report/use-service';
import { format } from 'date-fns';

const QnaAnswerCommentList = ({ qnaAnswerId }: { qnaAnswerId: string }) => {
  const { data: myInfo } = useMyInfoQuery();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    useQnaAnswerCommentList(qnaAnswerId);

  const { mutate, isPending } = useDeleteQnaAnswerComment();
  const [isOpen, setIsOpen] = useState(false);
  const [targetCommentId, setTargetCommentId] = useState<string | null>(null);

  const { ref, inView } = useInView();

  const { mutate: reportMutate } = useReportMutation('qnaAnswerComment');

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && inView) fetchNextPage();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage, inView]);

  const handleDelete = () => {
    if (targetCommentId) {
      mutate(targetCommentId, {
        onSuccess() {
          setIsOpen(false);
          setTargetCommentId(null);
        },
      });
    }
  };

  const openDeleteDialog = (commentId: string) => {
    setTargetCommentId(commentId);
    setIsOpen(true);
  };

  return (
    <>
      <ul className="space-y-[10px] mt-[30px]">
        {data?.flattenList.map((commentInfo) => {
          const isMe = myInfo?.userId === commentInfo.userId;

          return (
            <li
              key={commentInfo.qnaAnswerCommentId}
              className="bg-slate-50 p-5"
            >
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-x-[6px]">
                  <span>{commentInfo.nickname}</span>
                  <span>{format(commentInfo.createdAt, 'yyyy.MM.dd.')}</span>
                </div>
                {/* 본인일 경우 */}
                {isMe ? (
                  <div className="flex gap-x-2">
                    <button
                      className="text-error"
                      onClick={() =>
                        openDeleteDialog(commentInfo.qnaAnswerCommentId)
                      }
                      disabled={isPending}
                    >
                      삭제하기
                    </button>
                  </div>
                ) : (
                  <ReportDialog>
                    <DialogTrigger>신고하기</DialogTrigger>
                    <ReportDialogContent
                      onValidSubmit={(data) => {
                        reportMutate({
                          id: commentInfo.qnaAnswerCommentId,
                          body: data,
                        });
                      }}
                    />
                  </ReportDialog>
                )}
              </div>
              <div className="mt-[10px]">{commentInfo.comment}</div>
            </li>
          );
        })}
        {isRefetching && (
          <div className="w-full flex items-center justify-center ">
            <Spinner />
          </div>
        )}
        <div ref={ref} />
      </ul>
      <GlobalAlertDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="정말로 댓글을 삭제하시겠습니까?"
        desc="댓글 삭제 시 되돌릴 수 없습니다."
        onConfirm={handleDelete}
        disabled={isPending}
      />
    </>
  );
};

export default QnaAnswerCommentList;
