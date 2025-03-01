import Inner from '@/components/common/inner';
import EventDetailContents from '@/components/home/event/contents';
import { Separator } from '@/components/ui/separator';
import { metadataMap } from '@/lib/metadata';
import { homeEventDetailOption } from '@/service/home/query-option';
import { QueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';

export const generateMetadata = metadataMap.eventDetail;

export default async function EventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery(homeEventDetailOption(params.id));

  const { contents, title, createdAt, nickname } = data;

  return (
    <main className="mb-[200px]">
      <Inner
        maxWidth={1000}
        className="mt-[40px]"
      >
        <h1 className="typo-title-32-bold-150 text-slate-800">{title}</h1>
        <div className="mt-[20px] text-slate-800 typo-body-16-medium-100-tight">
          {format(createdAt, 'yyyy년 MM월 dd일')} • {nickname}
        </div>
        <Separator className="my-[40px]" />
        <EventDetailContents contents={contents} />
      </Inner>
    </main>
  );
}
