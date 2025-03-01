import Image from 'next/image';

import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import { SecureButton } from '@/components/common/secure-button';
import { UntitledIcon } from '@/components/icon';
import { useGlobalDialogStore } from '@/components/provider/global-dialog/store';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { DialogTrigger } from '@/components/ui/dialog';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { cn, formatSocialNumber } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useMyMembership } from '@/service/mypage/use-service';
import { qnaQueryKey } from '@/service/qna/query-option';
import {
  useQnaAnswerLikeMutation,
  useQnaAnswerPangLikeMutation,
} from '@/service/qna/use-service';
import { useReportMutation } from '@/service/report/use-service';
import { IQnaAnswer } from '@/types/qna';

import { useQnaAnswerContext } from './answer-provider';

const ButtonStyle = 'flex item-center justify-center gap-x-1';

const QnaAnswerSocialActionButtons = ({
  setEditorble,
}: {
  setEditorble: (editable: boolean) => void;
}) => {
  const { data: myInfo } = useMyInfoQuery();
  const { data: membershipData } = useMyMembership();
  const { setIsUseMembershipDialogOpen } = useGlobalDialogStore();

  const {
    data: {
      isLiked,
      qnaAnswerId,
      likes,
      membershipLikes,
      isMembershipLiked,
      comments,
      userId,
    },
  } = useQnaAnswerContext();

  const { mutate: likeMutate, isPending: isLikePending } =
    useQnaAnswerLikeMutation();
  const { mutate: pangLikeMutate, isPending: isPangLikePending } =
    useQnaAnswerPangLikeMutation();

  const { mutate: reportMutate } = useReportMutation('qnaAnswer');

  const { setInfinitePageQueriesData, rollbackQueriesData } =
    useOptimisticUpdate();

  const handleLike = () => {
    const prevData = setInfinitePageQueriesData<IQnaAnswer>(
      {
        queryKey: qnaQueryKey.lists(),
      },
      {
        target: (item) => item.qnaAnswerId === qnaAnswerId,
        updater: (item) => ({
          ...item,
          isLiked: !isLiked,
          likes: isLiked ? likes - 1 : likes + 1,
        }),
      }
    );

    likeMutate(
      { qnaAnswerId, isLiked: !isLiked },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  const handlePangLike = () => {
    if (membershipData?.membershipType === 'FREE') {
      setIsUseMembershipDialogOpen(true);
      return;
    }

    const prevData = setInfinitePageQueriesData<IQnaAnswer>(
      {
        queryKey: qnaQueryKey.lists(),
      },
      {
        target: (item) => item.qnaAnswerId === qnaAnswerId,
        updater: (item) => ({
          ...item,
          isMembershipLiked: !isMembershipLiked,
          membershipLikes: membershipLikes
            ? membershipLikes - 1
            : membershipLikes + 1,
        }),
      }
    );

    pangLikeMutate(
      { qnaAnswerId, isMembershipLiked: !membershipLikes },
      {
        onError: () => {
          rollbackQueriesData(prevData);
        },
      }
    );
  };

  const isMe = myInfo?.userId === userId;
  const disabled = isLikePending || isPangLikePending;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-[20px] ">
          <button
            disabled={disabled}
            className={ButtonStyle}
            onClick={handlePangLike}
          >
            <Image
              width={24}
              height={24}
              src={'/icons/premium-icon.png'}
              alt="pang-icon"
              className={cn(
                isMembershipLiked
                  ? 'bg-pink-tint-10 border border-primary rounded-full'
                  : ''
              )}
            />
            {formatSocialNumber(membershipLikes)}
          </button>
          <SecureButton
            className={ButtonStyle}
            onClick={handleLike}
            disabled={disabled}
            requiredLevel="USER"
          >
            <UntitledIcon.Heart
              className={cn(
                'w-[26px] untitled-icon',
                isLiked && 'fill-error text-error'
              )}
            />
            {likes}
          </SecureButton>

          <CollapsibleTrigger asChild>
            <button className={ButtonStyle}>
              <UntitledIcon.MessageCircle01 className="untitled-icon" /> 답변{' '}
              {comments}
            </button>
          </CollapsibleTrigger>
        </div>
        {isMe ? (
          <div className="flex gap-x-2">
            <button
              disabled={disabled}
              onClick={() => setEditorble(true)}
            >
              수정하기
            </button>{' '}
          </div>
        ) : (
          <ReportDialog>
            <DialogTrigger disabled={disabled}>신고하기</DialogTrigger>
            <ReportDialogContent
              onValidSubmit={(data) => {
                reportMutate({ id: qnaAnswerId, body: data });
              }}
            />
          </ReportDialog>
        )}
      </div>
    </>
  );
};

export default QnaAnswerSocialActionButtons;
