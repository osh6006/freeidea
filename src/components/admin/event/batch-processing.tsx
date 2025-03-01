import { UntitledIcon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { adminEventQueryKey } from '@/service/admin/event/query-option';
import {
  useDeleteEventMutation,
  useToggleEventMutation,
} from '@/service/admin/event/use-service';
import { useQueryClient } from '@tanstack/react-query';

export const buttonStyles = {
  base: 'gap-x-2',
  public:
    'hover:bg-blue-50 text-blue-600 hover:text-blue-700 border-blue-300 hover:border-blue-300',
  private:
    'hover:bg-yellow-50 text-yellow-600 hover:text-yellow-700 border-yellow-300 hover:border-yellow-300',
  delete:
    'hover:bg-red-50 text-red-600 hover:text-red-700 border-red-300 hover:border-red-300',
};

const AdminBatchProcessing = ({
  total,
  useCount,
  unUseCount,
  checkedList,
  setCheckList,
}: {
  checkedList: string[];
  total: number;
  useCount: number;
  unUseCount: number;
  setCheckList: (list: string[]) => void;
}) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate: deleteMutate, isPending: deletePending } =
    useDeleteEventMutation();
  const { mutate: toggleMutate, isPending: togglePending } =
    useToggleEventMutation();
  const handleDelete = () => {
    if (checkedList.length <= 0) {
      toast({
        description: '체크된 항목이 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    deleteMutate(checkedList, {
      onSuccess: () => {
        setCheckList([]);
      },
    });
  };

  const toggleUse = (value: boolean) => {
    if (checkedList.length <= 0) {
      toast({
        description: '체크된 항목이 없습니다.',
        variant: 'destructive',
      });
      return;
    }

    toggleMutate(
      {
        eventIds: checkedList,
        isUsed: value,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: adminEventQueryKey.lists(),
          });
          setCheckList([]);
        },
      }
    );
  };

  const disabled = deletePending || togglePending;

  return (
    <div className="flex justify-between items-center">
      <span className="flex gap-x-2">
        <span>
          전체 : <strong className="text-black">{total}</strong>
        </span>
        |
        <span>
          공개 : <strong className="text-blue-600">{useCount}</strong>
        </span>
        |
        <span>
          비공개 : <strong className="text-yellow-500">{unUseCount}</strong>
        </span>
      </span>
      <span className="space-x-2">
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(buttonStyles.base, buttonStyles.public)}
          onClick={() => toggleUse(true)}
        >
          <UntitledIcon.Eye width={20} />
          공개
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(buttonStyles.base, buttonStyles.private)}
          onClick={() => toggleUse(false)}
        >
          <UntitledIcon.EyeOff width={20} />
          비공개
        </Button>
        <Button
          type="button"
          variant="outline"
          className={cn(buttonStyles.base, buttonStyles.delete)}
          onClick={handleDelete}
          disabled={disabled}
        >
          <UntitledIcon.Trash01 width={20} />
          삭제
        </Button>
      </span>
    </div>
  );
};

export default AdminBatchProcessing;
