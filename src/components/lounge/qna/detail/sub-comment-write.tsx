import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { qnaCommentSchema } from '@/lib/zod/qna/qna-comment-schema';
import { useCreateQnaAnswerComment } from '@/service/qna/use-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const SubCommentWrite = ({
  qnaAnswerId,
  setIsOpen,
}: {
  qnaAnswerId: string;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof qnaCommentSchema>>({
    resolver: zodResolver(qnaCommentSchema),
  });

  const { mutate, isPending } = useCreateQnaAnswerComment();

  const onSubmit = (data: z.infer<typeof qnaCommentSchema>) => {
    mutate(
      { qnaAnswerId, comment: data.comment },
      {
        onSuccess: () => {
          handleClose();
        },
      }
    );
  };

  const handleClose = () => {
    form.reset({
      comment: '',
    });
  };

  const contentsLength = form.watch('comment')?.length || 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border border-slate-200 rounded-[6px] p-[10px] mt-[10px]"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isPending}
                  placeholder="댓글을 남겨주세요"
                  className="border-none resize-none h-[92px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-x-[10px] w-full mt-[10px]">
          <span className="typo-body-14-regular-150-tight">{`${contentsLength}/300`}</span>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={handleClose}
            className="p-0 w-[80px]"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="p-0 w-[80px]"
          >
            남기기
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SubCommentWrite;
