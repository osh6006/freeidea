'use client';

import { extensions } from '@/lib/tiptab/common-options';
import { cn } from '@/lib/utils';
import { COMMON_MARKDOWN_STYLE } from '@/styles/common';
import { EditorContent, useEditor } from '@tiptap/react';

const EventDetailContents = ({ contents }: { contents: string }) => {
  const editor = useEditor({
    content: contents || '',
    shouldRerenderOnTransaction: false,
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
  });
  return (
    <EditorContent
      className={cn('flex flex-col w-full flex-1', COMMON_MARKDOWN_STYLE)}
      editor={editor}
    />
  );
};

export default EventDetailContents;
