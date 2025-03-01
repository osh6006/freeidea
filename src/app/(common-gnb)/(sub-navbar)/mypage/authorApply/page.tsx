import AuthorApplyForm from '@/components/mypage/author-apply/apply-form';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <main className="p-10">
      <h3 className="typo-title-18-bold-100">작가 신청하기</h3>
      <Separator className="my-4" />
      <div className="flex px-4 bg-slate-50">
        <ul className="list-disc p-4 typo-body-14-regular-150-tight">
          <li>본인 작품이 아닐 경우 제재를 당할 수 있습니다.</li>
        </ul>
      </div>
      <AuthorApplyForm />
    </main>
  );
}
