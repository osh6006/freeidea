'use client';

import { PropsWithChildren } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useReportMutation } from '@/service/report/use-service';
import { DotsVertical } from '@untitled-ui/icons-react';

import { ReportDialog, ReportDialogContent } from '../common/report-dialog';
import { DialogTrigger } from '../ui/dialog';

interface IReportDropDownProps extends PropsWithChildren {
  id: string;
}

const RequestReportDropdown = ({ id, children }: IReportDropDownProps) => {
  const { mutate: reportMutate } = useReportMutation('request');

  return (
    <>
      <ReportDialog>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="focus:outline-none">
            <DotsVertical
              className="untitled-icon"
              color="#BCC0C6"
              width={24}
              height={24}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="flex px-2 py-[10px] gap-[10px] justify-center flex-col rounded-[4px]"
          >
            <DropdownMenuItem
              asChild
              className="py-2 px-[12px]  text-slate-800 text-[14px] font-[400] cursor-pointer hover:bg-slate-50"
            >
              <DialogTrigger>신고하기</DialogTrigger>
            </DropdownMenuItem>
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
        <ReportDialogContent
          onValidSubmit={(data) => {
            reportMutate({ id, body: data });
          }}
        />
      </ReportDialog>
    </>
  );
};

export default RequestReportDropdown;
