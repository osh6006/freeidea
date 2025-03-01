'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import { PATH } from '@/constants/path';
import useQueryString from '@/hooks/use-query-string';
import { adminMemberFilterSchema } from '@/lib/zod/admin/member-filter-schema';
import { AdminMemberFilterSchemaType } from '@/types/admin/member';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from 'zustand';

interface MemberState {
  formState: AdminMemberFilterSchemaType;
  setFormState: (newState: AdminMemberFilterSchemaType) => void;
}

export const initAdminMemberFormState: AdminMemberFilterSchemaType = {
  keyword: '',
  keywordType: 'ALL',
  createDateRange: {
    from: undefined,
    to: undefined,
  },
  userLevel: 'ALL',
  userStatus: 'ALL',
};

export const useAdminMemberStore = create<MemberState>((set) => ({
  formState: initAdminMemberFormState,
  setFormState: (newState) => set({ formState: newState }),
}));

const AdminMemberProvider = ({ children }: { children: React.ReactNode }) => {
  const { formState, setFormState } = useAdminMemberStore();
  const { replace } = useRouter();

  const form = useForm<AdminMemberFilterSchemaType>({
    resolver: zodResolver(adminMemberFilterSchema),
    defaultValues: formState,
  });

  const onSubmit = (values: AdminMemberFilterSchemaType) => {
    setFormState(values);
    replace(PATH.adminMembers);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
};

export default AdminMemberProvider;
