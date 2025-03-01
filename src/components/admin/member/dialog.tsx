import Image from 'next/image';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useAdminMemberDetailQuery } from '@/service/admin/member/use-service';

import AdminMemberDialogActionButtons from './action-buttons';
import AdminMemberDialogDetail from './detail';
import AdminMemberDialogProfile from './profile';

const AdminMemberDetailDialog = ({ id }: { id: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="px-2"
        >
          계정 정보
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DetailDialogContents id={id} />
      </DialogPortal>
    </Dialog>
  );
};

const DetailDialogContents = ({ id }: { id: string }) => {
  const { data, isLoading } = useAdminMemberDetailQuery(id);

  return (
    <DialogContent className="max-w-4xl">
      {isLoading ? (
        <div className="w-full h-[500px] flex flex-col items-center justify-center">
          <Icon.TosomLoading className="size-[100px]" />
          <div className="text-slate-400 text-xl font-semibold animate-pulse tracking-[8px]">
            로딩중...
          </div>
        </div>
      ) : data ? (
        <>
          <AdminMemberDialogProfile data={data} />
          <Separator className="my-3" />
          <AdminMemberDialogActionButtons data={data} />
          <AdminMemberDialogDetail data={data} />
        </>
      ) : null}
    </DialogContent>
  );
};

export default AdminMemberDetailDialog;
