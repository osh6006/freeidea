import Link from 'next/link';

import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';

import { buttonVariants } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import RequestApplyDialog from './apply-dialog';
import ReqquestChatDialog from './chat-dialog';

const RequestDetailActionButtons = ({ inquiryId }: { inquiryId: string }) => {
  const { data } = useMyInfoQuery();

  const level = data?.userLevel;

  return (
    <div className="flex gap-[10px]">
      {!level && (
        <>
          <NotLoginDialog
            triggerName="채팅문의"
            className={buttonVariants({
              size: '2xl',
              className: 'w-[170px]',
              variant: 'outline',
            })}
          />
          <NotLoginDialog
            triggerName="지원하기"
            className={buttonVariants({
              size: '2xl',
              className: 'w-[170px]',
            })}
          />
        </>
      )}
      {level === 'USER' && (
        <>
          <ReqquestChatDialog />
          <LowLevelDialog
            triggerName="지원하기"
            className={buttonVariants({
              size: '2xl',
              className: 'w-[170px]',
            })}
          />
        </>
      )}

      {level === 'AUTHOR' && (
        <>
          <ReqquestChatDialog />
          <RequestApplyDialog id={inquiryId} />
        </>
      )}
    </div>
  );
};

export default RequestDetailActionButtons;

export const RequestDetailMobileActionButtons = ({
  inquiryId,
}: {
  inquiryId: string;
}) => {
  const { data } = useMyInfoQuery();

  const level = data?.userLevel;

  return (
    <div className="fixed inset-x-0 bottom-0 flex gap-[10px] border-t z-20 py-4 px-5 bg-white pc-screen:hidden">
      {!level && (
        <>
          <NotLoginDialog
            triggerName="채팅문의"
            className={cn(
              buttonVariants({
                size: '2xl',
                variant: 'outline',
              }),
              'w-full'
            )}
          />
          <NotLoginDialog
            triggerName="지원하기"
            className={cn(
              buttonVariants({
                size: '2xl',
              }),
              'w-full'
            )}
          />
        </>
      )}
      {level === 'USER' && (
        <>
          <ReqquestChatDialog />
          <LowLevelDialog
            triggerName="지원하기"
            className={cn(
              buttonVariants({
                size: '2xl',
              }),
              'w-full'
            )}
          />
        </>
      )}

      {level === 'AUTHOR' && (
        <>
          <ReqquestChatDialog />
          <RequestApplyDialog id={inquiryId} />
        </>
      )}
    </div>
  );
};

function NotLoginDialog({
  triggerName,
  className,
}: {
  triggerName: string;
  className: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className={className}>{triggerName}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            로그인 이후 이용 가능합니다.
          </DialogTitle>
          <DialogDescription className="text-center">
            로그인 후 다양한 서비스를 이용해 보세요
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex justify-end mt-[40px]">
          <DialogClose
            className={buttonVariants({
              className: '',
              variant: 'outline',
            })}
          >
            나중에
          </DialogClose>
          <DialogClose
            className={buttonVariants({
              className: '',
            })}
          >
            로그인
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LowLevelDialog({
  triggerName,
  className,
}: {
  triggerName: string;
  className: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className={className}>{triggerName}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>작가 회원만 의뢰지원이 가능합니다.</DialogTitle>
          <DialogDescription>
            작가 회원으로 전환하여 다양한 작가 활동을 해보세요!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full justify-end mt-[40px]">
          <DialogClose
            className={buttonVariants({
              variant: 'outline',
            })}
          >
            취소
          </DialogClose>
          <Link href={PATH.myAuthorApply}>
            <DialogClose className={buttonVariants({})}>
              작가 신청하기
            </DialogClose>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
