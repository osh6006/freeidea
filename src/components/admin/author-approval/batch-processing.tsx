import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuthorApprovalMutation } from '@/service/admin/author-approval/use-service';

const BatchProcessing = ({
  newProcessed,
  totalProcessed,
  checkedList,
  setCheckList,
}: {
  totalProcessed: number;
  newProcessed: number;
  checkedList: string[];
  setCheckList: (list: string[]) => void;
}) => {
  const { mutate, isPending } = useAuthorApprovalMutation();
  const { toast } = useToast();

  const handleReject = () => {
    if (checkedList.length <= 0) {
      toast({
        description: '체크된 항목이 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    mutate(
      {
        authorApplyIds: checkedList,
        isApproved: false,
      },
      {
        onSuccess: () => {
          setCheckList([]);
        },
      }
    );
  };
  const handleApprove = () => {
    if (checkedList.length <= 0) {
      toast({
        description: '체크된 항목이 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    mutate(
      {
        authorApplyIds: checkedList,
        isApproved: true,
      },
      {
        onSuccess: () => {
          setCheckList([]);
        },
      }
    );
  };

  return (
    <div className="flex justify-between items-center">
      <span className="flex gap-x-2">
        <span>
          총 신청 : <strong className="text-black">{totalProcessed}</strong>
        </span>
        |
        <span>
          새 신청 : <strong className="text-green-600">{newProcessed}</strong>
        </span>
      </span>
      <span className="space-x-2">
        <Button
          type="button"
          variant="outline"
          className="text-error"
          onClick={handleReject}
          disabled={isPending}
        >
          전체 취소
        </Button>
        <Button
          type="button"
          onClick={handleApprove}
          disabled={isPending}
        >
          전체 승인
        </Button>
      </span>
    </div>
  );
};

export default BatchProcessing;
