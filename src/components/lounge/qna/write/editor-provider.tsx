'use client';

import React, { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

import EditorProvider from '@/components/common/editor/editor-provider';
import { useCommonEditor } from '@/hooks/use-common-editor';
import { QnaWriteSchemaType } from '@/types/qna';

const QnaEditorProvider = ({ children }: PropsWithChildren) => {
  const {
    formState: { defaultValues },
  } = useFormContext<QnaWriteSchemaType>();

  const editor = useCommonEditor({
    initialContent: defaultValues?.contents,
  });

  return <EditorProvider editor={editor}>{children}</EditorProvider>;
};

export default QnaEditorProvider;
