'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Image from 'next/image';

import { ChevronDown } from 'lucide-react';

import CommonEditor from '@/components/common/editor/common-editor';
import { UntitledIcon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import Spinner from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useUploadFile } from '@/service/file/use-service';
import { EventWriteSchemaType } from '@/types/admin/event';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import AdminContentsWrapper from '../common/contents-wrapper';

const formItemDefaultStyles = 'space-y-2';
const formStyles = {
  item: {
    title: cn(formItemDefaultStyles, ''),
    desc: cn(formItemDefaultStyles, ''),
    publishedAt: cn(formItemDefaultStyles, ''),
    thumbnail: cn(formItemDefaultStyles, ''),
    contents: cn(formItemDefaultStyles, 'col-span-2'),
  },
};

const EventForm = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const {
    control,
    watch,
    setValue,
    clearErrors,
    resetField,
    formState: { defaultValues },
  } = useFormContext<EventWriteSchemaType>();

  // File
  const { mutate, isPending } = useUploadFile();
  const thumbnailImageUrl = watch('thumbnailImageUrl');
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    if (file) {
      mutate(file, {
        onSuccess(data) {
          setValue('thumbnailImageId', data.fileId);
          setValue('thumbnailImageUrl', data.fileUrl);
          clearErrors('thumbnailImageId');
        },
      });
    }
  };

  const handleDeleteImage = () => {
    resetField('thumbnailImageId');
    setValue('thumbnailImageId', '');
    setValue('thumbnailImageUrl', '');
  };

  return (
    <AdminContentsWrapper className="grid grid-cols-2 gap-5">
      {/* 제목 */}
      <FormField
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <FormItem className={formStyles.item.title}>
            <FormLabel>제목</FormLabel>
            <div className="w-full flex flex-col">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    error={!!fieldState.error}
                    placeholder="이벤트 제목을 입력해 주세요"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* 이벤트 설명 */}
      <FormField
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <FormItem className={formStyles.item.desc}>
            <FormLabel>설명</FormLabel>
            <div className="w-full flex flex-col">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    error={!!fieldState.error}
                    placeholder="이벤트에 대해 간단하게 설명해 주세요"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <Separator className="col-span-2 m-0" />

      {/* 게시일 */}
      <FormField
        control={control}
        name="publishedAt"
        render={({ field, fieldState }) => (
          <FormItem className={formStyles.item.publishedAt}>
            <FormLabel>게시일</FormLabel>
            <div className="w-full">
              <Popover
                open={isCalendarOpen}
                onOpenChange={(open) => setCalendarOpen(open)}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'calendar-button w-full px-[10px] h-[48px] text-left font-normal text-slate-800 rounded-[4px] focus:ring-[2px] focus:ring-slate-800 bg-white hover:bg-slate-50 ',
                        isCalendarOpen && 'ring-slate-800 ring-[2px]',
                        fieldState.error?.message
                          ? 'bg-pink-50 border-error'
                          : ''
                      )}
                    >
                      {field.value ? (
                        format(field?.value, 'yy.MM.dd')
                      ) : (
                        <span className="text-slate-300 typo-body-14-regular-150-tight">
                          이벤트를 게시할 날짜를 선택해 주세요
                        </span>
                      )}
                      <ChevronDown className="h-5 w-5 text-slate-800 ml-auto" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
                  <Calendar
                    mode="single"
                    className="w-fit mx-auto"
                    numberOfMonths={1}
                    selected={field.value}
                    onSelect={field.onChange}
                    fromDate={new Date()}
                    initialFocus
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {/* 썸네일 */}
      <FormField
        control={control}
        name="thumbnailImageId"
        render={({ field, fieldState }) => (
          <FormItem className={formStyles.item.thumbnail}>
            <FormLabel>이미지 업로드</FormLabel>
            <div
              className={cn(
                `flex flex-col items-center justify-center border h-[300px] relative rounded-lg transition-colors group bg-white overflow-hidden`,
                fieldState.error?.message ? 'bg-pink-50 border-error' : ''
              )}
            >
              <Label
                htmlFor={field.name}
                className={cn(
                  'absolute inset-0 cursor-pointer',
                  field.value && ' pointer-events-none'
                )}
              >
                <Input
                  key={field.value}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e)}
                  className={cn('hidden')}
                  id={field.name}
                />
              </Label>
              {isPending ? (
                <Spinner className="size-10" />
              ) : !field.value ? (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src="/icons/file-add-slate.svg"
                    alt="upload"
                    width={50}
                    height={50}
                  />
                  <div className="text-slate-300 typo-body-14-regular-150-tight">
                    썸네일 이미지를 선택해 주세요
                  </div>
                </div>
              ) : (
                <>
                  <Image
                    alt="previw Image"
                    src={thumbnailImageUrl || ''}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    className="bg-slate-50 p-0.5 rounded-full top-1 right-1 absolute"
                    onClick={handleDeleteImage}
                  >
                    <UntitledIcon.X />
                  </button>
                </>
              )}
            </div>

            <FormMessage />
          </FormItem>
        )}
      />
      <Separator className="col-span-2 my-5" />

      {/* 내용 */}
      <FormField
        control={control}
        name="contents"
        render={({ field, fieldState }) => {
          return (
            <FormItem className={formStyles.item.contents}>
              <FormLabel>내용</FormLabel>
              <div className="w-full flex flex-col">
                <FormControl className="w-full">
                  <CommonEditor
                    content={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    isDirty={fieldState.isDirty}
                    initialContent={defaultValues?.contents}
                    className="bg-white rounded-lg overflow-hidden "
                    contentsClassName="h-[500px]"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          );
        }}
      />
    </AdminContentsWrapper>
  );
};

export default EventForm;
