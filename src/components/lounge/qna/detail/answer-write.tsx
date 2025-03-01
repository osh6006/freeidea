import { useState } from 'react';

import { useParams } from 'next/navigation';

import { CommonAvatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useToast } from '@/hooks/use-toast';
import { extensions } from '@/lib/tiptab/common-options';
import { cn } from '@/lib/utils';
import { qnaAnswerWriteSchema } from '@/lib/zod/qna/qna-answer-write-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useCreateQnaAnswerMutation } from '@/service/qna/use-service';
import { useEditor } from '@tiptap/react';

import QnaAnswerEditor from './answer-editor';

const QnaDetailAnswerWrite = () => {
  const { toast } = useToast();
  const { id }: { id: string } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const { data: myInfo } = useMyInfoQuery();
  const { mutate } = useCreateQnaAnswerMutation();

  const editor = useEditor({
    extensions: extensions,
    editable: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'w-full text-[14px] text-slate-800 focus:outline-none p-[20px] min-h-[360px]',
      },
    },
  });

  const handleAnswerClick = () => {
    const contents = editor?.getHTML();
    if (!contents) return;

    const { success, error } = qnaAnswerWriteSchema.safeParse({
      contents: editor?.getHTML(),
    });

    if (editor && !success && contents) {
      toast({
        title: error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    mutate(
      {
        qnaId: id,
        body: { contents },
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          handleReset();
        },
      }
    );
  };

  const handleReset = () => {
    editor?.commands.setContent('');
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!myInfo) {
          toast({
            title: '로그인을 해주세요!',
          });
          return;
        }
        setIsOpen(isOpen);
      }}
      className="border border-slate-200 rounded-[6px]"
    >
      <div
        className={cn(
          'flex justify-between items-center p-5 ',
          isOpen && 'bg-slate-tint-5'
        )}
      >
        <div className="flex items-center gap-x-[20px]">
          <CommonAvatar
            nickname={myInfo?.nickname}
            src={myInfo?.profileImageUrl}
            className="size-16 border"
          />

          <div>
            <div className="typo-body-16-bold-100-tight">
              {myInfo?.nickname}
            </div>
            <div className="typo-body-14-regular-150-tight text-slate-500 mt-1">
              아는 정보를 공유해 주세요
            </div>
          </div>
        </div>
        <div className="flex gap-x-2">
          {isOpen && (
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                handleReset();
              }}
            >
              답변 취소
            </Button>
          )}
          <CollapsibleTrigger asChild>
            <Button
              onClick={(e) => {
                if (isOpen) {
                  e.preventDefault();
                  handleAnswerClick();
                }
              }}
            >
              {isOpen ? '답변 완료' : '답변 쓰기'}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="space-y-2">
        <QnaAnswerEditor
          editor={editor}
          editable
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default QnaDetailAnswerWrite;
