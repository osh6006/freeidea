'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { APPLY_DATE_ARR, APPLY_PRICE_ARR } from '@/constants/request/apply';
import { cn } from '@/lib/utils';
import { ApplySchemaType, applySchema } from '@/lib/zod/request/apply-schema';
import { useApplyRequestMutation } from '@/service/request/use-service';
import { zodResolver } from '@hookform/resolvers/zod';

import Spinner from '../ui/spinner';

const ApplyForm = ({
  id,
  setOpen,
  setAlertOpen,
}: {
  id: string;
  setOpen: (isOpen: boolean) => void;
  setAlertOpen: (isOpen: boolean) => void;
}) => {
  const form = useForm<ApplySchemaType>({
    resolver: zodResolver(applySchema),
  });

  const { mutate, isPending } = useApplyRequestMutation();

  const onSubmit = (values: ApplySchemaType) => {
    mutate(
      {
        id,
        data: values,
      },
      {
        onSuccess() {
          setOpen(false);
          setAlertOpen(true);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full px-5 space-y-[20px] pc-screen:py-[30px] pc-screen:px-[30px]">
          {/* URL */}
          <FormField
            control={form.control}
            name="urlAddress"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2 pc-screen:space-y-[10px]">
                <FormLabel>작품 URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="작품 URL을 입력해 주세요"
                    {...field}
                    error={!!fieldState.error?.message}
                    disabled={isPending}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* 예상 금액 */}
          <FormField
            control={form.control}
            name="estimatedBudget"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2 pc-screen:space-y-[10px]">
                <FormLabel className="w-[150px]">작품 예상 금액</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            fieldState.error ? 'bg-pink-50 border-error' : ''
                          )}
                        >
                          <SelectValue placeholder="예상 금액을 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="">
                        {APPLY_PRICE_ARR.map((price) => (
                          <SelectItem
                            key={price.value}
                            value={price.value}
                          >
                            {price.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="mt-[10px]" />
                </div>
              </FormItem>
            )}
          />

          {/* 작업 예상 소요일 */}
          <FormField
            control={form.control}
            name="estimatedDate"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2 pc-screen:space-y-[10px]">
                <FormLabel className="w-[150px]">작품 예상 소요일</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(
                            fieldState.error ? 'bg-pink-50 border-error' : ''
                          )}
                        >
                          <SelectValue placeholder="예상 소요일을 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="">
                        {APPLY_DATE_ARR.map((date) => (
                          <SelectItem
                            key={date.value}
                            value={date.value}
                          >
                            {date.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="mt-[10px]" />
                </div>
              </FormItem>
            )}
          />
          {/* 신청 메모 */}
          <FormField
            control={form.control}
            name="memo"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2 pc-screen:space-y-[10px]">
                <FormLabel>신청 메모</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="메모를 적어주세요"
                      className="resize-none h-[160px] pc-screen:h-[120px]"
                      {...field}
                      error={!!fieldState.error?.message}
                      disabled={isPending}
                    />
                    <div className="absolute bottom-[10px] right-[10px] text-slate-500 typo-body-14-regular-150-tight">
                      {field?.value?.length || 0}/ 100
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="absolute bottom-3 pt-2 px-5 border-t w-full flex items-center bg-white justify-center pc-screen:px-0 pc-screen:pt-6 pc-screen:static">
          <Button
            type="submit"
            size="lg"
            className="w-[400px] mx-auto "
            disabled={isPending}
          >
            {isPending ? <Spinner /> : '지원하기'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ApplyForm;
