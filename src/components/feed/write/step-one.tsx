import React, { ChangeEvent } from 'react';

import { buttonVariants } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useUploadFiles } from '@/service/file/use-service';
import {
  checkFiles,
  useFeedWriteActions,
  useFeedWriteStates,
} from '@/store/feed/write';
import { FileUploadResult } from '@/types/file';

const FeedWriteStepOne = () => {
  const { selectedFileInfos } = useFeedWriteStates();
  const { setFileInfos, setGlobalLoading, setAlert } = useFeedWriteActions();

  const { mutate: uploadFiles, isPending } = useUploadFiles();

  const resetInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = '';
  };

  const handleAlert = (message: string) => {
    setAlert({
      isOpen: true,
      title: message,
      textAlign: 'text-center',
      mode: 'full-single',
      desc: '',
      onConfirm() {},
    });
  };

  const handleUploadSuccess = (data: FileUploadResult[], reset: () => void) => {
    setFileInfos({
      fileInfos:
        data.map((file) => ({
          products: [],
          feedImageId: file.fileId,
          feedImageUrl: file.fileUrl,
        })) || [],
      isNext: true,
    });
    reset();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGlobalLoading(true);

    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];
    const { success, message } = checkFiles(selectedFileInfos, selectedFiles);

    if (!success) {
      handleAlert(message || '이미지 파일이 형식에 맞지 않습니다.');
      setGlobalLoading(false);
      resetInput(event);
      return;
    }

    uploadFiles(selectedFiles, {
      onSuccess: (data) => {
        handleUploadSuccess(data, () => resetInput(event));
        setGlobalLoading(false);
      },
      onError: (error) => {
        handleAlert(error.message || '이미지 업로드 중 오류가 발생하였습니다.');
        setGlobalLoading(false);
        resetInput(event);
      },
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-y-[30px] bg-slate-50 mt-[20px]">
        <div>자유롭게 작업물을 업로드 해주세요 (최대 10장)</div>
        <div>1:1비율</div>
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
            id="step-one-image-upload"
            disabled={isPending}
            tabIndex={0}
          />
          <label
            aria-disabled={isPending}
            htmlFor="step-one-image-upload"
            className={cn('w-[280px]', buttonVariants({}))}
            tabIndex={0}
          >
            {isPending ? <Spinner /> : '작업물 올리기'}
          </label>
        </div>
      </div>
    </div>
  );
};

export default FeedWriteStepOne;
