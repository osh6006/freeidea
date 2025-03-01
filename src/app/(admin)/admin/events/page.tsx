import AdminContentsWrapper from '@/components/admin/common/contents-wrapper';
import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderLeft,
  AdminHeaderTitle,
} from '@/components/admin/common/header';
import AdminEventFilter from '@/components/admin/event/filter';
import AdminEventProvider from '@/components/admin/event/provider';
import AdminEventTable from '@/components/admin/event/table';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

function AdminEventsPage() {
  return (
    <main>
      <AdminHeader>
        <AdminHeaderLeft>
          <AdminHeaderTitle>이벤트 관리</AdminHeaderTitle>
          <AdminHeaderDescription>
            생성된 다양한 이벤트를 관리해 보세요
          </AdminHeaderDescription>
        </AdminHeaderLeft>
      </AdminHeader>
      <AdminEventProvider>
        <AdminEventFilter />
        <Separator className="my-8" />
        <AdminContentsWrapper>
          <AdminEventTable />
        </AdminContentsWrapper>
      </AdminEventProvider>
    </main>
  );
}

export default AdminEventsPage;
