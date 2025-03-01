import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import TextCounter from '@/components/common/text-counter';
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
import { cn } from '@/lib/utils';
import { notiSchema } from '@/lib/zod/studio/noti-schema';
import {
  useStudioCreateNoticeMutation,
  useStudioProfileQuery,
} from '@/service/studio/use-service';
import { NotiSchemaType } from '@/types/studio';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pin02 } from '@untitled-ui/icons-react';

const BoardNotiWrite = () => {
  const params = useParams<{ id: string }>();
  const { data: profileInfo } = useStudioProfileQuery(params.id);

  const { mutate, isPending } = useStudioCreateNoticeMutation(params.id);

  const form = useForm<NotiSchemaType>({
    resolver: zodResolver(notiSchema),
    defaultValues: {
      isFixed: false,
    },
  });

  const onSubmit = (data: NotiSchemaType) => {
    mutate({ ...data });
    form.reset({ contents: '', isFixed: false });
  };

  const contentsLength = form.watch('contents')?.length || 0;
  const isFixed = form.watch('isFixed') || false;

  return (
    <div className="w-full border border-slate-200 rounded-[10px] p-[30px] mb-[30px] ">
      <div className="flex justify-between">
        <span className="flex">
          <CommonAvatar
            nickname={profileInfo?.nickname}
            src={profileInfo?.profileImageUrl}
            className="size-[40px]"
          />
          <span className="space-y-[6px] ml-[12px]">
            <div className="typo-body-16-bold-100-tight">
              {profileInfo?.nickname}
            </div>
            <div className="typo-body-14-regular-150-tight text-slate-500 flex items-center gap-x-[6px]">
              공지
            </div>
          </span>
        </span>
        <button
          type="button"
          onClick={() => {
            form.setValue('isFixed', !isFixed);
          }}
        >
          <Pin02
            width={20}
            height={20}
            className={cn('', isFixed ? 'text-primary' : 'text-slate-200')}
            fill={isFixed ? '#FF96B5' : 'none'}
          />
        </button>
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

          <Button
            size="lg"
            className="w-[220px]"
            type="submit"
            disabled={isPending}
          >
            {!isPending ? '공지 쓰기' : <Spinner />}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BoardNotiWrite;
