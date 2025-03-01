import { UntitledIcon } from '@/components/icon';
import { Switch } from '@/components/ui/switch';
import { MembershipDict, userStatusDict } from '@/constants/dictionary';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { cn } from '@/lib/utils';
import { adminMemberQueryKey } from '@/service/admin/member/query-option';
import { useUserToggleActiveMutation } from '@/service/admin/member/use-service';
import { IAdminMemberDetail } from '@/types/admin/member';
import { format } from 'date-fns';

import AdminMemberShipDialog from './membership-dialog';

const DialogStyles = {
  overView: {
    wrapper: 'flex justify-center gap-y-1 border rounded-lg px-4 py-4 group',
    title: 'text-sm font-semibold text-slate-500 mb-1',
    contents: 'text-lg font-bold',
  },
};

const AdminMemberDialogActionButtons = ({
  data,
}: {
  data: IAdminMemberDetail;
}) => {
  const {
    userId,
    articleCount,
    membershipType,
    orderedAt,
    userStatus,
    reportCount,
  } = data;

  const { mutate, isPending } = useUserToggleActiveMutation();
  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();

  const isChecked = userStatus === 'JOINED';

  const toggleChecked = (checked: boolean) => {
    const prevData = setQueriesData<IAdminMemberDetail>(
      {
        queryKey: adminMemberQueryKey.details(),
      },
      (item) => {
        return {
          ...item,
          userStatus: checked ? 'JOINED' : 'SUSPENDED',
        };
      }
    );

    mutate(
      {
        userId,
        isActive: checked,
      },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  return (
    <ul className="grid grid-cols-4 gap-x-2">
      <li>
        <div className={DialogStyles.overView.title}>게시글</div>
        <div
          className={cn(
            DialogStyles.overView.wrapper,
            'cursor-pointer flex items-center justify-between'
          )}
        >
          <div className={DialogStyles.overView.contents}>{articleCount}</div>
          <UntitledIcon.ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </div>
      </li>
      <li>
        <AdminMemberShipDialog id={userId}>
          <div className={cn(DialogStyles.overView.title, 'text-left')}>
            멤버십 정보
          </div>
          <div
            className={cn(
              DialogStyles.overView.wrapper,
              'cursor-pointer flex items-center justify-between '
            )}
          >
            <div className={cn(DialogStyles.overView.contents, 'flex gap-x-2')}>
              <span
                className={cn(
                  MembershipDict.getTranslator('en-textColor').translate(
                    membershipType || ''
                  )
                )}
              >
                {membershipType}
              </span>
              /<span>{orderedAt ? format(orderedAt, 'yyyy-MM-dd') : '-'}</span>
            </div>
            <UntitledIcon.ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </div>
        </AdminMemberShipDialog>
      </li>
      <li>
        <div className={DialogStyles.overView.title}>재재 횟수</div>
        <div
          className={cn(
            DialogStyles.overView.wrapper,
            'cursor-pointer flex items-center justify-between'
          )}
        >
          <div className={DialogStyles.overView.contents}>{reportCount}</div>
          <UntitledIcon.ArrowCircleUp />
        </div>
      </li>
      <li>
        <div className={DialogStyles.overView.title}>회원 상태</div>
        <div
          className={cn(
            DialogStyles.overView.wrapper,
            'cursor-pointer flex items-center justify-between'
          )}
        >
          <div className={DialogStyles.overView.contents}>
            {userStatusDict.getTranslator('en-ko').translate(userStatus || '')}
          </div>
          {userStatus !== 'LEFT' && (
            <Switch
              checked={isChecked}
              onCheckedChange={(checked) => {
                toggleChecked(checked);
              }}
            />
          )}
        </div>
      </li>
    </ul>
  );
};

export default AdminMemberDialogActionButtons;
