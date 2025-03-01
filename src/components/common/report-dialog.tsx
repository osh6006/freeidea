import { ReactNode } from 'react';
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useControllState } from '@/hooks/use-controll-state';
import { cn } from '@/lib/utils';
import {
  ReportSchemaType,
  reportSchema,
} from '@/lib/zod/request/report-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { create } from 'zustand';

import { UntitledIcon } from '../icon';

interface Props {
  step?: number;
  onStepChange?: (step: number) => void;
  defaultStep?: number;
  onValidSubmit?: SubmitHandler<ReportSchemaType>;
  onInvalidSubmit?: SubmitErrorHandler<ReportSchemaType>;
}

const useReportDialogStore = create<{
  step: number;
  setStep: (step: number) => void;
}>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
}));

interface ReportDialogProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ReportDialog = ({
  children,
  open,
  onOpenChange,
}: ReportDialogProps) => {
  const { setStep } = useReportDialogStore();

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (open) setStep(1);
        onOpenChange?.(open);
      }}
    >
      {children}
    </Dialog>
  );
};

export const ReportDialogContent = ({
  step: externalStep,
  onStepChange,
  onValidSubmit,
  onInvalidSubmit,
}: Props) => {
  const { step: internalStep, setStep: setInternalStep } =
    useReportDialogStore();

  const [step, setStep] = useControllState({
    internalState: internalStep,
    setInternalState: setInternalStep,
    externalState: externalStep,
    onStateChange: onStepChange,
  });

  const form = useForm<ReportSchemaType>({
    resolver: zodResolver(reportSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      contents: '',
    },
  });

  const { handleSubmit, reset } = form;

  const onNextClick = () => {
    setStep(2);
  };

  const wrrapredOnValidSubmit = (data: ReportSchemaType) => {
    reset();
    onValidSubmit?.(data);
  };

  return (
    <DialogContent
      className={cn(
        'w-dvw pc-screen:max-w-[440px] p-0 bg-white overflow-hidden'
      )}
    >
      <Form {...form}>
        <form
          onSubmit={
            onValidSubmit &&
            handleSubmit(wrrapredOnValidSubmit, onInvalidSubmit)
          }
        >
          {step === 1 && <ReportStep1 onNextClick={onNextClick} />}
          {step === 2 && <ReportStep2 />}
        </form>
      </Form>
    </DialogContent>
  );
};

export function ReportStep1({ onNextClick }: { onNextClick: () => void }) {
  const { control, formState } = useFormContext<ReportSchemaType>();

  return (
    <div
      className={cn(
        'flex flex-col justify-between w-full gap-[20px] h-dvh pc-screen:h-auto min-h-[590px]  '
      )}
    >
      <div className="w-full">
        <DialogHeader className="space-y-[30px] flex flex-col justify-between px-5 pt-[24px] pc-screen:space-y-0 pc-screen:px-[30px]">
          <div className="flex items-center">
            <DialogClose>
              <UntitledIcon.ChevronLeft className="mr-3 pc-screen:hidden" />
            </DialogClose>
            <DialogTitle className="typo-title-18-bold-100 pc-screen:typo-title-24-bold-140-tight text-center">
              신고하기
            </DialogTitle>
          </div>

          {/* Mobile */}
          <DialogDescription className="flex items-center gap-x-4  text-slate-500 text-left bg-slate-50 rounded-[5px] px-4 py-3 typo-body-14-regular-150-tight pc-screen:hidden">
            <div className="rounded-full bg-black size-1" />
            내용을 자세하게 입력해주세요
          </DialogDescription>

          {/* Desktop */}
          <DialogDescription className="text-slate-500 p-0 mt-[12px] typo-body-14-regular-150-tight text-center hidden pc-screen:block">
            내용을 자세하게 입력해주세요
          </DialogDescription>
        </DialogHeader>

        <div className="mt-[30px] space-y-[20px] px-[16px]">
          <FormField
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-[10px]">
                <FormLabel>신고 제목</FormLabel>
                <FormControl>
                  <Input
                    placeholder="신고 제목을 입력해 주세요"
                    {...field}
                    error={!!fieldState.error?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="contents"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-[10px] ">
                <FormLabel>신고 내용</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="메모를 적어주세요"
                      className="resize-none h-[160px] pc-screen:h-[120px]"
                      {...field}
                      error={!!fieldState.error?.message}
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
      </div>

      <div>
        <Separator className="bg-slate-200 w-full" />
        <div className="w-full flex items-center justify-center my-6 px-[30px]">
          <Button
            type="button"
            size="lg"
            className="w-full mx-auto "
            disabled={!formState.isValid}
            onClick={onNextClick}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ReportStep2() {
  return (
    <div className={'w-full px-[20px] py-[16px]'}>
      <DialogHeader className="text-left">
        <DialogTitle>정말 신고하시겠어요?</DialogTitle>
        <DialogDescription>
          이용약관에 따라 불이익을 받을 수 있습니다.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-10 w-full ">
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
          >
            취소
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="submit">확인</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
