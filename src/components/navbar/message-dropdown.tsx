import * as React from 'react';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useChatRoomListSocket } from '@/hooks/socket/use-chat-room-list-socket';
import { formatCreatedTimeDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import { ReportSchemaType } from '@/lib/zod/request/report-schema';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { useChatRoomList, useLeaveChatRoom } from '@/service/chat/use-service';
import { useReportMutation } from '@/service/report/use-service';
import { ChatMessageType } from '@/types/chat';

import CommonChatDialog from '../common/common-chat-dialog';
import Indicator from '../common/indicator';
import { ReportDialog, ReportDialogContent } from '../common/report-dialog';
import SeperatorDot from '../common/seperator-dot';
import { UntitledIcon } from '../icon';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

interface IMesssageDropdownProps {
  className?: string;
}

const MesssageDropdown: React.FunctionComponent<IMesssageDropdownProps> = ({
  className,
}) => {
  const { data: myInfo } = useMyInfoQuery();
  useChatRoomListSocket(myInfo?.userId);

  const [selectedChatRooms, setSelectedChatRooms] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useChatRoomList();
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && !isFetchingNextPage && hasNextPage) fetchNextPage();
    },
  });

  const { mutate: leaveChatRoomMutate } = useLeaveChatRoom();

  const { mutate: reportMutate } = useReportMutation('chatMessage');

  const { flattenList } = data || {};

  const allChatList = flattenList || [];

  const hasUnreadChatRoom = allChatList?.some(({ lastMessage }) => {
    return lastMessage.userId !== myInfo?.userId && !lastMessage.isReceiverRead;
  });

  const roomsToShow =
    (isShowMore ? allChatList : allChatList?.slice(0, 6)) || [];

  const onChatRoomOpenChange = (chatRoomId: string, isOpen: boolean) => {
    if (isOpen) {
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
    <>
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          if (open) {
            setIsShowMore(false);
          }
          setIsOpen(open);
        }}
      >
        <PopoverTrigger className={cn('relative', className)}>
          <span>메시지</span>
          {hasUnreadChatRoom && (
            <Indicator className="absolute -right-[4px] -top-[1px]" />
          )}
        </PopoverTrigger>
        <PopoverContent className="p-0 py-[10px] w-fit">
          <h3 className="relative typo-title-18-medium-100-tight text-center content-center h-[56px]">
            메시지
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-1/2 -translate-y-1/2 right-[16px]"
            >
              <UntitledIcon.XClose />
            </button>
          </h3>
          <div className="flex px-[20px]">
            <button className="typo-body-14-medium-100-tight border-b border-slate-800 py-[8px] px-0">
              전체
            </button>
          </div>
          <Separator className="mb-[10px]" />
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
            <div className="py-[30px] px-[60px]">대화방이 없어요</div>
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
          {isFetchingNextPage && <Skeleton className="h-[48px] mx-[20px]" />}
        </PopoverContent>
      </Popover>
      {selectedChatRooms.map((chatRoomId) => (
        <CommonChatDialog
          key={chatRoomId}
          chatRoomId={chatRoomId}
          isOpen={selectedChatRooms.includes(chatRoomId)}
          onOpenChange={(isOpen) => onChatRoomOpenChange(chatRoomId, isOpen)}
        />
      ))}
    </>
  );
};

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
    <div className="flex justify-between gap-[10px] items-center pc-screen:w-[380px] px-[20px] py-[10px]">
      <button
        className="relative flex gap-[10px] items-center "
        onClick={onChatRoomClick}
      >
        <Avatar className="size-[48px]">
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
  const [isLeaveOpen, setLeaveOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="self-start">
          <UntitledIcon.DotsVertical className="size-[18px]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem
            className="w-full"
            onSelect={() => setReportOpen(true)}
          >
            신고
          </DropdownMenuItem>

          <DropdownMenuItem
            className="w-full"
            onSelect={() => setLeaveOpen(true)}
          >
            나가기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
              <Button variant="outline">취소</Button>
            </DialogClose>
            <DialogClose
              onClick={onLeaveClick}
              asChild
            >
              <Button>확인</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MesssageDropdown;
