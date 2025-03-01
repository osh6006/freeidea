import AdminContentsWrapper from '@/components/admin/common/contents-wrapper';
import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderLeft,
  AdminHeaderTitle,
} from '@/components/admin/common/header';
import AdminMemberFilter from '@/components/admin/member/filter';
import AdminMemberProvider from '@/components/admin/member/provider';
import AdminMemberTable from '@/components/admin/member/table';
import { Separator } from '@/components/ui/separator';
import { adminMemberListQueryOption } from '@/service/admin/member/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

export default async function MembersPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    adminMemberListQueryOption({
      page: Number(searchParams?.page || 1),
      limit: 10,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <AdminHeader>
          <AdminHeaderLeft>
            <AdminHeaderTitle>회원 관리</AdminHeaderTitle>
            <AdminHeaderDescription>
              가입된 회원들을 관리해 보세요
            </AdminHeaderDescription>
          </AdminHeaderLeft>
        </AdminHeader>
        <AdminMemberProvider>
          <AdminMemberFilter />
          <Separator className="my-8" />
          <AdminContentsWrapper>
            <AdminMemberTable />
          </AdminContentsWrapper>
        </AdminMemberProvider>
      </main>
    </HydrationBoundary>
  );
}
