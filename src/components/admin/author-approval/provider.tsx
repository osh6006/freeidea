'use client';

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Form } from '@/components/ui/form';
import { PATH } from '@/constants/path';
import { authorApprovalSchema } from '@/lib/zod/admin/author-approval-schema';
import {
  AuthorApprovalRequestStatusType,
  AuthorApprovalSchemaType,
  AuthorApprovalkeywordType,
} from '@/types/admin/author-approval';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from 'zustand';

interface AuthorApprovalState {
  formState: AuthorApprovalSchemaType;
  setFormState: (newState: AuthorApprovalSchemaType) => void;
}

export const initAuthorApprovalFormState = {
  keyword: '',
  keywordType: 'ALL' as AuthorApprovalkeywordType,
  applyDateRange: {
    from: undefined,
    to: undefined,
  },
  examineDateRange: {
    from: undefined,
    to: undefined,
  },
  requestStatus: '' as AuthorApprovalRequestStatusType,
};

export const useAuthorApprovalStore = create<AuthorApprovalState>((set) => ({
  formState: initAuthorApprovalFormState,
  setFormState: (newState) => set({ formState: newState }),
}));

const AuthorApprovalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { formState, setFormState } = useAuthorApprovalStore();
  const { replace } = useRouter();

  const form = useForm<AuthorApprovalSchemaType>({
    resolver: zodResolver(authorApprovalSchema),
    defaultValues: formState,
  });

  const onSubmit = (values: AuthorApprovalSchemaType) => {
    setFormState(values);
    replace(PATH.adminAuthorApproval);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  );
};

export default AuthorApprovalProvider;
