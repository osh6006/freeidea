'use client';

import { useFormContext } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CommentNewSchemaType } from '@/lib/zod/comment-new-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useCreateComment,
  usePortfolioCommentList,
} from '@/service/portfolio/use-service';

function CommentWriteSection() {
  const params = useParams<{ id: string }>();
  const { data: myInfo } = useMyInfoQuery();
  const { data: commentData } = usePortfolioCommentList({
    id: params.id,
  });

  const { mutate: createCommentMutate } = useCreateComment(params.id);

  const methods = useFormContext<CommentNewSchemaType>();
  const { control, handleSubmit, reset } = methods;

  if (!commentData) return null;

  const isCommentUsed = commentData.pages[0].isCommentUsed;

  const placeholder = isCommentUsed
    ? '댓글을 입력해주세요.'
    : '댓글 작성이 불가능해요.';

  const onValid = (data: CommentNewSchemaType) => {
    createCommentMutate(data);
    reset();
  };

  return (
    <div className="flex items-center gap-[10px] relative">
      <Avatar className="size-[24px] shrink-0">
        <AvatarImage src={myInfo?.profileImageUrl} />
        <AvatarFallback />
      </Avatar>
      <form
        onSubmit={handleSubmit(onValid)}
        className="w-full"
      >
        <FormField
          control={control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="pr-[80px]"
                  placeholder={placeholder}
                  disabled={!isCommentUsed}
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="absolute right-[18px] top-1/2 -translate-y-1/2 px-[10px] py-[4px] typo-body-14-bold-100-tight text-slate-500"
          disabled={!isCommentUsed}
        >
          입력
        </button>
      </form>
    </div>
  );
}

export default CommentWriteSection;
