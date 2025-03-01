'use client';

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import { COMMON_SNS_LINK_VALUES } from '@/constants/common';
import { cn } from '@/lib/utils';
import { AuthorApplyFormSchema } from '@/lib/zod/my-page/author-apply-schema';
import { useUploadFile } from '@/service/file/use-service';
import { useAuthorApplyMutation } from '@/service/mypage/use-service';
import { MyPageAuthorApplyType } from '@/types/mypage';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';

const AuthorApplyForm = () => {
  const form = useForm<MyPageAuthorApplyType>({
    resolver: zodResolver(AuthorApplyFormSchema),
  });

  const { mutate: fileUploadMutate, isPending: fileUploadPending } =
    useUploadFile();
  const { mutate: submitMutate, isPending: submitPending } =
    useAuthorApplyMutation();

  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    desc: '',
  });
  const [images, setImages] = useState<{ fileId: string; url: string }[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (images.length >= 3) {
      setAlertState({
        isOpen: true,
        title: '최대 업로드 가능한 이미지 개수를 초과하였습니다.',
        desc: '현재 업로드한 이미지 개수를 확인해 주세요.',
      });
      return;
    }

    if (file) {
      fileUploadMutate(file, {
        onSuccess: (data) => {
          const newImage = { fileId: data.fileId, url: data.fileUrl };
          setImages((prev) => [...prev, newImage]);

          const newArr = [
            ...(form.getValues('productImageIds') || []),
            data.fileId,
          ];
          form.setValue('productImageIds', newArr);
          e.target.value = '';
        },
        onError: (error) => {
          setAlertState({
            isOpen: true,
            title: error.message,
            desc: '',
          });
        },
      });
    }
  };

  const handleImageDelete = (fileId: string) => {
    setImages((prev) => prev.filter((image) => image.fileId !== fileId));

    const updatedIds = form
      .getValues('productImageIds')
      ?.filter((id) => id !== fileId);
    form.setValue('productImageIds', updatedIds || []);
  };

  const onSubmit = (data: MyPageAuthorApplyType) => {
    submitMutate(data, {
      onSuccess: () => {
        form.reset({
          name: '',
          productImageIds: [],
          snsType: '',
          snsLinkUrl: undefined,
        });
        setImages([]);
        setAlertState({
          isOpen: true,
          title: '작가 신청이 완료 되었습니다.',
          desc: '관리자 검수 후에 작가 회원으로 전환됩니다.',
        });
      },
      onError: (error) => {
        setAlertState({
          isOpen: true,
          title: error.message || '알 수 없는 오류가 발생하였습니다.',
          desc: '',
        });
      },
    });
  };

  const isPending = fileUploadPending || submitPending;

  const isSNSType = form.watch('snsType') !== 'NONE' && !!form.watch('snsType');

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-[20px]"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>성함</FormLabel>
                <FormControl>
                  <Input
                    placeholder="본인 성함을 입력해주세요"
                    className="mt-[10px] w-[340px]"
                    {...field}
                    disabled={isPending}
                    error={fieldState.invalid}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="snsType"
            render={({ field, fieldState }) => (
              <FormItem className="mt-[30px]">
                <FormLabel className="w-[150px] mt-[10px]">SNS 링크</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue('snsLinkUrl', undefined);
                        form.clearErrors('snsLinkUrl');
                      }}
                      value={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            'w-[340px] mt-[10px]',
                            fieldState.error ? 'bg-pink-50 border-error' : ''
                          )}
                        >
                          <SelectValue placeholder="작품을 확인할 수 있는 링크를 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COMMON_SNS_LINK_VALUES.map((link) => (
                          <SelectItem
                            key={link.value}
                            value={link.value}
                          >
                            {link.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {isSNSType ? (
            <>
              <FormField
                control={form.control}
                name="snsLinkUrl"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="작품을 확인할 수 있는 링크를 입력해주세요"
                        className="mt-[10px] w-[340px]"
                        {...field}
                        error={fieldState.invalid}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : null}

          <FormField
            control={form.control}
            name="productImageIds"
            render={() => (
              <FormItem className="mt-[30px]">
                <FormLabel className="w-[150px] ">이미지 업로드</FormLabel>
                <FormControl>
                  <div className="flex gap-4 mt-[10px]">
                    {images.map((image) => (
                      <div
                        key={image.fileId}
                        className="relative w-[134px] h-[134px] border border-slate-200 rounded"
                      >
                        <Image
                          src={image.url}
                          alt="uploaded-preview"
                          fill
                          className="object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageDelete(image.fileId)}
                          className="absolute size-[20px] top-1 right-1 bg-slate-500 flex items-center justify-center text-xs text-white rounded-full p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={isPending}
                    />
                    {images.length < 3 && (
                      <Label
                        htmlFor="image"
                        aria-disabled={isPending}
                        className="flex flex-col items-center justify-center size-[134px] border border-slate-200 cursor-pointer"
                      >
                        {isPending ? (
                          <Spinner className="size-[36px]" />
                        ) : (
                          <>
                            <Image
                              width={36}
                              height={36}
                              src="/icons/file-add-slate.svg"
                              alt="icon"
                            />
                            <div className="typo-body-14-regular-150-tight text-slate-500">{`${images.length} / 3`}</div>
                          </>
                        )}
                      </Label>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-[40px] w-full max-w-[320px]"
          >
            완료
          </Button>
        </form>
      </Form>

      <Dialog
        open={alertState.isOpen}
        onOpenChange={(isOpen) =>
          setAlertState((prev) => ({ ...prev, isOpen }))
        }
      >
        <DialogContent>
          <DialogTitle>{alertState.title}</DialogTitle>
          <DialogDescription>{alertState.desc}</DialogDescription>
          <DialogFooter className="w-full flex justify-end">
            <DialogClose
              className={cn(
                buttonVariants({
                  variant: 'outline',
                })
              )}
            >
              취소
            </DialogClose>
            <DialogClose className={cn(buttonVariants({}))}>확인</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthorApplyForm;
