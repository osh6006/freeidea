import SearchTagFilter from '@/components/common/search-tagFilter';
import RequestStateListTable from '@/components/mypage/request-state/table';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <main className="p-10 pb-[200px]">
      <h2 className="typo-title-24-bold-tight">나의 지원현황</h2>
      <Separator className="my-4" />
      <div className="flex gap-x-[10px] my-[20px]">
        <SearchTagFilter
          queryKey="filter"
          queryValue="IN_PROGRESS"
        >
          지원완료
        </SearchTagFilter>
        <SearchTagFilter
          queryKey="filter"
          queryValue="FINISHED"
        >
          마감
        </SearchTagFilter>
      </div>
      <RequestStateListTable />
    </main>
  );
}
