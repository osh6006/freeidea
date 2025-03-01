'use client';

import {
  Fragment,
  InputHTMLAttributes,
  PropsWithChildren,
  createContext,
  useContext,
  useId,
  useRef,
  useState,
} from 'react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { ChatMessage } from '@/types/chat';
import { DndContext, DragEndEvent, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { formatDate, isSameDay, isSameMinute } from 'date-fns';
import { ko } from 'date-fns/locale';
import { StoreApi, UseBoundStore, create } from 'zustand';

import { UntitledIcon } from '../icon';
import { CommonAvatar } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Textarea, TextareaProps } from '../ui/textarea';
import {
  ChatDefaultMessage,
  ChatImageMessage,
  ChatOptionMessage,
} from './chat-message';

const ChatDialogContext = createContext<string | null>(null);

function useChatDialogContext() {
  const context = useContext(ChatDialogContext);
  if (context === null) {
    throw new Error('ChatDialog components must be used within ChatDialog');
  }
  return context;
}

interface ChatDialogState {
  position: { x: number; y: number };
  move: (position: { x: number; y: number }) => void;
}

const stores = new Map<string, UseBoundStore<StoreApi<ChatDialogState>>>();

const useChatDialogStoreFamily = (key: string) => {
  if (!stores.has(key)) {
    stores.set(
      key,
      create<ChatDialogState>((set) => ({
        position: { x: 0, y: 0 },
        move: (position) =>
          set((cur) => ({
            position: {
              x: cur.position.x + position.x,
              y: cur.position.y + position.y,
            },
          })),
      }))
    );
  }
  const store = stores.get(key);
  if (!store) {
    throw new Error('ChatDialogStore not found');
  }
  return store();
};

interface ChatDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  id: string;
}

export function ChatDialog({
  id,
  open,
  onOpenChange,
  children,
}: ChatDialogProps) {
  const { move } = useChatDialogStoreFamily(id);

  const isMobile = useIsMobile();

  const onDragEnd = (event: DragEndEvent) => {
    console.log('test!');

    // if (isMobile) return;
    const { x, y } = event.delta;
    move({ x, y });
  };

  return (
    <ChatDialogContext.Provider value={id}>
      <DndContext onDragEnd={onDragEnd}>
        <Dialog
          open={open}
          onOpenChange={onOpenChange}
          modal={false}
        >
          {children}
        </Dialog>
      </DndContext>
    </ChatDialogContext.Provider>
  );
}

export function ChatDialogContent({
  children,
  onFocusChange,
}: PropsWithChildren<{
  onFocusChange: (isFocused: boolean) => void;
}>) {
  const [isFocused, setIsFocused] = useState(false);
  const id = useChatDialogContext();
  const { position } = useChatDialogStoreFamily(id);

  const { setNodeRef, transform } = useDraggable({
    id,
  });

  const isMobile = useIsMobile();

  const style = isMobile
    ? {}
    : {
        transform: CSS.Transform.toString(transform),
      };

  return (
    <DialogContent
      animate={false}
      className="bg-slate-50 p-0 transition-none w-dvw h-dvh pc-screen:min-w-[400px] pc-screen:h-[calc(100dvh-100px)] max-w-[660px] max-h-[810px] translate-x-0 translate-y-0 gap-0 flex flex-col justify-between duration-0 resize overflow-auto "
      ref={setNodeRef}
      style={{
        ...style,
        top: position.y,
        left: position.x,
        zIndex: isFocused ? 41 : 40,
      }}
      onInteractOutside={(e) => e.preventDefault()}
      onFocus={() => {
        setIsFocused(true);
        onFocusChange?.(true);
      }}
      onBlur={() => {
        setIsFocused(false);
        onFocusChange?.(false);
      }}
    >
      {children}
    </DialogContent>
  );
}

export function ChatDialogHeader({ children }: PropsWithChildren) {
  const id = useChatDialogContext();
  const { attributes, listeners } = useDraggable({
    id,
  });

  return (
    <div className="flex items-center px-5 py-4 pc-screen:p-[30px] border-b border-b-slate-200  ">
      <DialogClose className="mr-4 pc-screen:hidden">
        <UntitledIcon.ChevronLeft />
      </DialogClose>
      <DialogHeader
        {...listeners}
        {...attributes}
        className="w-full"
      >
        <DialogTitle className="typo-title-18-bold-100 text-left pc-screen:text-center pc-screen:typo-title-18-medium-100">
          {children}
        </DialogTitle>
        <DialogDescription className="sr-only">채탕</DialogDescription>
      </DialogHeader>
    </div>
  );
}

export const ChatDialogBody = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<{ onScrollReachTop?: () => void }>
>(({ children, onScrollReachTop }, ref) => {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { ref: topRef } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) onScrollReachTop?.();
    },
  });

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView();
  };

  const handleScrollButtonVisible: React.UIEventHandler<HTMLDivElement> = (
    e
  ) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop < -500 && !scrollButtonVisible) {
      setScrollButtonVisible(true);
    }
    if (scrollTop > -500 && scrollButtonVisible) {
      setScrollButtonVisible(false);
    }
  };

  return (
    <>
      <div
        ref={ref}
        className="relative flex-1 overflow-y-scroll gap-[10px] p-[20px] flex flex-col-reverse"
        onScroll={handleScrollButtonVisible}
      >
        <div ref={bottomRef} />

        {children}
        <div
          className="w-full shrink-0"
          ref={topRef}
        />
      </div>
      {scrollButtonVisible && (
        <Button
          variant="outline"
          className="rounded-full fixed bottom-[100px] right-[20px]"
          size="icon-lg"
          onClick={scrollToBottom}
        >
          <UntitledIcon.ChevronDown className="size-[30px] untitled-icon" />
        </Button>
      )}
    </>
  );
});

