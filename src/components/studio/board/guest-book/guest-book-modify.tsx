import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { getHashedColor } from '@/lib/utils';
import { guestBookSchema } from '@/lib/zod/studio/guest-book-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useUpdateGuestBookMutation } from '@/service/studio/use-service';
import { GuestBookSchemaType } from '@/types/studio';
import { zodResolver } from '@hookform/resolvers/zod';

const StudioGuestBookModify = ({
  setMode,
  contents,
  guestBookId,
}: {
  setMode: (mode: 'modify' | 'readOnly') => void;
  contents: string;
  guestBookId: string;
}) => {
  const { mutate, isPending } = useUpdateGuestBookMutation(guestBookId);

  const form = useForm<GuestBookSchemaType>({
    resolver: zodResolver(guestBookSchema),
    defaultValues: {
      contents: contents,
    },
  });

  const onSubmit = (data: GuestBookSchemaType) => {
    mutate(
      { contents: data.contents },
      {
        onSuccess: () => {
          setMode('readOnly');
        },
      }
    );
    form.reset({ contents: '' });
  };

  const contentsLength = form.watch('contents')?.length || 0;

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          <div className="relative my-[30px] ">
            <FormField
              control={form.control}
              name="contents"
              disabled={isPending}
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full h-[182px] rounded-[2px]"
                      placeholder="내용을 적어주세요 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="absolute bottom-[10px] right-[10px] text-slate-500 typo-body-14-regular-150-tight">
              {`${contentsLength}/100`}
            </div>
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
              {!isPending ? '수정하기' : <Spinner />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudioGuestBookModify;
