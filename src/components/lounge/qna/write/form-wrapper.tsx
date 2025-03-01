'use client';

import React, { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSearchParams } from 'next/navigation';

import { FORM_ID } from '@/constants/form-id';
import {
  useCreateQnaMutation,
  useUpdateQnaMutation,
} from '@/service/qna/use-service';
import { QnaWriteSchemaType } from '@/types/qna';

const QnaFormWrapper = ({
  mode,
  children,
}: { mode: 'create' | 'update' } & PropsWithChildren) => {
  const searchParams = useSearchParams();
  const { handleSubmit } = useFormContext<QnaWriteSchemaType>();

  const id = searchParams.get('id') || '';

  const { mutate: qnaCreateMutate } = useCreateQnaMutation();
  const { mutate: qnaUpdateMutate } = useUpdateQnaMutation();

  const onValid = (data: QnaWriteSchemaType) => {
    switch (mode) {
      case 'create':
        qnaCreateMutate(data);
        break;
      case 'update':
        qnaUpdateMutate({
          qnaId: id,
          body: data,
        });

        break;
      default:
        throw new Error('Invalid mode');
    }
  };

  return (
    <form
      id={FORM_ID.qnaWrite}
      onSubmit={handleSubmit(onValid)}
    >
      {children}
    </form>
  );
};

export default QnaFormWrapper;
