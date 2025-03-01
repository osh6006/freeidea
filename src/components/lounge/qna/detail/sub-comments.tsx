'use client';

import { useState } from 'react';

import SeperatorDot from '@/components/common/seperator-dot';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { formatRelativeDate } from '@/lib/date';

import { useQnaAnswerContext } from './answer-provider';
import QnaAnswerSocialActionButtons from './answer-social-action';
import QnaAnswerCommentList from './comment-list';
import SubCommentWrite from './sub-comment-write';

interface QnaDetailSubCommentsProps {
  editable: boolean;
  setReportOpen: (open: boolean) => void;
  setEditorble: (editable: boolean) => void;
}

const QnaDetailSubComments = ({
  editable,
  setEditorble,
}: QnaDetailSubCommentsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: { createdAt, qnaAnswerId, isShown },
  } = useQnaAnswerContext();

  if (editable) return null;

  return (
    <>
      {
        <div className="flex items-center gap-x-2 mt-[40px]">
          <span className="">{formatRelativeDate(createdAt)}</span>
          {!isShown && (
            <>
              <SeperatorDot />
              <span>비공개</span>
            </>
          )}
        </div>
      }
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="mt-[10px]"
      >
        <QnaAnswerSocialActionButtons setEditorble={setEditorble} />
        <CollapsibleContent className="space-y-2">
          <SubCommentWrite
            qnaAnswerId={qnaAnswerId}
            setIsOpen={setIsOpen}
          />
          <QnaAnswerCommentList qnaAnswerId={qnaAnswerId} />
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default QnaDetailSubComments;