ChatDialogBody.displayName = 'ChatDialogBody';

export function ChatDialogDate({ date }: { date: Date }) {
  return (
    <span className="typo-body-14-regular-150-tight text-slate-300">
      {formatDate(date, 'bbb hh:mm', { locale: ko })}
    </span>
  );
}

interface ChatDialogMessageProps {
  messages?: ChatMessage[];
}

export function ChatDialogMessage({ messages }: ChatDialogMessageProps) {
  const { data: myInfo } = useMyInfoQuery();

  return (
    <>
      {messages?.map(
        (
          {
            chatMessageId,
            message,
            sender,
            chatMessageType,
            createdAt,
            orderOptions,
            additionalFee,
            totalAmount,
            chatMessageImageUrl,
          },
          index
        ) => {
          const prevMessage: ChatMessage | undefined = messages[index + 1];
          const nextMessage: ChatMessage | undefined = messages[index - 1];
          const position = sender.userId === myInfo?.userId ? 'right' : 'left';

          const shouldDisplayTime =
            !isSameMinute(prevMessage?.createdAt, createdAt) ||
            nextMessage?.sender.userId !== sender.userId;

          const shouldDisplayDate = !isSameDay(
            prevMessage?.createdAt,
            createdAt
          );

          const isStartOfGroup = prevMessage?.sender.userId !== sender.userId;
          const isEndOfGroup = nextMessage?.sender.userId !== sender.userId;

          const shouldDisplayAvatar = isStartOfGroup || shouldDisplayDate;

          const isOrderMessage = !!(
            chatMessageType === 'ORDER' &&
            (orderOptions || additionalFee) &&
            totalAmount
          );

          const isTextMessage = chatMessageType === 'TEXT' && message;

          const isImageMessage =
            chatMessageType === 'IMAGE' && chatMessageImageUrl;

          return (
            <Fragment key={chatMessageId}>
              <li
                className={cn(
                  'flex gap-[10px] items-end w-full',
                  position === 'right' &&
                    'self-end pc-screen:pl-[100px] flex-row-reverse',
                  position === 'left' && 'self-start pc-screen:pr-[100px]'
                )}
              >
                <CommonAvatar
                  className={cn(
                    'self-start size-[32px]',
                    !shouldDisplayAvatar && 'invisible'
                  )}
                  nickname={sender.nickname}
                  src={sender.profileImageUrl}
                />

                {isTextMessage && (
                  <ChatDefaultMessage
                    position={position}
                    message={message}
                  />
                )}

                {isOrderMessage && (
                  <ChatOptionMessage
                    position={position}
                    options={orderOptions}
                    additionalFee={additionalFee}
                    totalAmount={totalAmount}
                  />
                )}

                {isImageMessage && (
                  <ChatImageMessage
                    imageUrl={chatMessageImageUrl}
                    position={position}
                  />
                )}

                <span
                  className={cn(
                    'typo-body-14-regular-150-tight text-slate-300 shrink-0',
                    !(isEndOfGroup || shouldDisplayTime) && 'invisible'
                  )}
                >
                  {formatDate(createdAt, 'bbb hh:mm', { locale: ko })}
                </span>
              </li>
              {shouldDisplayDate && (
                <span className="typo-caption-12-regular-100 self-center rounded-full bg-slate-100 p-[10px]">
                  {formatDate(createdAt, 'M. dd(iii)', { locale: ko })}
                </span>
              )}
            </Fragment>
          );
        }
      )}
    </>
  );
}

export function ChatDialogFooter({ children }: PropsWithChildren) {
  return (
    <div className="relative p-[10px] bg-white flex items-center gap-[10px] justify-between">
      {children}
    </div>
  );
}

export const ChatDialogImageInput = React.forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref: React.Ref<HTMLInputElement>) => {
  const id = useId();
  return (
    <label
      className="cursor-pointer"
      htmlFor={id}
    >
      <input
        ref={ref}
        id={id}
        type="file"
        hidden
        {...props}
      />
      <UntitledIcon.Image01 className="size-[30px] untitled-icon" />
    </label>
  );
});

ChatDialogImageInput.displayName = 'ChatDialogImageInput';

export const ChatDialogInput = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ value, onChange, ...props }, ref: React.Ref<HTMLTextAreaElement>) => {
  return (
    <div className="relative w-full">
      <Textarea
        ref={ref}
        autoResize
        className="max-h-[100px] pr-[72px]"
        submitOnEnter
        rows={1}
        value={value}
        onChange={onChange}
        placeholder="메시지를 입력해 주세요."
        {...props}
      />
      <button
        type="submit"
        className="absolute py-[4px] px-[10px] right-[12px] top-1/2 -translate-y-1/2 typo-body-14-regular-150-tight text-slate-300 pc-screen:right-[28px]"
      >
        입력
      </button>
    </div>
  );
});

ChatDialogInput.displayName = 'ChatDialogInput';
