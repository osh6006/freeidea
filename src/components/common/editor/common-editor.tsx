'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useCommonEditor } from '@/hooks/use-common-editor';
import { cn } from '@/lib/utils';
import { COMMON_MARKDOWN_STYLE } from '@/styles/common';
import { EditorContent } from '@tiptap/react';

import MobileToolbar from './mobile-toolbar';
import Toolbar from './toolbar';

interface ICommonEditor {
  onChange?: (content: string) => void;
  error?: boolean;
  content?: string;
  disabled?: boolean;
  isDirty?: boolean;
  initialContent?: string;
  className?: string;
  contentsClassName?: string;
  toolbarClassName?: string;
}

const CommonEditor = ({
  onChange,
  content,
  error = false,
  disabled = false,
  initialContent,
  className,
  contentsClassName = 'h-[1500px]',
  toolbarClassName,
}: ICommonEditor) => {
  const editor = useCommonEditor({
    content,
    initialContent,
    onChange,
    editable: !disabled,
  });

  return (
    <div
      className={cn(
        `relative resize-y rounded-[4px] border border-slate-300 max-w-full divide-slate-300`,
        error && 'border-error bg-pink-50',
        disabled ? 'pointer-events-none cursor-not-allowed' : '',
        className
      )}
    >
      <Toolbar
        editor={editor}
        disabled={disabled}
        className={cn(
          'bg-white border-b border-slate-300 z-10 top-0 hidden pc-screen:flex',
          toolbarClassName
        )}
      />
      <MobileToolbar
        editor={editor}
        disabled={disabled}
        className="bg-white border-b border-slate-300 z-10 top-0 w-full pc-screen:hidden"
      />
      <ScrollArea className={cn('relative', contentsClassName)}>
        <EditorContent
          editor={editor}
          className={cn(COMMON_MARKDOWN_STYLE, 'p-[20px]')}
        />
      </ScrollArea>
    </div>
  );
};

export default CommonEditor;
