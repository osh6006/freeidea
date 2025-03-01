import MyPageQnaList from '@/components/mypage/question/list';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <main className="p-10">
      <h2 className="typo-title-24-bold-tight">나의 질문</h2>
      <Separator className="my-4" />
      <MyPageQnaList />
    </main>
  );
}
