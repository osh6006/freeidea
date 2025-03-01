import { useState } from 'react';

import CommonChatDialog from '@/components/common/common-chat-dialog';
import { Button } from '@/components/ui/button';
import { useUserChatRoom } from '@/service/chat/use-service';

const RequesterChatDialog = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userChatRoom } = useUserChatRoom(id);
  const chatRoomId = userChatRoom?.chatRoomId;

  if (!chatRoomId) return null;

  return (
    <>
      <Button
        key={id}
        variant="outline"
        className="h-8 w-[100px] block typo-body-14-medium-100-tight"
        onClick={() => setIsOpen(true)}
      >
        채팅문의
      </Button>
      <CommonChatDialog
        chatRoomId={chatRoomId}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default RequesterChatDialog;
