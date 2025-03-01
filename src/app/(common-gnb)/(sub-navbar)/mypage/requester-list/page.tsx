import RequesterListTable from '@/components/mypage/requester/table';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <main className="p-10 pb-[200px]">
      <h2 className="typo-title-24-bold-tight">의뢰 지원자</h2>
      <Separator className="my-4" />
      <RequesterListTable />
    </main>
  );
}
