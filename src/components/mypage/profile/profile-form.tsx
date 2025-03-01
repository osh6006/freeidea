'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import {
  ProfileSchemaType,
  profileSchema,
} from '@/lib/zod/profile/profile-schema';
import {
  useMyPageProfileQuery,
  useUpdateProfileMutation,
} from '@/service/mypage/use-service';
import { zodResolver } from '@hookform/resolvers/zod';

const ProfileForm = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const { data: profile } = useMyPageProfileQuery();
  const { mutate: updateProfileMutate } = useUpdateProfileMutation();

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    defaultValues: {
      nickname: profile?.nickname ?? '',
      introduction: profile?.introduction ?? '',
      email: profile?.email ?? '',
      profileImage: {
        id: undefined,
        url: profile?.profileImageUrl ?? undefined,
      },
    },
  });

  const onValid: SubmitHandler<ProfileSchemaType> = ({
    profileImage,
    nickname,
    introduction,
    email,
    tempToken,
  }) => {
    updateProfileMutate({
      profileImageId: profileImage?.id,
      nickname,
      introduction,
      email,
      tempToken,
    });
  };

  const onInvalid = () => {
    toast({
      variant: 'destructive',
      description: '입력 값을 확인해 주세요.',
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onValid, onInvalid)}
          className="flex flex-col gap-[30px] w-[360px]"
          autoComplete="off"
        >
          {children}
          <Button
            type="submit"
            className="w-full mt-[10px]"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            완료
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProfileForm;
