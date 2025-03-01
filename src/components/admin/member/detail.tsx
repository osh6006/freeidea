import { userLevelDict } from '@/constants/dictionary';
import { cn } from '@/lib/utils';
import { IAdminMemberDetail } from '@/types/admin/member';
import { format } from 'date-fns';

const DialogStyles = {
  overView: {
    wrapper: 'flex justify-center gap-y-1 border rounded-lg px-4 py-4 group',
    title: 'text-sm font-semibold text-slate-500 mb-1',
    contents: 'text-lg font-bold',
  },
  userInfo: {
    wrapper: 'grid grid-cols-3 gap-x-2 gap-y-8',
    label: 'text-sm font-semibold text-slate-500 mb-1',
    value:
      'h-full min-h-[60px] flex items-center justify-center text-base font-bold bg-slate-50 rounded-lg px-2 py-1 break-all',
  },
};

const AdminMemberDialogDetail = ({ data }: { data: IAdminMemberDetail }) => {
  const {
    userId,
    userName,
    nickname,
    email,
    phoneNumber,
    createdAt,
    orderedAt,
    recentLoginAt,
    snsLinkUrl,
    userLevel,
  } = data;

  return (
    <div>
      <div className={DialogStyles.overView.title}>회원 정보</div>
      <div className="p-4 border rounded-lg mt-2 pb-10">
        <ul className={cn(DialogStyles.userInfo.wrapper)}>
          <li>
            <div className={DialogStyles.userInfo.label}>ID</div>
            <div className={DialogStyles.userInfo.value}>{userId}</div>
          </li>
          <li>
            <div className={DialogStyles.userInfo.label}>이름</div>
            <div className={DialogStyles.userInfo.value}>{userName}</div>
          </li>
          <li>
            <div className={DialogStyles.userInfo.label}>닉네임</div>
            <div className={DialogStyles.userInfo.value}>{nickname}</div>
          </li>
          <li>
            <div className={DialogStyles.userInfo.label}>이메일</div>
            <div className={DialogStyles.userInfo.value}>{email}</div>
          </li>
          <li>
            <div className={DialogStyles.userInfo.label}>연락처</div>
            <div className={DialogStyles.userInfo.value}>{phoneNumber}</div>
          </li>
          <li>
            <div className={DialogStyles.userInfo.label}>가입일</div>
            <div className={DialogStyles.userInfo.value}>
              {createdAt ? format(createdAt, 'yyyy-MM-dd') : '-'}
            </div>
          </li>
          <li>
            <div className={DialogStyles.userInfo.label}>최근 접속일</div>
            <div className={DialogStyles.userInfo.value}>
              {recentLoginAt ? format(recentLoginAt, 'yyyy-MM-dd') : '-'}
            </div>
          </li>
          <li>
            <div className={DialogStyles.userInfo.label}>SNS</div>
            <div className={DialogStyles.userInfo.value}>
              {snsLinkUrl || '-'}
            </div>
          </li>
          <li>
            <div className={DialogStyles.userInfo.label}>회원 구분</div>
            <div className={DialogStyles.userInfo.value}>
              {userLevelDict.getTranslator('en-ko').translate(userLevel || '')}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMemberDialogDetail;
