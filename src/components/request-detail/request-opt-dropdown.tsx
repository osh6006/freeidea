'use client';

import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATH } from '@/constants/path';
import { useDeleteRequestMutation } from '@/service/request/use-service';
import { DotsVertical } from '@untitled-ui/icons-react';

const RequestOptDropdown = ({ id }: { id: string }) => {
  const { push } = useRouter();
  const { mutate: deleteMutate } = useDeleteRequestMutation();

  return (
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
          onClick={() => push(`${PATH.requestCreate}?id=${id}`)}
          className="py-2 px-[12px]  text-slate-800 text-[14px] font-[400] cursor-pointer hover:bg-slate-50"
        >
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => deleteMutate(id)}
          className="py-2 px-[12px] focus:text-[#FF4040] hover:text-[#FF4040] text-[#FF4040] text-[14px] cursor-pointer font-[400] hover:bg-slate-50"
        >
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RequestOptDropdown;
