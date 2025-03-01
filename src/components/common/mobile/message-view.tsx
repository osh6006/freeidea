'use client';

import { PATH } from '@/constants/path';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useChatRoomList } from '@/service/chat/use-service';
import { MessageTextSquare02 } from '@untitled-ui/icons-react';

import Indicator from '../indicator';
import { SecureLink } from '../secure-button';

const MobileMessageView = () => {
  const { data: myInfo } = useMyInfoQuery();

  const { data } = useChatRoomList();
  const { flattenList } = data || {};

  const allChatList = flattenList || [];

  const hasUnreadChatRoom = allChatList?.some(({ lastMessage }) => {
    return lastMessage.userId !== myInfo?.userId && !lastMessage.isReceiverRead;
  });

  return (
    <SecureLink
      href={PATH.message}
      requiredLevel="USER"
      className="relative"
    >
      <MessageTextSquare02 />
      {hasUnreadChatRoom && (
        <Indicator className="absolute -right-[1px] -top-[1px]" />
      )}
    </SecureLink>
  );
};

export default MobileMessageView;
