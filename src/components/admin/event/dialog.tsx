'use client';

import Link from 'next/link';

import { UntitledIcon } from '@/components/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants/path';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { adminEventQueryKey } from '@/service/admin/event/query-option';
import {
  useDeleteEventMutation,
  useToggleEventMutation,
} from '@/service/admin/event/use-service';
import { IAdminEvent } from '@/types/admin/event';

const itemStyles = 'flex items-center w-full gap-x-2';

const AdminEventOption = ({ id }: { id: string }) => {
  const { setPageQueriesData, rollbackQueriesData } = useOptimisticUpdate();

  const { mutate: toggleMutate } = useToggleEventMutation();
  const { mutate: deleteMutate } = useDeleteEventMutation();

  const handleUsed = (used: boolean) => {
    const previousData = setPageQueriesData<IAdminEvent>(
      {
        queryKey: adminEventQueryKey.lists(),
      },
      {
        target: (item) => item.eventId === id,
        updater: (item) => ({
          ...item,
          isUsed: used,
        }),
      }
    );
    toggleMutate(
      {
        eventIds: [id],
        isUsed: used,
      },
      {
        onError: () => {
          rollbackQueriesData(previousData);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteMutate([id]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UntitledIcon.DotsHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className={itemStyles}
          onSelect={() => handleUsed(true)}
        >
          <UntitledIcon.Eye width={20} />
          공개
        </DropdownMenuItem>
        <DropdownMenuItem
          className={itemStyles}
          onSelect={() => handleUsed(false)}
        >
          <UntitledIcon.EyeOff width={20} />
          비공개
        </DropdownMenuItem>
        <DropdownMenuItem
          className={itemStyles}
          onSelect={handleDelete}
        >
          <UntitledIcon.Trash01 width={20} />
          삭제
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`${PATH.adminEventCreate}?id=${id}`}
            className={itemStyles}
          >
            <UntitledIcon.PencilLine width={20} />
            수정
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminEventOption;
