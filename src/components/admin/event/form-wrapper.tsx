'use client';

import React, { PropsWithChildren } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSearchParams } from 'next/navigation';

import { FORM_ID } from '@/constants/form-id';
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from '@/service/admin/event/use-service';
import { EventWriteBodyType, EventWriteSchemaType } from '@/types/admin/event';
import { format } from 'date-fns';

const QnaFormWrapper = ({
  mode,
  children,
}: { mode: 'create' | 'update' } & PropsWithChildren) => {
  const searchParams = useSearchParams();
  const { handleSubmit } = useFormContext<EventWriteSchemaType>();

  const { mutate: createMutate } = useCreateEventMutation();
  const { mutate: updateMutate } = useUpdateEventMutation();

  const id = searchParams.get('id') || '';

  const onValid = (data: EventWriteSchemaType) => {
    delete data.thumbnailImageUrl;

    const newData: EventWriteBodyType = {
      ...data,
      publishedAt: format(data.publishedAt, 'yyyy-MM-dd'),
    };

    switch (mode) {
      case 'create':
        createMutate(newData);
        break;
      case 'update':
        updateMutate({
          eventId: id,
          body: newData,
        });
        break;
      default:
        throw new Error('Invalid mode');
    }
  };

  return (
    <form
      id={FORM_ID.eventWrite}
      onSubmit={handleSubmit(onValid)}
    >
      {children}
    </form>
  );
};

export default QnaFormWrapper;
