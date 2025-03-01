import { useToast } from '@/hooks/use-toast';
import APIError from '@/lib/api-error';
import { useMutation } from '@tanstack/react-query';

import { REPORT_ENDPOINT, report } from './service';

export function useReportMutation(endpoint: keyof typeof REPORT_ENDPOINT) {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: Parameters<typeof report>[1];
      body: Parameters<typeof report>[2];
    }) => report(endpoint, id, body),

    onSuccess: () => {
      toast({ title: '신고가 접수되었습니다.' });
    },
  });
}
