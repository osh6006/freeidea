'use client';

import { ReactNode } from 'react';
import { DefaultValues, useForm } from 'react-hook-form';

import { WORK_NEW_DEFAULT_VALUES } from '@/constants/work-new/default-values';
import { workNewSchema } from '@/lib/zod/store/work-new-schema';
import { WorkNewSchemaType } from '@/types/work';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '../ui/form';

interface Props {
  children: ReactNode;
  defaultValues?: DefaultValues<WorkNewSchemaType>;
}

const StoreFormProvider = ({ children, defaultValues }: Props) => {
  const methods = useForm<WorkNewSchemaType>({
    resolver: zodResolver(workNewSchema),
    defaultValues: defaultValues ?? WORK_NEW_DEFAULT_VALUES,
  });

  return <Form {...methods}>{children}</Form>;
};

export default StoreFormProvider;
