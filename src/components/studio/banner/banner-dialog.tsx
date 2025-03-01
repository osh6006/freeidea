'use client';

import { useState } from 'react';

import StepOne from '@/components/studio/banner/step-one';
import StepTwo from '@/components/studio/banner/step-two';
import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Image01 } from '@untitled-ui/icons-react';

const BannerDialog = () => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        className={cn(
          'p-[12px] w-[40px] h-[40px] absolute bottom-[20px] right-0 text-slate-800',
          buttonVariants({ variant: 'outline', size: 'icon' })
        )}
        onClick={() => {
          setStep(1);
        }}
      >
        <Image01 />
      </DialogTrigger>
      <DialogContent
        className={cn(
          'max-w-[868px] max-h-dvh flex flex-col',
          step === 1 ? 'w-[540px]' : 'w-[868px]'
        )}
      >
        {step === 1 && (
          <StepOne
            setStep={setStep}
            setOpen={setOpen}
          />
        )}
        {step === 2 && <StepTwo setOpen={setOpen} />}
      </DialogContent>
    </Dialog>
  );
};

export default BannerDialog;
