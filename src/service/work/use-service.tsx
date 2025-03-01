import { ToastAction } from '@/components/ui/toast';
import { PATH } from '@/constants/path';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';

import { workScrapToggle } from './service';

export function useWorkScrapMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, isScrapping }: { id: string; isScrapping: boolean }) =>
      workScrapToggle(id, isScrapping),

    onSuccess: (data) => {
      const toastOption = data.isScrapping
        ? {
            description: '스크랩했습니다.',
            action: (
              <ToastAction
                link={PATH.myScrap}
                altText="스크랩 보기"
              >
                스크랩 보기
              </ToastAction>
            ),
          }
        : {
            description: '스크랩을 취소했습니다.',
            className: 'justify-center',
          };

      toast(toastOption);
    },
  });
}
