'use client';

import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { workOrderSchema } from '@/lib/zod/work-order-schema';
import { WorkOrderSchemaType } from '@/types/work';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '../../ui/form';

export default function WorkOrderFormProvider({ children }: PropsWithChildren) {
  const { id } = useParams<{ id: string }>();

  const methods = useForm<WorkOrderSchemaType>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      prouctId: id,
      options: [],
      additional: {
        checked: false,
        count: 1,
      },
    },
  });

  return (
    <Form {...methods}>
      <form>{children}</form>
    </Form>
  );
}
