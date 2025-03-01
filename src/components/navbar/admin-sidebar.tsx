'use client';

import Image from 'next/image';

import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';

import AdminContentsMenu from '../admin/sidebar/contents-menu';
import AdminFooterMenu from '../admin/sidebar/footer-menu';
import { SecureLink } from '../common/secure-button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar';

export function AdminSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar
      variant="floating"
      collapsible="icon"
      className="sticky "
    >
      <SidebarHeader className={cn('', !open ? 'px-3' : 'p-4')}>
        <div className="w-full flex items-center justify-between">
          <SecureLink
            href={PATH.adminAdmins}
            requiredLevel="ADMIN"
            className={cn('', !open ? 'hidden' : '')}
          >
            <Image
              alt="logo"
              src="/logo-typo.png"
              width={100}
              height={50}
            />
          </SecureLink>
          <SidebarTrigger
            variant="outline"
            className={cn('hidden main-desktop:block')}
          />
        </div>
      </SidebarHeader>
      <div className="h-[10px] " />
      <SidebarContent className="gap-0">
        <AdminContentsMenu />
      </SidebarContent>
      <SidebarFooter>
        <AdminFooterMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
