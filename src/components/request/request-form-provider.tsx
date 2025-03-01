'use client';

import { PropsWithChildren } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { FORM_ID } from '@/constants/form-id';
import { requestSchema } from '@/lib/zod/request/create-schema';
import { getRequestDetail } from '@/service/request/service';
import {
  useCreateRequestMutation,
  useUpdateRequestMutation,
} from '@/service/request/use-service';
import { RequestSchemaType, RequestToServerType } from '@/types/request';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format } from 'date-fns';

const RequestCreateFormProvider = ({
  id,
  children,
}: {
  id?: string;
} & PropsWithChildren) => {
  const methods = useForm<RequestSchemaType>({
    resolver: zodResolver(requestSchema),
    defaultValues: async () => {
      if (id) {
        const result = await getRequestDetail(id || '');
        return {
          category: result.category,
          dueDate: new Date(result.dueDate) || addDays(new Date(), 1),
          useRange: result.useRange[0],
          usePurpose: result.usePurpose,
          title: result.title,
          contents: result.contents,
          budget: result?.budget + '',
          isDiscussionPossible: result.isDiscussionPossible,
        };
      } else {
        return {
          category: '',
          dueDate: undefined,
          useRange: '',
          usePurpose: '',
          title: '',
          contents: '',
          budget: '',
          isDiscussionPossible: false,
        };
      }
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  });

  const { handleSubmit } = methods;
  const { mutate: create } = useCreateRequestMutation();
  const { mutate: update } = useUpdateRequestMutation();

  const onValid: SubmitHandler<RequestSchemaType> = (data) => {
    const newValue = {
      ...data,
      useRange: [data.useRange],
      dueDate: format(data.dueDate!, 'yyyy-MM-dd'),
      budget: Number(data.budget || '0'),
      isDiscussionPossible: data.isDiscussionPossible || false,
    };

    if (id) {
      update({ id, data: newValue });
    } else {
      create(newValue);
    }
  };

  return (
    <Form {...methods}>
      <form
        id={FORM_ID.requestNew}
        onSubmit={handleSubmit(onValid)}
      >
        {children}
      </form>
    </Form>
  );
};

export default RequestCreateFormProvider;
