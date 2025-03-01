'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import {
  ControllerRenderProps,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useUploadFiles } from '@/service/file/use-service';
import { useTermStore } from '@/store/work-new';
import { WorkNewSchemaType } from '@/types/work';
import { DragEndEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { InfoCircle } from '@untitled-ui/icons-react';

import {
  SortableDndContext,
  SortableItem,
  SortableListner,
} from '../common/dnd';
import TextCounter from '../common/text-counter';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import Spinner from '../ui/spinner';
import {
  Tooltip,
  TooltipContent,
  TooltipDescription,
  TooltipTitle,
  TooltipTrigger,
} from '../ui/tooltip';
import ImageGuideDailogContent from './dailog-image-guide-content';

const BaseInfoSection = () => {
  const { control } = useFormContext<WorkNewSchemaType>();
  const searchParams = useSearchParams();
  const { isTermAgreed, agree } = useTermStore();

  const id = searchParams.get('id');
  useEffect(() => {
    if (id) agree();
  }, [id, agree]);
  return (
    <section className="space-y-[30px]">
      <h2 className="typo-title-20-bold-100-tight">기본 정보 설정</h2>
      <div className="flex justify-between gap-[82px]">
        <FormField
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <FormItem className="flex w-full justify-between gap-[30px] items-start">
              <FormLabel className="flex items-center shrink-0 gap-[4px] w-[100px]">
                <span>제목</span>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoCircle className="text-slate-500 size-[16px]" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <TooltipTitle>
                      중요한 키워드는 앞 부분에 적어주세요.
                    </TooltipTitle>
                    <TooltipDescription>
                      제목이 너무 길 경우 화면에서 잘려보일 수 있어요.
                      <br />
                      이목을 끌 수 있는 표현으로 호기심을 자극해 보세요.
                    </TooltipDescription>
                  </TooltipContent>
                </Tooltip>
              </FormLabel>
              <div className="flex flex-col gap-[10px] w-full">
                <div className="relative">
                  <FormControl className="w-full">
                    <Input
                      className="pr-[72px]"
                      placeholder="나의 작품을 잘 표현할 수 있는 제목을 작성해 주세요!"
                      {...field}
                      disabled={!isTermAgreed}
                      error={!!fieldState.error}
                    />
                  </FormControl>
                  <TextCounter
                    className="absolute bottom-1/2 translate-y-1/2 right-[18px] w-fit "
                    count={field.value.length}
                    limit={40}
                  />
                </div>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
      <div>작품 썸네일 이미지</div>
      <div
        className={cn(
          'bg-pink-50 rounded-[6px] p-[20px] space-y-[20px]',
          !isTermAgreed && 'bg-slate-tint-5'
        )}
      >
        <div className="space-y-[11px]">
          <div className="text-pink-500 typo-title-18-bold-100 flex items-center gap-[6px]">
            <InfoCircle className="size-[20px]" /> 작품 썸네일 이미지 가이드
          </div>
          <ul>
            <li>10MB 이하의 JPG, JPEG, PNG, GIF 파일</li>
            <li>사이즈 530x530px</li>
            <li>메인 이미지 1장, 서브 이미지 5장 등록 가능</li>
            <li>사진을 길게 누르고 이동하면 순서를 변경할 수 있어요</li>
          </ul>
        </div>
        <div className="space-y-[11px]">
          <div
            className={cn(
              'text-pink-500 typo-title-18-bold-100 flex items-center gap-[6px]',
              !isTermAgreed && 'text-text-disabled'
            )}
          >
            <InfoCircle className="size-[20px]" /> 이미지 등록 기준
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                color="default"
                variant="outline"
                size="lg"
                disabled={!isTermAgreed}
              >
                3초만에 보는 등록 기준
              </Button>
            </DialogTrigger>
            <ImageGuideDailogContent buttonActiveAlways />
          </Dialog>
        </div>
      </div>
      <FileInputSection />
    </section>
  );
};

const FileInputSection = () => {
  const [limitDialogOpen, setLimitDialogOpen] = useState(false);
  const { control, watch, getValues } = useFormContext<WorkNewSchemaType>();
  const { fields, remove, move } = useFieldArray({
    control,
    name: 'thumbnails',
  });
  const { isTermAgreed } = useTermStore();
  const { mutate: uploadMutate } = useUploadFiles();

  const onRemoveClick = (targetIndex: number) => {
    remove(targetIndex);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over?.id) return;
    if (active.id === over.id) return;

    const activeIndex = fields.findIndex(({ fileId }) => fileId === active.id);
    const overIndex = fields.findIndex(({ fileId }) => fileId === over.id);
    move(activeIndex, overIndex);
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<WorkNewSchemaType, 'thumbnails'>
  ) => {
    const { files } = e.currentTarget;

    const totalCount = (files?.length || 0) + getValues('thumbnails').length;
    if (totalCount > 6) {
      setLimitDialogOpen(true);
      return;
    }

    const newFileArray = Array.from(files || []);

    const newValue = newFileArray.map((file) => ({
      file,
      status: 'loading',
    }));
    field.onChange([...field.value, ...newValue]);

    uploadMutate(newFileArray, {
      onSuccess: (data) => {
        const newValue = newFileArray.map((file, index) => ({
          file,
          fileId: data[index].fileId,
          fileUrl: data[index].fileUrl,
          status: 'success',
        }));

        field.onChange([...field.value, ...newValue]);
      },

      onError: () => {
        const newErrorValue = newFileArray.map((file) => ({
          file,
          status: 'error',
        }));

        field.onChange([...field.value, ...newErrorValue]);
      },
    });
  };

  return (
    <div className="flex gap-[10px]">
      <FormField
        control={control}
        name="thumbnails"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormControl ref={field.ref}>
              <Input
                type="file"
                accept="image/*"
                className="sr-only"
                multiple
                disabled={!isTermAgreed}
                onChange={(e) => handleFileChange(e, field)}
              />
            </FormControl>
            <FormLabel className="flex flex-col items-center justify-center cursor-pointer size-[134px] bg-white border border-slate-200 ">
              <Image
                width={36}
                height={36}
                alt="file"
                src="/icons/file-add-slate.svg"
              />

              <TextCounter
                count={watch('thumbnails').length}
                limit={6}
              />
            </FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />

      <SortableDndContext
        items={watch('thumbnails').map(({ fileId }) => fileId)}
        strategy={horizontalListSortingStrategy}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-[10px] relative">
          {watch('thumbnails').length >= 1 && (
            <div className="absolute top-0 left-0 size-[134px] border border-pink-500 z-10 rounded pointer-events-none">
              <div className="p-[6px] typo-body-14-bold-100-tight text-white bg-pink-500 w-fit">
                대표
              </div>
            </div>
          )}
          {watch('thumbnails').map(({ status, fileId, fileUrl }, index) => {
            return (
              <SortableItem
                key={fileId}
                id={fileId}
                className="relative size-[134px] text-sm border border-slate-200 rounded overflow-hidden flex items-center justify-center"
              >
                <SortableListner>
                  {status === 'success' && fileUrl && (
                    <Image
                      width={134}
                      height={134}
                      className="object-cover aspect-square"
                      src={fileUrl}
                      alt={`thumbnail-${index}`}
                    />
                  )}
                  {status === 'error' && <>error</>}
                  {status === 'loading' && <Spinner />}
                </SortableListner>

                <button
                  type="button"
                  className="absolute right-[10px] top-[10px] "
                  onClick={() => onRemoveClick(index)}
                >
                  <Image
                    alt="remove"
                    width={24}
                    height={24}
                    src="/icons/x-circle_img.png"
                  />
                </button>
              </SortableItem>
            );
          })}
        </div>
      </SortableDndContext>
      <ImageCountLimitDialog
        open={limitDialogOpen}
        onOpenChange={setLimitDialogOpen}
      />
    </div>
  );
};

function ImageCountLimitDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>이미지 등록 기준</DialogTitle>
          <DialogDescription>
            6장 이하의 이미지를 등록해주세요.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full">동의</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BaseInfoSection;
