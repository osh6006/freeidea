'use client';

import { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

import EditorProvider from '@/components/common/editor/editor-provider';
import { useCommonEditor } from '@/hooks/use-common-editor';
import { PortfolioNewSchemaType } from '@/types/portfolio';

function PortfolioEditorProvider({ children }: PropsWithChildren) {
  const {
    watch,
    setValue,
    formState: { defaultValues },
  } = useFormContext<PortfolioNewSchemaType>();
  const editor = useCommonEditor({
    content: watch('contents'),
    initialContent: defaultValues?.contents,
    onChange: (content) => {
      setValue('contents', content);
    },
  });

  return <EditorProvider editor={editor}>{children}</EditorProvider>;
}

export default PortfolioEditorProvider;
