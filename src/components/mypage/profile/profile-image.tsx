'use client';

import { ChangeEvent, useId } from 'react';
import { useFormContext } from 'react-hook-form';

import { Icon } from '@/components/icon';
import { CommonAvatar } from '@/components/ui/avatar';
import Spinner from '@/components/ui/spinner';
import { ProfileSchemaType } from '@/lib/zod/profile/profile-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useUploadFile } from '@/service/file/use-service';

const ProfileImage = () => {
  const id = useId();
  const {
    mutate: uploadFileMutate,
    data: uploadedFile,
    isPending,
  } = useUploadFile();
  const { watch, setValue } = useFormContext<ProfileSchemaType>();
  const profileImage = watch('profileImage');
  const { data: myInfo } = useMyInfoQuery();
  const handleChangeProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFileMutate(file, {
      onSuccess: (data) => {
        setValue(
          'profileImage',
          {
            id: data.fileId,
            url: data.fileUrl,
          },
          { shouldDirty: true }
        );
      },
    });
  };

  return (
    <>
      <div className="relative w-fit">
        <label
          htmlFor={id}
          className="flex cursor-pointer justify-center relative items-center rounded-full aspect-square w-[150px] bg-slate-50 overflow-hidden"
        >
          {isPending ? (
            <Spinner />
          ) : (
            <CommonAvatar
              src={uploadedFile?.fileUrl || profileImage?.url || undefined}
              className="size-full"
              nickname={myInfo?.nickname}
            />
          )}
        </label>
        <Icon.ImageChange className="absolute bottom-[10px] right-[12px]" />
      </div>

      <input
        id={id}
        type="file"
        className="sr-only"
        onChange={handleChangeProfileImage}
      />
    </>
  );
};

export default ProfileImage;
