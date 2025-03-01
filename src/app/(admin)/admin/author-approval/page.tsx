import AuthorApprovalFilter from '@/components/admin/author-approval/filter';
import AuthorApprovalProvider from '@/components/admin/author-approval/provider';
import AuthorApprovalTable from '@/components/admin/author-approval/table';
import AdminContentsWrapper from '@/components/admin/common/contents-wrapper';
import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderLeft,
  AdminHeaderTitle,
} from '@/components/admin/common/header';
import { Separator } from '@/components/ui/separator';
import { authorApprovalListOption } from '@/service/admin/author-approval/query-option';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

async function AuthorApprovalPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
  };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    authorApprovalListOption({
      page: Number(searchParams?.page || 1),
      limit: 10,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <AdminHeader>
          <AdminHeaderLeft>
            <AdminHeaderTitle>작가 승인</AdminHeaderTitle>
            <AdminHeaderDescription>
              회원들의 작가 승인 상태를 관리하세요.
            </AdminHeaderDescription>
          </AdminHeaderLeft>
        </AdminHeader>
        <AuthorApprovalProvider>
          <AuthorApprovalFilter />
          <Separator className="my-8" />
          <AdminContentsWrapper>
            <AuthorApprovalTable />
          </AdminContentsWrapper>
        </AuthorApprovalProvider>
      </main>
    </HydrationBoundary>
  );
}

export default AuthorApprovalPage;
