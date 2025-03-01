'use client';

import { UntitledIcon } from '@/components/icon';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useAuthorApprovalMutation } from '@/service/admin/author-approval/use-service';
import { IAuthorApprovalDetail } from '@/types/admin/author-approval';

const OptionStyles = {
  wrapper: 'w-full gap-x-1',
  icon: 'size-5',
};

const AuthorApprovalMenuContents = ({
  id,
  email,
  nickName,
  userName,
}: {
  id: string;
  email: string;
  userName: string;
  nickName: string;
}) => {
  const { mutate, isPending } = useAuthorApprovalMutation();
  const { toast } = useToast();

  const handleAllow = () => {
    mutate({
      authorApplyIds: [id],
      isApproved: true,
    });
  };

  const handleReject = () => {
    mutate({
      authorApplyIds: [id],
      isApproved: false,
    });
  };

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      description: '클립보드에 복사 되었습니다.',
    });
  };

  return (
    <div>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <DialogTrigger
            className={OptionStyles.wrapper}
            disabled={isPending}
          >
            <UntitledIcon.File02 className={OptionStyles.icon} />
            신청서 보기
          </DialogTrigger>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={OptionStyles.wrapper}
          disabled={isPending}
          onSelect={handleAllow}
        >
          <UntitledIcon.CheckVerified02 className={OptionStyles.icon} />
          승인하기
        </DropdownMenuItem>
        <DropdownMenuItem
          className={OptionStyles.wrapper}
          disabled={isPending}
          onSelect={handleReject}
        >
          <UntitledIcon.ClipboardX className={OptionStyles.icon} />
          <span className="text-error">취소하기</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger
            className={OptionStyles.wrapper}
            disabled={isPending}
          >
            <UntitledIcon.Copy02 className={OptionStyles.icon} />
            복사하기
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                disabled={isPending}
                onSelect={() => handleCopy(email || '')}
              >
                아이디 복사
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isPending}
                onSelect={() => handleCopy(userName || '')}
              >
                이름 복사
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isPending}
                onSelect={() => handleCopy(nickName || '')}
              >
                닉네임 복사
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </div>
  );
};

export default AuthorApprovalMenuContents;
