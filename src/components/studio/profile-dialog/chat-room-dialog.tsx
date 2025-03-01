import React, { useState } from 'react';

import { useParams } from 'next/navigation';

import CommonChatDialog from '@/components/common/common-chat-dialog';
import { SecureButton } from '@/components/common/secure-button';
import { UntitledIcon } from '@/components/icon';
import { buttonVariants } from '@/components/ui/button';
import { useUserChatRoom } from '@/service/chat/use-service';
import { useStudioProfileQuery } from '@/service/studio/use-service';

const StudioChatRoomDialog = () => {
  const { id }: { id: string } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { data: studioInfo } = useStudioProfileQuery(id);
  const { data: userChatRoom } = useUserChatRoom(studioInfo?.userId);
  const chatRoomId = userChatRoom?.chatRoomId;

  if (!chatRoomId) return null;

  return (
    <>
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
      <CommonChatDialog
        chatRoomId={chatRoomId}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default StudioChatRoomDialog;
