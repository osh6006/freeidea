import { useState } from 'react';

import { useParams } from 'next/navigation';

import CommonChatDialog from '@/components/common/common-chat-dialog';
import ImageWithFallback from '@/components/common/image-with-fallback';
import { SecureButton } from '@/components/common/secure-button';
import { UntitledIcon } from '@/components/icon';
import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Tag from '@/components/ui/tag';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useUserChatRoom } from '@/service/chat/use-service';
import { studioQueryKey } from '@/service/studio/query-option';
import {
  useFollowAuthorMutation,
  useStudioProfileQuery,
} from '@/service/studio/use-service';
import { Level } from '@/types/auth';
import { IStudioProfile } from '@/types/studio';

import { CommonAvatar } from '../../ui/avatar';
import ProfileDialogTab from './dialog-tab';

const badge: Record<
  Level,
  { variant: 'yellow' | 'green' | 'blue' | 'pink' | 'gray'; label: string }
> = {
  USER: { variant: 'yellow', label: '회원' },
  AUTHOR: { variant: 'green', label: '작가' },
  ADMIN: { variant: 'blue', label: '일반관리자' },
  MASTER: { variant: 'pink', label: '최고관리자' },
  GUEST: { variant: 'gray', label: '게스트' },
} as const;

const ProfileDialog = () => {
  const { id }: { id: string } = useParams();
  const { toast } = useToast();
  const { data: studioInfo } = useStudioProfileQuery(id);
  const { data: myInfo } = useMyInfoQuery();

  const { mutate } = useFollowAuthorMutation();
  const { setQueriesData, rollbackQueriesData } = useOptimisticUpdate();

  // Chat
  const [isOpen, setIsOpen] = useState(false);
  const { data: userChatRoom } = useUserChatRoom(studioInfo?.userId);
  const chatRoomId = userChatRoom?.chatRoomId;

  const isInfo = !!studioInfo;
  if (!isInfo) return;

  const tagVariant = badge[studioInfo.userLevel as Level].variant;
  const tagLabel = badge[studioInfo.userLevel].label;

  const handleFollow = () => {
    if (studioInfo) {
      const isFollowing = studioInfo.isFollowing;
      const prevData = setQueriesData<IStudioProfile>(
        {
          queryKey: studioQueryKey.profile(),
        },
        (oldData) => {
          return {
            ...oldData,
            isFollowing: !isFollowing,
            followers: isFollowing
              ? oldData.followers - 1
              : oldData.followers + 1,
          };
        }
      );

      mutate(
        {
          isFollowing: !isFollowing,
          studioId: studioInfo.studioId,
        },
        {
          onError: () => {
            rollbackQueriesData(prevData);
          },
          onSuccess: () => {
            toast({
              description: `${studioInfo.nickname} 님을 ${studioInfo.isFollowing ? '언 팔로우' : '팔로우'} 하였습니다.`,
            });
          },
        }
      );
    }
  };

  const isMe = myInfo?.userId === studioInfo.userId;

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <span className=" flex flex-col items-start cursor-pointer">
            <div className="flex items-center gap-x-[10px]">
              <h1 className="typo-title-40-bold-150">{studioInfo?.nickname}</h1>
              {!isMe ? (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleFollow();
                    }}
                    className={cn(
                      'typo-title-24-bold-140-tight ',
                      studioInfo?.isFollowing
                        ? 'text-slate-300'
                        : 'text-primary'
                    )}
                  >
                    {studioInfo?.isFollowing ? '팔로잉' : '팔로우'}
                  </button>
                </>
              ) : null}
            </div>
            <p className="typo-body-14-regular-150-tight my-[10px]">
              {studioInfo?.introduction}
            </p>
            <div className="flex gap-x-[10px] typo-body-14-regular-150-tight ">
              <span>
                팔로워 <strong>{studioInfo?.followers}</strong>
              </span>
              <span>
                팔로잉 <strong>{studioInfo?.followings}</strong>
              </span>
            </div>
            <div className="mt-[20px]">
              <Tag
                className="rounded-full h-6 flex items-center justify-center"
                variant={tagVariant}
              >
                {tagLabel}
              </Tag>
            </div>
          </span>
        </DialogTrigger>
        <DialogContent className="max-w-[900px] gap-y-0 p-0 pb-[30px] overflow-hidden border-none">
          <DialogHeader className="relative h-[150px]">
            <ImageWithFallback
              fallback={<div className="w-full h-full bg-slate-50" />}
              src={studioInfo?.titleImageUrl}
              alt="modal-banner"
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </DialogHeader>
          <div className="px-[30px] space-y-[20px]">
            <div className="flex items-end justify-between w-full">
              <CommonAvatar
                nickname={studioInfo?.nickname}
                src={studioInfo?.profileImageUrl}
                className="size-[150px] -mt-[75px] border"
              />

              {!isMe && (
                <DialogClose asChild>
                  <SecureButton
                    className={buttonVariants({
                      variant: 'outline',
                      size: 'icon-lg',
                    })}
                    requiredLevel="USER"
                    onClick={() => setIsOpen(true)}
                  >
                    <UntitledIcon.Mail02 />
                  </SecureButton>
                </DialogClose>
              )}
            </div>
            <div className="space-y-[10px]">
              <DialogTitle>{studioInfo?.nickname}</DialogTitle>
              <Tag
                className="rounded-full h-6 flex items-center justify-center"
                variant={tagVariant}
              >
                {tagLabel}
              </Tag>
            </div>
            <div className="p-5 bg-slate-50">
              <ProfileDialogTab />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CommonChatDialog
        chatRoomId={chatRoomId || ''}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default ProfileDialog;
