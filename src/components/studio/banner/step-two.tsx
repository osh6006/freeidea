import React, { useRef, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import GlobalAlertDialog from '@/components/common/global-alert-dialog';
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { BLUR_IMG } from '@/constants/common';
import { imageFileSchema, validateImageResolution } from '@/lib/zod/image-file';
import { useUploadFile } from '@/service/file/use-service';
import { useBannerUpdateMutation } from '@/service/studio/use-service';
import { XCircle } from '@untitled-ui/icons-react';

const StepTwo = ({
  setOpen: setModalOpen,
}: {
  setOpen: (isOpen: boolean) => void;
}) => {
  const { id: studioId }: { id: string } = useParams();
  const { mutate: uploadMutate } = useUploadFile();
  const { mutate: updateMutate } = useBannerUpdateMutation(studioId);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
    message: '',
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const parsedFile = imageFileSchema.safeParse(file);

    if (file && parsedFile.success) {
      try {
        const isValidResolution = await validateImageResolution(file);

        if (isValidResolution.success) {
          setImage(file);
          setPreview(URL.createObjectURL(file));
        } else {
          setAlertInfo((prev) => ({
            ...prev,
            isOpen: true,
            message:
              isValidResolution.errors?.[0] ||
              '이미지 해상도가 유효하지 않습니다.',
          }));
        }
      } catch (error) {
        setAlertInfo((prev) => ({
          ...prev,
          isOpen: true,
          message: '이미지를 처리하는 중 오류가 발생했습니다.',
        }));
      }
    } else {
      setAlertInfo((prev) => ({
        ...prev,
        isOpen: true,
        message:
          parsedFile.error?.errors[0].message ||
          '파일에서 알 수 없는 오류가 발생했습니다.',
      }));
    }
  };

  const handleDeletePreview = () => {
    setPreview(null);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (image) {
      uploadMutate(image, {
        onSuccess: ({ fileId: titleImageId }) => {
          updateMutate(titleImageId);
          setModalOpen(false);
        },
      });
    }
  };

  const setOpen = (isOpen: boolean) => {
    setAlertInfo((prev) => ({ ...prev, isOpen }));
  };

  return (
    <>
      <DialogTitle className="text-center">배너 변경하기</DialogTitle>
      <DialogDescription className="text-center typo-title-18-regular-150">
        배너를 업로드해주세요
      </DialogDescription>

      <div className="border-y border-slate-200 h-[583px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-slate-500">
          {preview ? (
            <div className="mt-[20px] relative w-[720px] h-[360px] rounded-[10px] aspect-[2/1] overflow-hidden ">
              <Image
                fill
                sizes="720px"
                src={preview}
                alt="미리보기"
                placeholder="blur"
                blurDataURL={BLUR_IMG}
                style={{
                  objectFit: 'cover',
                }}
              />
              <button
                onClick={handleDeletePreview}
                className="absolute top-5 right-5"
              >
                <XCircle />
              </button>
            </div>
          ) : (
            <>
              <div className="typo-title-20-bold-140">
                작업물을 업로드해주세요
              </div>
              <div className="mt-[30px] typo-body-16-medium-100-tight">
                최대 10MB 크기의 그림파일 (jpg, png)을 업로드 할 수 있습니다.
              </div>
              <div className="flex flex-col gap-y-2 mt-[30px] ">
                <div className="typo-body-16-medium-100-tight">
                  최소 해상도 : 1020 x 460
                </div>
                <div className="typo-body-16-medium-100-tight">
                  최대 해상도 : 4320 x 2160
                </div>
              </div>
              <Button
                onClick={triggerFileInput}
                className="mt-[40px] w-[320px]"
              >
                작업물 올리기
              </Button>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </>
          )}
        </div>
      </div>
      <div className="mt-[20px]">
        <Button
          onClick={handleUpload}
          className="w-full"
          disabled={image === null ? true : false}
        >
          업로드
        </Button>
      </div>

      <GlobalAlertDialog
        title={alertInfo.message}
        isOpen={alertInfo.isOpen}
        setIsOpen={setOpen}
        onConfirm={() =>
          setAlertInfo((prev) => {
            return {
              ...prev,
              isOpen: false,
              message: '',
            };
          })
        }
      />
    </>
  );
};

export default StepTwo;
