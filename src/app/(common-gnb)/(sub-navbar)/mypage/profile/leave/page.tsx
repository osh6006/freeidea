import LeaveAccountForm from '@/components/mypage/leave/leave-account-form';

export default function Page() {
  return (
    <main className="flex pl-[40px] pt-[40px] flex-col gap-[20px] pb-[200px]">
      <div className="flex flex-col gap-[16px]">
        <div className="typo-title-24-bold-tight">회원탈퇴 신청</div>
        <div className="w-full h-[1px] bg-slate-200"></div>
      </div>
      <div className="typo-title-20-bold-100-tight">
        회원 탈퇴 신청에 앞서 아래 내용을 반드시 확인해주세요.
      </div>
      <div className="flex flex-col gap-[20px] w-full p-[20px] rounded-[6px] bg-slate-50">
        <div className="flex flex-col gap-[10px]">
          <h1 className="typo-body-14-bold-100-tight">회원탈퇴 시 처리내용</h1>
          <ul className="typo-body-14-regular-150-tight list-disc list-inside pl-4">
            <li>프리디어 자체 구매내역은 소멸되며 환불되지 않습니다.</li>
            <li>프리디어 구매 정보가 삭제됩니다.</li>
          </ul>
        </div>
        <div className="flex flex-col gap-[10px]">
          <h1 className="typo-body-14-bold-100-tight">
            회원탈퇴 시 게시물 관리
          </h1>
          <p className="typo-body-14-regular-150-tight">
            회원탈퇴 후 프리디어 서비스에 입력한 게시물 및 댓글은 삭제되지
            않으며, 회원정보 삭제로 인해 작성자 본인을 확인할 수 없으므로 게시물
            편집 및 삭제 처리가 원천적으로 불가능 합니다. 게시물 삭제를 원하시는
            경우에는 먼저 해당 게시물을 삭제 하신 후, 탈퇴를 신청하시기
            바랍니다.
          </p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <h1 className="typo-body-14-bold-100-tight">
            회원탈퇴 후 재가입 규정
          </h1>
          <p className="typo-body-14-regular-150-tight">
            탈퇴 회원이 재가입하더라도 기존의 프리디어 정보는 이미 소멸되었기
            때문에 양도되지 않습니다.
          </p>
        </div>
      </div>
      <LeaveAccountForm />
    </main>
  );
}
