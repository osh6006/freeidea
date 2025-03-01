'use client';

import Link from 'next/link';

import { ChevronsUpDown, LogOut, SquareArrowOutUpRight } from 'lucide-react';

import { CommonAvatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { PATH } from '@/constants/path';
import { useLogoutMutation, useMyInfoQuery } from '@/service/auth/use-service';

const AdminFooterMenu = () => {
  const { data } = useMyInfoQuery();
  const { mutate: logoutMutate } = useLogoutMutation();

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <SidebarMenu className="border rounded-lg shadow">
      <SidebarMenuSubItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <CommonAvatar
                className="size-8"
                nickname={data?.nickname}
                src={data?.profileImageUrl}
              />
              {data?.userName}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width] space-y-1"
          >
            <DropdownMenuItem
              className="flex items-center gap-x-2 text-slate-800"
              asChild
            >
              <Link href={PATH.home}>
                <SquareArrowOutUpRight size={18} />
                <span>메인 사이트로</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2 text-slate-800"
              onSelect={handleLogout}
            >
              <LogOut size={18} />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuSubItem>
    </SidebarMenu>
  );
};

export default AdminFooterMenu;
