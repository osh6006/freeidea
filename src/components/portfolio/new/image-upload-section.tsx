'use client';

import { ChangeEvent, useState } from 'react';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';

import ImageWithFallback from '@/components/common/image-with-fallback';
import { UntitledIcon } from '@/components/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipDescription,
  TooltipTitle,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import useDragDropFile from '@/hooks/use-drag-drop-file';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useUploadFiles } from '@/service/file/use-service';
import { PortfolioNewSchemaType } from '@/types/portfolio';
import { ChevronDown, ChevronUp, Trash01 } from '@untitled-ui/icons-react';

import { Button, buttonVariants } from '../../ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '../../ui/form';
import Spinner from '../../ui/spinner';

function ImageUploadSection() {
  const { control, formState, watch } =
    useFormContext<PortfolioNewSchemaType>();
  const { remove, move } = useFieldArray({
    control,
    name: 'portfolioImages',
  });

  const portfolioImages = watch('portfolioImages');

  return (
    <section className="w-full flex flex-col gap-[30px] items-center">
      {portfolioImages.map(({ id }, index) => (
        <div
          className={'w-full'}
          key={id}
        >
          <StyledImage index={index} />
          <div className="py-[8px] flex gap-[80px] items-center justify-center w-full text-slate-500 [&>svg]:cursor-pointer [&>svg]:size-[20px]">
            <button
              type="button"
              onClick={() => remove(index)}
              className="disabled:opacity-25"
            >
              <Trash01 />
            </button>
            <button
              type="button"
              onClick={() => move(index, index - 1)}
              disabled={index === 0}
              className="disabled:opacity-25"
            >
              <ChevronUp />
            </button>
            <button
              type="button"
              onClick={() => move(index, index + 1)}
              disabled={index === portfolioImages.length - 1}
              className="disabled:opacity-25"
            >
              <ChevronDown />
            </button>
          </div>
        </div>
      ))}

      <AppendBox />

      {formState.errors.portfolioImages?.root && (
        <div className="text-error">
          {formState.errors.portfolioImages.root.message}
        </div>
      )}
    </section>
  );
}

function BoxWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative  flex flex-col justify-center aspect-auto items-center w-full overflow-hidden border-2 border-border rounded-[10px] bg-slate-50 text-slate-500',
        className
      )}
    >
      {children}
    </div>
  );
}

function StyledImage({ index }: { index: number }) {
  const { getValues } = useFormContext<PortfolioNewSchemaType>();

  const { url } = getValues(`portfolioImages.${index}`);

  return (
    <BoxWrapper className={cn(index === 0 && 'border-pink-500')}>
      {index === 0 && (
        <span className="absolute z-[10] top-0 left-0 p-[6px] bg-pink-500 typo-body-14-bold-100-tight text-white ">
          대표
        </span>
      )}
      <ImageWithFallback
        src={url}
        alt="portfolio image"
        className="object-contain"
        width={720}
        sizes="100vw"
        height={405}
      />
    </BoxWrapper>
  );
}

function AppendBox() {
  const [isAppendMode, setIsAppendMode] = useState(true);
  const { toast } = useToast();
  const { control, watch } = useFormContext<PortfolioNewSchemaType>();
  const { field } = useController({
    control,
    name: 'portfolioImages',
  });

  const { mutate: uploadFiles, isPending } = useUploadFiles();
  const isChallengeApplied = watch('challenge.usage') === 'on';
  const { isDragging, handleDragOver, handleDragLeave, handleDrop } =
    useDragDropFile();

  const handleUpload = (files: FileList | File[]) => {
    if (isChallengeApplied && files.length > 1) {
      toast({
        variant: 'destructive',
        description: '도전작은 한 개의 작품만 업로드가 가능해요.',
      });
      return;
    }

    const prevFiles = field.value;
    if (files.length + prevFiles.length > 10) {
      toast({
        variant: 'destructive',
        description: '최대 10개까지 업로드가 가능해요.',
      });
      return;
    }

    uploadFiles(files, {
      onSuccess: (uploadedFiles) => {
        const newFiles = uploadedFiles.map(
          ({ fileId, fileUrl }) =>
            ({
              id: fileId,
              url: fileUrl,
              status: 'success',
            }) as const
        );

        field.onChange([...prevFiles, ...newFiles]);
        setIsAppendMode(false);
      },
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) return;
    handleUpload(files);
  };

  const portfolioImages = field.value;
  if (isChallengeApplied && portfolioImages.length >= 1)
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button
              className="w-[240px]"
              size="2xl"
              variant="outline"
              type="button"
              disabled
            >
              추가하기
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <TooltipTitle>도전작은 1작품만!</TooltipTitle>
          <TooltipDescription>
            도전작은 한 개의 작품만 업로드가 가능해요.
          </TooltipDescription>
        </TooltipContent>
      </Tooltip>
    );

  if (!isAppendMode)
    return (
      <Button
        className="w-[240px]"
        size="2xl"
        variant="outline"
        type="button"
        onClick={() => setIsAppendMode(true)}
      >
        추가하기
      </Button>
    );

  return (
    <div className="flex flex-col gap-[10px] items-center w-full">
      <FormField
        control={control}
        name="portfolioImages"
        render={({ field, fieldState }) => (
          <FormItem
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, handleUpload)}
            className={cn(
              'relative  flex flex-col justify-center aspect-[16/9] items-center w-full overflow-hidden border-2 border-border rounded-[10px] bg-slate-50 text-slate-500',
              fieldState.error && 'border-error',
              isDragging && 'bg-slate-200'
            )}
          >
            {isPending ? (
              <Spinner />
            ) : (
              <div className={cn('flex flex-col justify-center items-center')}>
                <span className="mb-[30px] typo-title-20-bold-140">
                  자유롭게 작업물을 업로드해주세요
                </span>
                <span className="mb-[10px] typo-body-16-medium-100-tight">
                  권장 사이즈
                </span>
                <span className="mb-[40px] typo-body-16-medium-100-tight">
                  1:1비율, 16:9비율
                </span>
                <FormLabel
                  className={cn(buttonVariants(), 'w-[320px] cursor-pointer')}
                >
                  작업물 올리기
                </FormLabel>
              </div>
            )}

            <FormControl ref={field.ref}>
              <input
                className="sr-only"
                type="file"
                accept="image/*"
                multiple={isChallengeApplied ? false : true}
                onChange={handleFileChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex gap-[10px]">
        <button
          type="button"
          className="disabled:opacity-25"
          onClick={() => setIsAppendMode(false)}
          disabled={portfolioImages.length === 0}
        >
          <UntitledIcon.Trash01 />
        </button>
      </div>
    </div>
  );
}

export default ImageUploadSection;
