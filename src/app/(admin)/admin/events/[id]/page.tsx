import AdminContentsWrapper from '@/components/admin/common/contents-wrapper';
import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderLeft,
  AdminHeaderTitle,
} from '@/components/admin/common/header';
import EventDetailContents from '@/components/home/event/contents';
import { Separator } from '@/components/ui/separator';
import { adminEventDetailOption } from '@/service/admin/event/query-option';
import { QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery(adminEventDetailOption(params.id));

  const { contents, title, publishedAt } = data;

  return (
    <main className="space-y-10">
      <AdminHeader>
        <AdminHeaderLeft>
          <AdminHeaderTitle>이벤트 상세</AdminHeaderTitle>
          <AdminHeaderDescription>
            작성 된 이벤트 글을 확인해 보세요
          </AdminHeaderDescription>
        </AdminHeaderLeft>
      </AdminHeader>
      <AdminContentsWrapper>
        <h1 className="typo-title-32-bold-150 text-slate-800">{title}</h1>
        <div className="mt-[20px] text-slate-800 typo-body-16-medium-100-tight">
          {format(publishedAt, 'yyyy년 MM월 dd일')}
        </div>
        <Separator className="my-[40px]" />
        <EventDetailContents contents={contents} />
      </AdminContentsWrapper>
    </main>
  );
}
