import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { feedWriteSchema } from '@/lib/zod/feed/schema';
import { feedQueryKey } from '@/service/feed/query-option';
import {
  useCreateFeedMutation,
  useUpdateFeedMutation,
} from '@/service/feed/use-service';
import { useFeedWriteActions, useFeedWriteStates } from '@/store/feed/write';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

const FeedWriteFooter = ({
  mode = 'create',
  feedId,
  setIsOpen,
}: {
  mode?: 'create' | 'update';
  feedId?: string;
  setIsOpen?: (isOpen: boolean) => void;
}) => {
  const {
    step,
    selectedFileInfos,
    contents,
    setAlertOpen,
    setAlert,
    globalLoading,
    notProductClear,
  } = useFeedWriteStates();
  const { setStep } = useFeedWriteActions();

  const isUpload = step === 3;
  const router = useRouter();

  const { mutate: createMutate, isPending: isCreatePending } =
    useCreateFeedMutation();

  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateFeedMutation(feedId || '');
  const queryClient = useQueryClient();

  const uploadDisabled =
    selectedFileInfos.length <= 0 ||
    isCreatePending ||
    globalLoading ||
    isUpdatePending;

  const transformFeedData = () => ({
    feedImages: selectedFileInfos.map((info) => ({
      feedImageId: info.feedImageId,
      products:
        info.products?.map((product) => ({
          productId: product.productId || '',
          positionX: product.positionX,
          positionY: product.positionY,
        })) || undefined,
    })),
    contents,
  });

  const handleValidationError = (error: z.ZodError) => {
    setAlert({
      isOpen: true,
      title: error.errors[0].message,
      desc: '',
      mode: 'full-single',
      textAlign: 'text-center',
      onConfirm() {},
    });
  };

  const handleUpload = () => {
    const newData = transformFeedData();
    const { success, error } = feedWriteSchema.safeParse(newData);

    if (!success) {
      handleValidationError(error);
      return;
    }

    if (mode === 'create') {
      createMutate(newData, {
        onSuccess: (data) => router.push(PATH.feedDetail(data.feedId)),

        onError: (data) => {
          setAlertOpen(true);
          setAlert({
            isOpen: true,
            title: data.message || '업로드 중 문제가 발생했습니다.',
            desc: '',
            mode: 'full-single',
            textAlign: 'text-start',
            onConfirm() {},
          });
        },
      });
    } else {
      updateMutate(newData, {
        onSuccess() {
          if (setIsOpen && feedId) {
            queryClient.invalidateQueries({
              queryKey: feedQueryKey.detail(feedId),
            });
            setIsOpen(false);
          }
        },

        onError: (data) => {
          setAlertOpen(true);
          setAlert({
            isOpen: true,
            title: data.message || '업로드 중 문제가 발생했습니다.',
            desc: '',
            mode: 'full-single',
            textAlign: 'text-center',
            onConfirm() {},
          });
        },
      });
    }
  };

  const handleClick = () => {
    if (isUpload) {
      notProductClear();
      handleUpload();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-[30px] py-6 border-t border-slate-200 min-h-[70px]">
      {step > 1 && (
        <>
          <Button
            variant="outline"
            className="w-[120px]"
            onClick={() => setStep(step - 1)}
            disabled={isCreatePending || globalLoading || isUpdatePending}
          >
            이전
          </Button>
          <Button
            className={cn(step <= 1 ? 'w-full' : 'w-[120px]')}
            onClick={handleClick}
            disabled={uploadDisabled}
          >
            {isCreatePending || globalLoading || isUpdatePending ? (
              <Spinner />
            ) : (
              `${isUpload ? '업로드' : '다음'}`
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default FeedWriteFooter;
