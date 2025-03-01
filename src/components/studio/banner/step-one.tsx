'use client';

import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { useBannerClearMutation } from '@/service/studio/use-service';

const StepOne = ({
  setStep,
  setOpen,
}: {
  setStep: (step: number) => void;
  setOpen: (isOpen: boolean) => void;
}) => {
  const params: { id: string } = useParams();

  const { mutate, isPending } = useBannerClearMutation(params.id);

  return (
    <>
      <DialogTitle className="text-center">배너 변경하기</DialogTitle>
      <DialogDescription className="text-center typo-title-18-regular-150">
        배너를 변경하시겠습니까?
      </DialogDescription>
      <DialogFooter className="mt-[20px] w-full flex justify-between">
        <Button
          variant="outline"
          className="flex-1"
          disabled={isPending}
          onClick={() => {
            mutate();
            setOpen(false);
          }}
        >
          초기화
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setStep(2);
          }}
          disabled={isPending}
          className="flex-1"
        >
          변경하기
        </Button>
      </DialogFooter>
    </>
  );
};

export default StepOne;
