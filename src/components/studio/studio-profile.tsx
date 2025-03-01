'use client';

import { useParams } from 'next/navigation';

import { CommonAvatar } from '@/components/ui/avatar';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useStudioProfileQuery } from '@/service/studio/use-service';

import AuthorBoardDialog from './author-board/dialog';
import StudioChatRoomDialog from './profile-dialog/chat-room-dialog';
import ProfileDialog from './profile-dialog/dialog';

const StudioProfile = () => {
  const { id }: { id: string } = useParams();
  const { data: studioInfo } = useStudioProfileQuery(id);
  const { data: myInfo } = useMyInfoQuery();

  const isMe = myInfo?.userId === studioInfo?.userId;

  return (
    <section className="mt-[50px] flex justify-between">
      <div className="flex gap-x-[20px] ">
        <CommonAvatar
          nickname={studioInfo?.nickname}
          src={studioInfo?.profileImageUrl}
          className="size-[150px] border"
        />
        <div className="flex items-start gap-x-[10px]">
          <ProfileDialog />
        </div>
      </div>

      <div className="flex items-center gap-[10px]">
        {!isMe ? <StudioChatRoomDialog /> : null}
        {studioInfo?.userLevel === 'USER' ? null : <AuthorBoardDialog />}
      </div>
    </section>
  );
};

export default StudioProfile;
