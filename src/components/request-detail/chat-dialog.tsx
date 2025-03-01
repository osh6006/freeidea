'use client';

import React, { useState } from 'react';

import { useParams } from 'next/navigation';

import { useModalWithBack } from '@/hooks/use-modal-with-back';
import { useUserChatRoom } from '@/service/chat/use-service';
import { useRequestDetailQuery } from '@/service/request/use-service';

import CommonChatDialog from '../common/common-chat-dialog';
import { Button } from '../ui/button';

const ReqquestChatDialog = () => {
  const { open, setOpen } = useModalWithBack();

  const params = useParams<{ id: string }>();

  const { data: requestDetail } = useRequestDetailQuery(params.id);
  const { data: userChatRoom } = useUserChatRoom(requestDetail?.userId);
  const chatRoomId = userChatRoom?.chatRoomId;

  if (!chatRoomId) return null;

  return (
    <>
      <Button
        size="2xl"
        className="w-full pc-screen:w-[170px]"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        채팅문의
      </Button>
      <CommonChatDialog
        chatRoomId={chatRoomId}
        isOpen={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default ReqquestChatDialog;
