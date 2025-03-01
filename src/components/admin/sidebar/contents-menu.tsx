'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRight } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { PATH } from '@/constants/path';

const NAV: {
  title: string;
  links: {
    href: string;
    label: string;
  }[];
}[] = [
  {
    title: '시스템 관리',
    links: [
      {
        href: PATH.adminAdmins,
        label: '관리자 관리',
      },
      {
        href: PATH.adminPageManagement,
        label: '페이지 관리',
      },
      {
        href: PATH.adminCache,
        label: '캐시 버전 관리',
      },
    ],
  },
  {
    title: '회원 관리',
    links: [
      {
        href: PATH.adminMembers,
        label: '회원 목록',
      },
      {
        href: PATH.adminWithdrawn,
        label: '탈퇴 내역',
      },
    ],
  },
  {
    title: '승인 관리',
    links: [
      {
        href: PATH.adminAuthorApproval,
        label: '작가 승인 관리',
      },
    ],
  },
  {
    title: '문의 관리',
    links: [
      {
        href: PATH.adminReports,
        label: '신고 문의',
      },
      {
        href: PATH.adminInquiries,
        label: '일반 문의',
      },
    ],
  },
  {
    title: '결제 관리',
    links: [
      {
        href: PATH.adminPayments,
        label: '결제 내역',
      },
    ],
  },
  {
    title: '이벤트 관리',
    links: [
      {
        href: PATH.adminEventCreate,
        label: '이벤트 글 작성',
      },
      {
        href: PATH.adminEvents,
        label: '이벤트 글 목록',
      },
    ],
  },
];

const AdminContentsMenu = () => {
  const pathname = usePathname();

  return (
    <ScrollArea>
      {NAV.map((item) => (
        <Collapsible
          key={item.title}
          title={item.title}
          defaultOpen
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarMenu>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{' '}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuSub>
                      {item.links.map((item) => (
                        <SidebarMenuSubItem key={item.label}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === item.href}
                          >
                            <Link href={item.href}>{item.label}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarMenu>
          </SidebarGroup>
        </Collapsible>
      ))}
    </ScrollArea>
  );
};

export default AdminContentsMenu;
