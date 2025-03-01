'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  ChatDialog,
  ChatDialogBody,
  ChatDialogContent,
  ChatDialogFooter,
  ChatDialogHeader,
  ChatDialogImageInput,
  ChatDialogInput,
  ChatDialogMessage,
} from '@/components/chat/chat-dialog';
import { useChatSocket } from '@/hooks/socket/use-chat-socket';
import { mergeListsWithDeduplication } from '@/lib/utils';
import {
  ChatMessageSchemaType,
  chatMessageSchema,
} from '@/lib/zod/common-schema';
import {
  useChatRoom,
  useChatRoomMessages,
  useReadChatMessage,
  useSendChatMutation,
} from '@/service/chat/use-service';
import { useUploadFile } from '@/service/file/use-service';
import { FileUploadResult } from '@/types/file';
import { zodResolver } from '@hookform/resolvers/zod';

import Spinner from '../ui/spinner';

export default function CommonChatDialog({
  chatRoomId,
  onOpenChange,
  isOpen,
}: {
  chatRoomId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  return (
    <ChatDialog
      id={chatRoomId}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <CommonChatDialogContent chatRoomId={chatRoomId} />
    </ChatDialog>
  );
}

function CommonChatDialogContent({ chatRoomId }: { chatRoomId: string }) {
  const [isFocused, setIsFocused] = useState(false);
  const {
    data: chatRoomMessages,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useChatRoomMessages(chatRoomId);
  const { data: chatRoom } = useChatRoom(chatRoomId);
  const { mutate: sendChatMessageMutate } = useSendChatMutation();
  const { mutate: readChatMessageMutate } = useReadChatMessage();

  const { messages: realTimeMessages } = useChatSocket(chatRoomId, {
    onReceiveMessage: () => {
      if (isFocused) {
        readChatMessageMutate(chatRoomId);
      }
    },
  });

  const { mutate: uploadFileMutate, isPending: isUploading } = useUploadFile();

  const methods = useForm<ChatMessageSchemaType>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      message: '',
    },
  });

  const historicalMessages = chatRoomMessages?.flattenList ?? [];
  const { userId, nickname } = chatRoom ?? {};
  const { handleSubmit, reset, register } = methods;
  const bodyRef = useRef<HTMLDivElement>(null);

  const onSubmit = handleSubmit((data) => {
    if (!userId) throw new Error('userId is required');
    sendChatMessageMutate({
      receiverUserId: userId,
      message: {
        chatMessageType: 'TEXT',
        message: data.message,
      },
    });
    reset();
    bodyRef.current?.scrollTo({ top: 0 });
  });

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const onSuccess = ({ fileId }: FileUploadResult) => {
      if (!userId) throw new Error('userId is required');

      sendChatMessageMutate({
        receiverUserId: userId,
        message: {
          chatMessageType: 'IMAGE',
          chatMessageImageId: fileId,
        },
      });
      bodyRef.current?.scrollTo({ top: 0 });
    };

    uploadFileMutate(file, { onSuccess });
  };

  const onScrollReachTop = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const messages = mergeListsWithDeduplication({
    list1: realTimeMessages,
    list2: historicalMessages,
    key: 'chatMessageId',
  });

  function onFocusChange(isFocused: boolean) {
    setIsFocused(isFocused);
    if (isFocused) {
      readChatMessageMutate(chatRoomId);
    }
  }

  return (
    <ChatDialogContent onFocusChange={onFocusChange}>
      <ChatDialogHeader>{nickname}</ChatDialogHeader>
      <ChatDialogBody
        ref={bodyRef}
        onScrollReachTop={onScrollReachTop}
      >
        {isUploading && <Spinner className="self-end mr-[42px]" />}

        <ChatDialogMessage messages={messages} />
      </ChatDialogBody>
      <form onSubmit={onSubmit}>
        <ChatDialogFooter>
          <ChatDialogImageInput
            {...register('file', { onChange: onFileChange })}
          />
          <ChatDialogInput {...register('message')} />
        </ChatDialogFooter>
      </form>
    </ChatDialogContent>
  );
}
