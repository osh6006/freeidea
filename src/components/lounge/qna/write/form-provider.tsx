'use client';

import { useEffect } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { qnaWriteSchema } from '@/lib/zod/qna/qna-write-schema';
import { QnaWriteSchemaType } from '@/types/qna';
import { zodResolver } from '@hookform/resolvers/zod';

const QnaFormProvider = ({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues?: DefaultValues<QnaWriteSchemaType>;
}) => {
  const form = useForm<QnaWriteSchemaType>({
    resolver: zodResolver(qnaWriteSchema),
    defaultValues: defaultValues ?? {
      category: undefined,
      tags: [],
      title: '',
      contents: '',
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return <Form {...form}>{children}</Form>;
};

export default QnaFormProvider;
