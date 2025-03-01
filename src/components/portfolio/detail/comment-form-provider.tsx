'use client';

import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import {
  CommentNewSchemaType,
  commentNewSchema,
} from '@/lib/zod/comment-new-schema';
import { zodResolver } from '@hookform/resolvers/zod';

function CommentFormProvider({ children }: { children: ReactNode }) {
  const form = useForm<CommentNewSchemaType>({
    resolver: zodResolver(commentNewSchema),
    defaultValues: {
      comment: '',
    },
  });

  return <Form {...form}>{children}</Form>;
}

export default CommentFormProvider;
