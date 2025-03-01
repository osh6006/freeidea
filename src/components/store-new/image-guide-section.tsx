'use client';

import { useTermStore } from '@/store/work-new';
import { Check } from '@untitled-ui/icons-react';

import { Button } from '../ui/button';
import { Dialog, DialogTrigger } from '../ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTitle,
  TooltipTrigger,
} from '../ui/tooltip';
import DailogImageGuideContent from './dailog-image-guide-content';

const ImageGuideSection = () => {
  const { isTermAgreed } = useTermStore();

  if (isTermAgreed) return null;

  return (
    <section className="mt-[40px]">
      <h2 className="typo-title-20-bold-100-tight mb-[10px]">
        이미지 등록 기준 동의
      </h2>
      <div className="mb-[20px]">
        프리디어에서 제공하는 심의 가이드를 반드시 확인해주세요.
      </div>
      <Dialog>
        <Tooltip defaultOpen>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                className="space-x-[6px]"
                size="lg"
              >
                <Check className="size-[20px]" />
                <span>동의</span>
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="bottom">
            <TooltipTitle>이미지 등록 기준 동의를 해주세요</TooltipTitle>
          </TooltipContent>
        </Tooltip>

        <DailogImageGuideContent />
      </Dialog>
    </section>
  );
};

export default ImageGuideSection;
