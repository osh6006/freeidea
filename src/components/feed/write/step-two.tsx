import { ChangeEvent, useEffect, useState } from 'react';

import Image from 'next/image';

import { buttonVariants } from '@/components/ui/button';
import { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useUploadFiles } from '@/service/file/use-service';
import {
  checkFiles,
  useFeedWriteActions,
  useFeedWriteStates,
} from '@/store/feed/write';
import { FileUploadResult } from '@/types/file';

import { FeedWriteCarousel } from './carousel';

const FeedWriteStepTwo = () => {
  const { selectedFileInfos } = useFeedWriteStates();
  const { addFileInfos, setAlert, setGlobalLoading } = useFeedWriteActions();

  const { mutate: uploadFiles, isPending } = useUploadFiles();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleAlert = (message: string) => {
    setAlert({
      isOpen: true,
      title: message,
      desc: '',
      mode: 'full-single',
      textAlign: 'text-center',
      onConfirm() {},
    });
  };

  const resetInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = '';
  };

  const handleUploadSuccess = (data: FileUploadResult[], reset: () => void) => {
    addFileInfos(
      data.map((file) => ({
        products: [],
        feedImageId: file.fileId,
        feedImageUrl: file.fileUrl,
      })) || []
    );
    reset();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
      ? Array.from(event.target.files)
      : [];

    const { success, message } = checkFiles(selectedFileInfos, selectedFiles);

    if (!success) {
      handleAlert(message || '이미지 파일이 형식에 맞지 않습니다.');
      resetInput(event);
      return;
    }

    uploadFiles(selectedFiles, {
      onSuccess: (data) => handleUploadSuccess(data, () => resetInput(event)),
      onError: (error) => {
        handleAlert(error.message || '이미지 업로드 중 오류가 발생하였습니다.');
        setGlobalLoading(false);
        resetInput(event);
      },
    });

    resetInput(event);
  };

  useEffect(() => {
    setGlobalLoading(isPending);
  }, [isPending, setGlobalLoading]);

  return (
    <div className="flex flex-col h-full px-[30px] mt-[20px]">
      <div className="flex-1">
        <FeedWriteCarousel
          setApi={setApi}
          readOnly
        />
      </div>
      <ul className="flex-1 flex-wrap flex items-center gap-x-[10px] gap-y-2 px-[30px] mx-auto py-[20px] ">
        {selectedFileInfos.map((info, i) => (
          <li
            key={info.feedImageId}
            className={cn(
              'relative size-[60px] border-[3px] border-transparent overflow-hidden rounded-sm',
              current === i + 1 && 'border-primary'
            )}
          >
            <Image
              alt="file"
              fill
              src={info.feedImageUrl}
              className={cn('aspect-square')}
              style={{
                objectFit: 'cover',
              }}
            />
          </li>
        ))}

        {selectedFileInfos.length < 10 && (
          <li
            key="iamlonely"
            className="size-[60px] "
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
              multiple
              id="step-two-image-upload"
              disabled={isPending}
              tabIndex={1}
            />
            <label
              aria-disabled={isPending}
              htmlFor="step-two-image-upload"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'h-full w-full aspect-square p-0'
              )}
              tabIndex={1}
            >
              <Image
                width={36}
                height={36}
                alt="file"
                src="/icons/file-add-slate.svg"
              />
            </label>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedWriteStepTwo;
