'use client';

import { PropsWithChildren } from 'react';
import { SubmitErrorHandler, useFormContext } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';

import { useSearchParams } from 'next/navigation';

import { FORM_ID } from '@/constants/form-id';
import { useToast } from '@/hooks/use-toast';
import {
  useCreateWorkMutation,
  useUpdateWorkMutation,
} from '@/service/work-new/use-service';
import { WorkNewRequestType, WorkNewSchemaType } from '@/types/work';

export default function StoreForm({ children }: PropsWithChildren) {
  const { toast } = useToast();
  const { handleSubmit } = useFormContext<WorkNewSchemaType>();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const { mutate: createMutate } = useCreateWorkMutation();
  const { mutate: updateMutate } = useUpdateWorkMutation(id ?? '');

  const onValid: SubmitHandler<WorkNewSchemaType> = ({
    thumbnails,
    modifyCount,
    workDays,
    ...data
  }) => {
    const thumbnailImageIds = thumbnails
      .map(({ fileId }) => fileId)
      .filter((id) => id !== undefined);

    const requestData: WorkNewRequestType = {
      thumbnailImageIds,
      modifyCount: Number(modifyCount) || 0,
      workDays: Number(workDays),
      ...data,
    };

    if (id) updateMutate(requestData);
    else createMutate(requestData);
  };

  const onInvalid: SubmitErrorHandler<WorkNewSchemaType> = () => {
    toast({
      variant: 'destructive',
      description: '유효하지 않은 값이 있습니다.',
    });
  };

  return (
    <form
      id={FORM_ID.workNew}
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      {children}
    </form>
  );
}
