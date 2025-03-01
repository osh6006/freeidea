import React from 'react';

import Toolbar from '@/components/common/editor/toolbar';
import { cn } from '@/lib/utils';
import { COMMON_MARKDOWN_STYLE } from '@/styles/common';
import { Editor, EditorContent } from '@tiptap/react';

const QnaAnswerEditor = ({
  editor,
  editable,
  className,
}: {
  editor: Editor | null;
  editable?: boolean;
  className?: string;
}) => {
  return (
    <>
      {editable && (
        <Toolbar
          className="justify-center mx-auto gap-x-9 border-y border-slate-200 sticky top-0 bg-white z-10 px-[20px]"
          editor={editor}
          excludeButtons={['BlockQuote', 'TextAlign', 'Horizontal', 'List']}
        />
      )}
      <EditorContent
        editor={editor}
        className={cn(COMMON_MARKDOWN_STYLE, 'px-[10px]', className)}
        placeholder="답변을 남겨 주세요"
      />
    </>
  );
};

export default QnaAnswerEditor;
