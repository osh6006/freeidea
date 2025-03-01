'use client';

import { useState } from 'react';

import Link from 'next/link';

import { CommonAvatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { useToast } from '@/hooks/use-toast';
import { extensions } from '@/lib/tiptab/common-options';
import { cn } from '@/lib/utils';
import { qnaAnswerWriteSchema } from '@/lib/zod/qna/qna-answer-write-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { qnaQueryKey } from '@/service/qna/query-option';
import { useUpdateQnaAnswerMutation } from '@/service/qna/use-service';
import { useFollowAuthorMutation } from '@/service/studio/use-service';
import { IQnaAnswer } from '@/types/qna';
import { useEditor } from '@tiptap/react';

import QnaAnswerEditor from './answer-editor';
import QnaAnswerOption from './answer-option';
import { useQnaAnswerContext } from './answer-provider';
import QnaDetailSubComments from './sub-comments';

const QnaDetailAnswerCard = ({
  setReportOpen,
}: {
  setReportOpen: (open: boolean) => void;
}) => {
  const { toast } = useToast();
  const { data: myInfo } = useMyInfoQuery();
  const {
    data: { contents, qnaAnswerId, userId, studioId, isShown },
  } = useQnaAnswerContext();

  const [editable, setEditorble] = useState(false);
  const isMe = myInfo?.userId === userId;

  const editor = useEditor({
    content: contents,
    extensions: extensions,
    editable: editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'w-full text-[14px] text-slate-800 focus:outline-none',
      },
    },
  });

  const { mutate: modifyMutate, isPending: isModifyPending } =
    useUpdateQnaAnswerMutation();

  const handleModifyCancel = () => {
    editor?.commands.setContent(contents);
    setEditorble(false);
  };

  const handleModify = () => {
    const updateContents = editor?.getHTML() || '';
    const { success, error } = qnaAnswerWriteSchema.safeParse({
      contents: updateContents,
    });

    if (!success) {
      toast({
        title: error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    modifyMutate(
      {
        qnaAnswerId: qnaAnswerId,
        body: { contents: updateContents },
      },
      {
        onSuccess: () => {
          setEditorble(false);
        },
      }
    );
  };

  return (
    <li className="p-5 border border-slate-200 rounded-[10px]">
      <AnswerHeader
        isMe={isMe}
        editable={editable}
        disabled={isModifyPending}
        studioId={studioId}
        setEditorble={setEditorble}
        handleModifyCancel={handleModifyCancel}
        handleModify={handleModify}
      />

      {!isMe && !isShown ? (
        <div className="my-[50px] typo-body-14-regular-150-tight">
          비공개 답변입니다.
        </div>
      ) : (
        <>
          <QnaAnswerEditor
            editor={editor}
            editable={editable}
            className={cn('py-[20px] px-0')}
          />
          <QnaDetailSubComments
            editable={editable}
            setEditorble={setEditorble}
            setReportOpen={setReportOpen}
          />
        </>
      )}
    </li>
  );
};

export default QnaDetailAnswerCard;

const AnswerHeader = ({
  isMe,
  editable,
  disabled,
  studioId,
  handleModifyCancel,
  handleModify,
}: {
  isMe: boolean;
  editable: boolean;
  disabled: boolean;
  studioId: string;
  setEditorble: (state: boolean) => void;
  handleModifyCancel: () => void;
  handleModify: () => void;
}) => {
  const {
    data: {
      qnaAnswerId,
      userId,
      nickname,
      introduction,
      profileImageUrl,
      isShown,
    },
  } = useQnaAnswerContext();

  return (
    <div className="flex justify-between items-center bg-slate-50 p-5 rounded-[6px]">
      <Link href={PATH.studio(studioId)}>
        <div className="flex items-center gap-x-[20px]">
          <CommonAvatar
            nickname={nickname}
            src={profileImageUrl}
            className="size-16 border"
          />
          <div>
            <div className="typo-body-16-bold-100-tight">{nickname}</div>
            <div className="typo-body-14-regular-150-tight text-slate-500 mt-1">
              {introduction}
            </div>
          </div>
        </div>
      </Link>
      {isMe ? (
        editable ? (
          <div className="flex gap-x-2">
            <Button
              variant="outline"
              disabled={disabled}
              onClick={handleModifyCancel}
            >
              수정취소
            </Button>
            <Button
              disabled={disabled}
              onClick={handleModify}
            >
              수정하기
            </Button>
          </div>
        ) : (
          <QnaAnswerOption
            qnaAnswerId={qnaAnswerId}
            isShown={isShown}
          />
        )
      ) : (
        <FollowButton disabled={disabled} />
      )}
    </div>
  );
};

const FollowButton = ({ disabled }: { disabled: boolean }) => {
  const {
    data: { qnaAnswerId, studioId, isFollowing },
  } = useQnaAnswerContext();

  const { mutate, isPending } = useFollowAuthorMutation();
  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const handleFollow = () => {
    const prevData = setInfinitePageQueriesData<IQnaAnswer>(
      {
        queryKey: qnaQueryKey.lists(),
      },
      {
        target: (item) => item.qnaAnswerId === qnaAnswerId,
        updater: (item) => ({
          ...item,
          isFollowing: !isFollowing,
        }),
      }
    );

    mutate(
      { studioId, isFollowing: !isFollowing },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  return (
    <Button
      disabled={disabled || isPending}
      onClick={handleFollow}
      className={cn(
        '',
        !isFollowing ? 'bg-primary' : 'bg-slate-300 hover:bg-slate-300/70'
      )}
    >
      {!isFollowing ? '팔로우' : '팔로잉'}
    </Button>
  );
};
