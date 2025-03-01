'use client';

import { useParams } from 'next/navigation';

import CommonChatDialog from '@/components/common/common-chat-dialog';
import { useUserChatRoom } from '@/service/chat/use-service';
import { useStoreDetailQuery } from '@/service/store/use-service';
import { create } from 'zustand';

export const useProductChatDialogStore = create<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default function ProductChatDialog() {
  const { isOpen, setIsOpen } = useProductChatDialogStore();

  const params = useParams<{ id: string }>();

  const { data: storeDetail } = useStoreDetailQuery(params.id);
  const { data: userChatRoom } = useUserChatRoom(storeDetail?.author.userId);
  const chatRoomId = userChatRoom?.chatRoomId;

  if (!chatRoomId) return null;

  return (
    <CommonChatDialog
      chatRoomId={chatRoomId}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    />
  );
}
