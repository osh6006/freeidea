import { PropsWithChildren } from 'react';

import { AdminSidebar } from '@/components/navbar/admin-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider className="relative max-w-[1400px] mx-auto h-dvh overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 my-2 p-5 rounded-md shadow-sm border bg-sidebar overflow-y-auto">
        <SidebarTrigger
          variant="outline"
          className="main-desktop:hidden"
        />
        {children}
      </div>
    </SidebarProvider>
  );
}
