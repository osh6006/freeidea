import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { CommonAvatar } from '@/components/ui/avatar';
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
import { guestBookSchema } from '@/lib/zod/studio/guest-book-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useCreateGuestBookMustation } from '@/service/studio/use-service';
import { GuestBookSchemaType } from '@/types/studio';
import { zodResolver } from '@hookform/resolvers/zod';

const StudioGuestBookWrite = () => {
  const params = useParams<{ id: string }>();
  const { data: myInfo } = useMyInfoQuery();

  const { mutate, isPending } = useCreateGuestBookMustation(params.id);

  const form = useForm<GuestBookSchemaType>({
    resolver: zodResolver(guestBookSchema),
  });

  const onSubmit = (data: GuestBookSchemaType) => {
    mutate({ contents: data.contents });
    form.reset({ contents: '' });
  };

  const contentsLength = form.watch('contents')?.length || 0;

  return (
    <div className="w-full border border-slate-200 rounded-[10px] p-[30px] mb-[40px]">
      <div className="flex justify-between">
        <span className="flex">
          <CommonAvatar
            nickname={myInfo?.nickname}
            src={myInfo?.profileImageUrl}
            className="size-[40px]"
          />
          <span className="space-y-[6px] ml-[12px]">
            <div className="typo-body-16-bold-100-tight">
              {myInfo?.nickname}
            </div>
            <div className="typo-body-14-regular-150-tight text-slate-500 flex items-center gap-x-[6px]">
              방명록
            </div>
          </span>
        </span>
      </div>
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

          <Button
            size="lg"
            className="w-[220px]"
            type="submit"
            disabled={isPending}
          >
            {!isPending ? '방명록 남기기' : <Spinner />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StudioGuestBookWrite;
