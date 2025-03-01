import React from 'react';
import { useForm } from 'react-hook-form';

import TextCounter from '@/components/common/text-counter';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Spinner from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { notiSchema } from '@/lib/zod/studio/noti-schema';
import { useStudioUpdateNoticeMutation } from '@/service/studio/use-service';
import { NotiSchemaType } from '@/types/studio';
import { zodResolver } from '@hookform/resolvers/zod';

const StudioNotiModify = ({
  contents,
  isFixed,
  setMode,
  noticeId,
}: {
  noticeId: string;
  setMode: (mode: 'modify' | 'readOnly') => void;
} & NotiSchemaType) => {
  const { mutate, isPending } = useStudioUpdateNoticeMutation(noticeId);

  const form = useForm<NotiSchemaType>({
    resolver: zodResolver(notiSchema),
    defaultValues: {
      contents: contents,
      isFixed,
    },
  });

  const onSubmit = (data: NotiSchemaType) => {
    mutate(
      {
        contents: data.contents,
        isFixed: data.isFixed,
      },
      {
        onSuccess: () => {
          setMode('readOnly');
        },
      }
    );
  };

  const contentsLength = form.watch('contents')?.length || 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full"
      >
        <div className="my-[30px]">
          <FormField
            control={form.control}
            name="contents"
            render={({ field }) => (
              <FormItem className="relative ">
                <FormControl>
                  <Textarea
                    {...field}
                    className="w-full h-[182px] rounded-[2px]"
                    placeholder="공지를 적어주세요 "
                  />
                </FormControl>
                <TextCounter
                  count={contentsLength}
                  limit={100}
                  className="absolute bottom-[10px] right-[10px] text-slate-500 typo-body-14-regular-150-tight"
                />
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-x-2">
          <Button
            size="lg"
            className="w-[220px]"
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => setMode('readOnly')}
          >
            취소
          </Button>
          <Button
            size="lg"
            className="w-[220px]"
            type="submit"
            disabled={isPending}
          >
            {!isPending ? '수정 하기' : <Spinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StudioNotiModify;
