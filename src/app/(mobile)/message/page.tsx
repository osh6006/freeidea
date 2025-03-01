'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useRouter } from 'next/navigation';

import CommonChatDialog from '@/components/common/common-chat-dialog';
import Indicator from '@/components/common/indicator';
import {
  ReportDialog,
  ReportDialogContent,
} from '@/components/common/report-dialog';
import SeperatorDot from '@/components/common/seperator-dot';
import { UntitledIcon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Spinner from '@/components/ui/spinner';
import { useModalWithBack } from '@/hooks/use-modal-with-back';
import { formatCreatedTimeDate } from '@/lib/date';
import { ReportSchemaType } from '@/lib/zod/request/report-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useChatRoomList, useLeaveChatRoom } from '@/service/chat/use-service';
import { useReportMutation } from '@/service/report/use-service';
import { ChatMessageType } from '@/types/chat';
import { ChevronLeft } from '@untitled-ui/icons-react';

export default function MobileMessagePage() {
  const router = useRouter();

  const { data: myInfo } = useMyInfoQuery();
  const [isShowMore, setIsShowMore] = useState(false);

  const [selectedChatRooms, setSelectedChatRooms] = useState<string[]>([]);

  const { mutate: leaveChatRoomMutate } = useLeaveChatRoom();
  const { mutate: reportMutate } = useReportMutation('chatMessage');

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useChatRoomList();
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !isFetchingNextPage && hasNextPage) fetchNextPage();
    },
  });

  const { flattenList } = data || {};
  const allChatList = flattenList || [];
  const roomsToShow =
    (isShowMore ? allChatList : allChatList?.slice(0, 6)) || [];

  useEffect(() => {
    const handlePopState = () => {
      if (selectedChatRooms.length > 0) {
        setSelectedChatRooms([]);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedChatRooms]);

  const onChatRoomOpenChange = (chatRoomId: string, isOpen: boolean) => {
    if (isOpen) {
      window.history.pushState({ chatRoomOpen: true }, '');
      setSelectedChatRooms((prev) => [...prev, chatRoomId]);
    } else {
      setSelectedChatRooms((prev) => prev.filter((id) => id !== chatRoomId));
    }
  };

  const onChatRoomClick = (chatRoomId: string) => {
    const isOpen = selectedChatRooms.includes(chatRoomId);
    onChatRoomOpenChange(chatRoomId, !isOpen);
  };

  return (
    <main className="max-w-[1200px] mx-auto py-4">
      <div className="flex items-center gap-x-4 px-[20px]">
        <button onClick={() => router.back()}>
          <ChevronLeft />
        </button>
        <div className="text-left typo-title-20-bold-100-tight">메시지</div>
      </div>

      <div className="flex typo-body-16-bold-100-tight mt-4 px-[20px]">
        <button className="border-b border-slate-800 py-[8px] px-0">
          전체
        </button>
      </div>
      <Separator className="mb-[10px] " />
      {roomsToShow.length > 0 ? (
        roomsToShow.map(
          ({ chatRoomId, profileImageUrl, nickname, lastMessage }) => (
            <MessageItem
              isRead={
                lastMessage.userId === myInfo?.userId ||
                lastMessage.isReceiverRead
              }
              key={chatRoomId}
              chatRoomId={chatRoomId}
              profileImageUrl={profileImageUrl}
              nickname={nickname}
              createdAt={lastMessage.createdAt}
              message={lastMessage.message}
              chatMessageType={lastMessage.chatMessageType}
              onChatRoomClick={() => onChatRoomClick(chatRoomId)}
              onReportSubmit={({ title, contents }) =>
                reportMutate({
                  id: lastMessage.chatMessageId,
                  body: { title, contents },
                })
              }
              onLeaveClick={() => leaveChatRoomMutate(chatRoomId)}
            />
          )
        )
      ) : (
        <div className="py-[30px] px-[60px] text-center">대화방이 없어요</div>
      )}
      {!isShowMore && (allChatList?.length || 0) > 6 && (
        <>
          <Separator />
          <div className="flex justify-center items-center mt-[10px]">
            <button
              type="button"
              onClick={() => setIsShowMore(true)}
              className="typo-body-14-medium-100-tight  py-[19px] px-[20px]"
            >
              더보기
            </button>
          </div>
        </>
      )}
      {hasNextPage && <div ref={ref} />}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {selectedChatRooms.map((chatRoomId) => (
        <CommonChatDialog
          key={chatRoomId}
          chatRoomId={chatRoomId}
          isOpen={selectedChatRooms.includes(chatRoomId)}
          onOpenChange={(isOpen) => onChatRoomOpenChange(chatRoomId, isOpen)}
        />
      ))}
    </main>
  );
}

function MessageItem({
  profileImageUrl,
  nickname,
  createdAt,
  message,
  chatMessageType,
  onReportSubmit,
  onChatRoomClick,
  onLeaveClick,
  isRead,
}: {
  profileImageUrl: string;
  nickname: string;
  createdAt: string;
  message: string;
  chatRoomId: string;
  chatMessageType: ChatMessageType;
  isRead: boolean;
  onChatRoomClick: () => void;
  onReportSubmit: (data: ReportSchemaType) => void;
  onLeaveClick: () => void;
}) {
  const label = {
    TEXT: message,
    IMAGE: '(이미지)',
    ORDER: '(주문)',
    SYSTEM: '(시스템)',
  };

  return (
    <div className="flex justify-between gap-[10px] items-center px-[20px] py-[10px]">
      <button
        className="relative flex gap-[10px] items-center "
        onClick={onChatRoomClick}
      >
        <Avatar className="size-[40px]">
          <AvatarImage src={profileImageUrl} />
          <AvatarFallback>{nickname.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-[4px] items-start ">
          <div className="flex items-center gap-[4px]">
            <p className="typo-body-14-semi-bold-100-tight">{nickname}</p>
            <SeperatorDot />
            <p className="typo-body-14-medium-100-tight text-slate-300">
              {formatCreatedTimeDate(new Date(createdAt))}
            </p>
            {!isRead && <Indicator />}
          </div>
          <div className="text-left w-[220px] truncate typo-body-14-regular-150-tight text-slate-500">
            {label[chatMessageType]}
          </div>
        </div>
      </button>

      <KebabMenu
        onLeaveClick={onLeaveClick}
        onReportSubmit={onReportSubmit}
      />
    </div>
  );
}

function KebabMenu({
  onLeaveClick,
  onReportSubmit,
}: {
  onLeaveClick: () => void;
  onReportSubmit: (data: ReportSchemaType) => void;
}) {
  const [isReportOpen, setReportOpen] = useState(false);
  const { open: isLeaveOpen, setOpen: setLeaveOpen } = useModalWithBack();

  return (
    <>
      <Sheet>
        <SheetTrigger className="self-start">
          <UntitledIcon.DotsVertical className="size-[18px]" />
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="rounded-t-[12px] p-0 bg-white"
          isClose
        >
          <SheetHeader className="py-4">
            <SheetTitle className="text-center">설정</SheetTitle>
          </SheetHeader>
          <SheetClose asChild>
            <button
              className="w-full flex items-center justify-center border-t border-b py-4"
              onClick={() => setReportOpen(true)}
            >
              신고
            </button>
          </SheetClose>
          <SheetClose asChild>
            <button
              className="w-full  flex items-center justify-center py-4"
              onClick={() => setLeaveOpen(true)}
            >
              나가기
            </button>
          </SheetClose>
        </SheetContent>
      </Sheet>
      <ReportDialog
        open={isReportOpen}
        onOpenChange={setReportOpen}
      >
        <ReportDialogContent onValidSubmit={onReportSubmit} />
      </ReportDialog>

      <Dialog
        open={isLeaveOpen}
        onOpenChange={setLeaveOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>채팅방을 나가시겠습니까?</DialogTitle>
            <DialogDescription>
              채팅방을 종료하면 해당 작가와의 대화방에 다시 입장해도 <br />
              기존 메시지 내역을 다시 볼 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1"
              >
                취소
              </Button>
            </DialogClose>
            <DialogClose
              onClick={onLeaveClick}
              asChild
            >
              <Button className="flex-1">확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
