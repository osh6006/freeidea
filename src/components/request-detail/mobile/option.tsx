'use client';

import { useRouter } from 'next/navigation';

import {
  MobileSheetOptionBody,
  MobileSheetOptionClose,
  MobileSheetOptionContent,
  MobileSheetOptionHeader,
  MobileSheetOptionTitle,
} from '@/components/common/mobile/sheet';
import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { PATH } from '@/constants/path';
import { useModalWithBack } from '@/hooks/use-modal-with-back';
import { useReportMutation } from '@/service/report/use-service';
import { useDeleteRequestMutation } from '@/service/request/use-service';
import { DotsVertical } from '@untitled-ui/icons-react';

const RequestMobileOption = ({ id, isMe }: { id: string; isMe: boolean }) => {
  const { push } = useRouter();
  const { mutate: deleteMutate } = useDeleteRequestMutation();
  const { mutate: reportMutate } = useReportMutation('request');
  const { open, setOpen } = useModalWithBack();

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <DotsVertical
            className="untitled-icon"
            color="#BCC0C6"
            width={24}
            height={24}
          />
        </SheetTrigger>
        <MobileSheetOptionContent>
          <MobileSheetOptionHeader>
            <MobileSheetOptionTitle>
              {isMe ? '나의 글' : '신고'}
            </MobileSheetOptionTitle>
          </MobileSheetOptionHeader>
          <MobileSheetOptionBody>
            {isMe ? (
              <>
                <MobileSheetOptionClose asChild>
                  <button
                    onClick={() => push(`${PATH.requestCreate}?id=${id}`)}
                  >
                    수정하기
                  </button>
                </MobileSheetOptionClose>
                <MobileSheetOptionClose
                  asChild
                  className="text-error"
                >
                  <button onClick={() => deleteMutate(id)}>삭제하기</button>
                </MobileSheetOptionClose>
              </>
            ) : (
              <MobileSheetOptionClose
                asChild
                className="text-error"
              >
                <button onClick={() => setOpen(true)}>신고하기</button>
              </MobileSheetOptionClose>
            )}
          </MobileSheetOptionBody>
        </MobileSheetOptionContent>
      </Sheet>
      <ReportDialog
        open={open}
        onOpenChange={setOpen}
      >
        <ReportDialogContent
          onValidSubmit={(data) => {
            reportMutate({ id, body: data });
          }}
        />
      </ReportDialog>
    </>
  );
};

export default RequestMobileOption;
