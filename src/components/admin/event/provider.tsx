'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import { PATH } from '@/constants/path';
import { adminEventFilterSchema } from '@/lib/zod/admin/event-filter-schema';
import {
  AdminEventFilterSchemaType,
  AdminEventKeywordType,
} from '@/types/admin/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from 'zustand';

interface EventState {
  formState: AdminEventFilterSchemaType;
  setFormState: (newState: AdminEventFilterSchemaType) => void;
}

export const initAdminEventFormState: AdminEventFilterSchemaType = {
  keyword: '',
  keywordType: 'TITLE' as AdminEventKeywordType,
  createDateRange: {
    from: undefined,
    to: undefined,
  },
  publishDateRange: {
    from: undefined,
    to: undefined,
  },
  isUsed: '',
};

export const useAdminEventStore = create<EventState>((set) => ({
  formState: initAdminEventFormState,
  setFormState: (newState) => set({ formState: newState }),
}));

const AdminEventProvider = ({ children }: { children: React.ReactNode }) => {
  const { formState, setFormState } = useAdminEventStore();
  const { replace } = useRouter();

  const form = useForm<AdminEventFilterSchemaType>({
    resolver: zodResolver(adminEventFilterSchema),
    defaultValues: formState,
  });

  const onSubmit = (values: AdminEventFilterSchemaType) => {
    setFormState(values);
    replace(PATH.adminEvents);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
};

export default AdminEventProvider;
