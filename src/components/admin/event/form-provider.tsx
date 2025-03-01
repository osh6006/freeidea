'use client';

import { DefaultValues, useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { eventWriteSchema } from '@/lib/zod/admin/event-write-schema';
import { EventWriteSchemaType } from '@/types/admin/event';
import { zodResolver } from '@hookform/resolvers/zod';

const EventFormProvider = ({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues?: DefaultValues<EventWriteSchemaType>;
}) => {
  const form = useForm<EventWriteSchemaType>({
    resolver: zodResolver(eventWriteSchema),
    defaultValues,
  });

  return <Form {...form}>{children}</Form>;
};

export default EventFormProvider;
