import React from 'react';
import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { CommonAvatar } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useCreateFeedCommentMutation } from '@/service/feed/use-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const FormSchema = z.object({
  comment: z
    .string({ required_error: '내용을 입력해주세요' })
    .min(1, { message: '댓글은 1글자 이상 입력해야 합니다.' })
    .max(500, { message: '댓글은 500글자 이하로 입력이 가능 합니다.' }),
});

const FeedDetailCommentForm = () => {
  const { id: feedId }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { comment: '' },
  });

  const { mutate: createCommentMutate, isPending: isCreatePending } =
    useCreateFeedCommentMutation();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    createCommentMutate({ feedId, comment: data.comment });
    form.reset({ comment: '' });
  };

  return (
    <div className="flex items-center gap-x-[10px] mt-[20px]">
      <CommonAvatar
        nickname={myInfo?.nickname}
        src={myInfo?.profileImageUrl}
        className="size-6 border"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex gap-x-6 items-center border border-slate-200 rounded"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="댓글을 입력해 주세요"
                    className="w-full px-[10px] py-[12px] border-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={isCreatePending}
            className="px-[10px] py-1 typo-body-14-bold-100-tight text-slate-500 whitespace-nowrap"
          >
            입력
          </button>
        </form>
      </Form>
    </div>
  );
};

export default FeedDetailCommentForm;
