import { useEffect, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useFeedModifyQuery } from '@/service/feed/use-service';
import {
  FileInfo as FeedFileInfo,
  useFeedWriteActions,
  useFeedWriteStates,
} from '@/store/feed/write';
import { DialogClose } from '@radix-ui/react-dialog';

import FeedWriteFooter from './footer';
import FeedWriteStepOne from './step-one';
import FeedWriteStepThree from './step-three';
import FeedWriteStepTwo from './step-two';
import FeedTimeLine from './time-line';

const FeedWriteDialog = ({
  feedId,
  children,
}: {
  feedId?: string;
  children?: React.ReactNode;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { step, alertInfo, setStep } = useFeedWriteStates();
  const { reset, setAllData, setAlert, setAlertOpen } = useFeedWriteActions();

  const mode = feedId ? 'update' : 'create';
  const { data: feedInfo, isSuccess } = useFeedModifyQuery(feedId || '');

  useEffect(() => {
    if (feedInfo && isSuccess) {
      const fileInfosFormServer: FeedFileInfo[] = feedInfo.feedImages.map(
        (info) => {
          return {
            feedImageId: info.feedImageId,
            feedImageUrl: info.feedImageUrl,
            products: info.products,
          };
        }
      );

      setAllData({
        fileInfos: fileInfosFormServer,
        contents: feedInfo.contents,
      });
      setStep(2);
    }
    return () => {
      reset();
    };
  }, [reset, feedInfo, isSuccess, setStep, setAllData]);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          setAlert({
            isOpen: true,
            mode: 'end-double',
            title: '정말로 취소하시겠습니까?',
            desc: '작성된 데이터는 더 이상 저장되지 않습니다.',
            textAlign: 'text-start',
            onConfirm: () => {
              setIsDialogOpen(open);
              reset();
            },
          });
        }
      }}
    >
      <DialogTrigger
        asChild
        className="w-full"
      >
        <button
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-fit p-0">
        <div className="w-dvw max-w-[1000px] h-[810px] [@media(max-height:900px)]:h-dvh ">
          <div className="flex flex-col h-full">
            <div className="w-full flex flex-col items-center justify-center gap-y-2 mt-8 ">
              <DialogTitle className="typo-title-24-bold-140-tight text-center">
                새 피드 만들기
              </DialogTitle>
              <FeedTimeLine
                currentStep={step}
                maxStep={3}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {step == 1 && <FeedWriteStepOne />}
              {step == 2 && <FeedWriteStepTwo />}
              {step == 3 && <FeedWriteStepThree />}
            </div>
            <FeedWriteFooter
              mode={mode}
              feedId={feedId}
              setIsOpen={setIsDialogOpen}
            />
          </div>
        </div>
      </DialogContent>

      {/* alert */}
      <Dialog
        open={alertInfo.isOpen}
        onOpenChange={(open) => {
          setAlertOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader className={alertInfo.textAlign}>
            <DialogTitle>{alertInfo.title}</DialogTitle>
            <DialogDescription>{alertInfo.desc}</DialogDescription>
          </DialogHeader>
          <DialogFooter className={cn('mt-[40px]')}>
            {alertInfo.mode === 'full-single' && (
              <>
                <DialogClose
                  className={buttonVariants({
                    className: 'w-full',
                  })}
                  onClick={() => alertInfo.onConfirm()}
                >
                  확인
                </DialogClose>
              </>
            )}

            {alertInfo.mode === 'end-double' && (
              <>
                <DialogClose
                  className={buttonVariants({})}
                  onClick={() => alertInfo.onConfirm()}
                >
                  확인
                </DialogClose>
                <DialogClose
                  className={buttonVariants({
                    variant: 'outline',
                  })}
                >
                  취소
                </DialogClose>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default FeedWriteDialog;
