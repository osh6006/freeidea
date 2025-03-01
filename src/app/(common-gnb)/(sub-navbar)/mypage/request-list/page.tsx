import SearchTagFilter from '@/components/common/search-tagFilter';
import MyPageRequestListTable from '@/components/mypage/request-list/table';
import { Separator } from '@/components/ui/separator';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <main className="p-10 pb-[200px]">
      <h2 className="typo-title-24-bold-tight">나의 의뢰글</h2>
      <Separator className="my-4" />
      <div className="flex gap-x-[10px] my-[20px]">
        <SearchTagFilter
          queryKey="filter"
          queryValue="IN_PROGRESS"
        >
          모집중
        </SearchTagFilter>
        <SearchTagFilter
          queryKey="filter"
          queryValue="FINISHED"
        >
          마감
        </SearchTagFilter>
      </div>
      <MyPageRequestListTable />
    </main>
  );
}
