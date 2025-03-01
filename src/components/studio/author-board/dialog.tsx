import { SecureButton } from '@/components/common/secure-button';
import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Calendar } from '@untitled-ui/icons-react';

import AuthorBoardTab from './tab';

const AuthorBoardDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SecureButton
          requiredLevel="USER"
          className={cn(
            buttonVariants({
              size: 'lg',
              variant: 'outline',
            }),
            'gap-x-[6px]'
          )}
        >
          <Calendar />
          <span className="text-slate-600 typo-body-16-medium-100-tight">
            작가보드
          </span>
        </SecureButton>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] py-[10px]">
        <DialogHeader className="py-[19px]">
          <span className="text-center typo-title-18-medium-100">작가보드</span>
        </DialogHeader>
        <AuthorBoardTab />
      </DialogContent>
    </Dialog>
  );
};

export default AuthorBoardDialog;
