import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Indicator from '@/components/common/indicator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import useNotificationSocket from '@/hooks/socket/use-notification-socket';
import { formatCreatedTimeDate } from '@/lib/date';
import { cn, mergeListsWithDeduplication } from '@/lib/utils';
import {
  useNotificationList,
  useReadNotification,
} from '@/service/notification/use-service';
import { Notification, NotificationType } from '@/types/notification';

import { Separator } from '../ui/separator';
import Spinner from '../ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface INotificationDropdownProps {
  className?: string;
}

const TabTriggerStyle =
  'flex-1 text-slate-400 h-[44px] rounded-none data-[state=active]:bg-transparent data-[state=active]:text-foreground  data-[state=active]:border-b-[3px] data-[state=active]:border-b-slate-800  data-[state=active]:shadow-none';
const NotificationWrapperStyle = 'space-y-4';
const NotificationTitleStyle =
  'text-[14px] font-bold tracking-[0.28px] mr-[10px]';
const NotificationTimeStyle = 'text-slate-500 typo-body-14-regular-150-tight';
const NotificationContentsStyle =
  'text-[14px] text-slate-700 leading-[150%] mt-[10px] tracking-base';

const NotificationDropdown = ({ className }: INotificationDropdownProps) => {
  const [tab, setTab] = useState<NotificationType>('STORE');
  const { notifications: realTimeStoreNotifications } =
    useNotificationSocket('STORE');
  const { notifications: realTimeLoungeNotifications } =
    useNotificationSocket('LOUNGE');
  const { data: storeNotificationData } = useNotificationList('STORE');
  const { data: loungeNotificationData } = useNotificationList('LOUNGE');
  const { mutate: readNotificationMutate } = useReadNotification();

  const storeNotifications = mergeListsWithDeduplication({
    list1: realTimeStoreNotifications,
    list2: storeNotificationData?.flattenList || [],
    key: 'notificationId',
  });

  const loungeNotifications = mergeListsWithDeduplication({
    list1: realTimeLoungeNotifications,
    list2: loungeNotificationData?.flattenList || [],
    key: 'notificationId',
  });

  const notifications = [...storeNotifications, ...loungeNotifications];

  const hasUnreadNotification = notifications.some((noti) => !noti.isRead);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative flex items-center justify-center">
        {
          <>
            <p className={className}>알림</p>
            {hasUnreadNotification && (
              <Indicator className="absolute -right-[4px] -top-[1px]" />
            )}
          </>
        }
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[360px] h-fit p-0 rounded-[10px] px-[20px]">
        <Tabs
          defaultValue="STORE"
          onValueChange={(value) => setTab(value as NotificationType)}
        >
          <TabsList className="w-full flex bg-transparent gap-x-[10px] mt-[6px] text-base tracking-[-0.32px]">
            <TabsTrigger
              value="STORE"
              className={TabTriggerStyle}
            >
              커미션
            </TabsTrigger>
            <TabsTrigger
              value="LOUNGE"
              className={TabTriggerStyle}
            >
              라운지
            </TabsTrigger>
          </TabsList>
          <div className="mt-[20px] mb-[20px] typo-caption-12-regular-100 py-2 text-center rounded bg-pink-tint-10">
            최근 30일 동안의 알림만 보관되며, 이후 자동 삭제됩니다.
          </div>
          <TabsContent value="STORE">
            <NotificationList type="STORE" />
          </TabsContent>
          <TabsContent value="LOUNGE">
            <NotificationList type="LOUNGE" />
          </TabsContent>
        </Tabs>
        <div className="w-full flex items-center py-[20px] px-[20px] justify-center">
          <button
            type="button"
            className="w-full"
            onClick={() => readNotificationMutate({ notificationType: tab })}
          >
            모두 읽음 처리
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function NotificationList({ type }: { type: NotificationType }) {
  const { notifications: realTimeNotifications } = useNotificationSocket(type);
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isLoading } =
    useNotificationList(type);

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  const historicalNotifications = data?.flattenList || [];

  const notifications = mergeListsWithDeduplication({
    list1: realTimeNotifications,
    list2: historicalNotifications,
    key: 'notificationId',
  });

  return (
    <ScrollArea className="max-h-[480px] w-full">
      {isLoading ? (
        <div className="flex items-center justify-center h-full py-[40px]">
          <Spinner />
        </div>
      ) : notifications && notifications.length > 0 ? (
        <ul className={NotificationWrapperStyle}>
          {notifications.map((noti) => (
            <NotificationItem
              key={noti.notificationId}
              {...noti}
            />
          ))}
        </ul>
      ) : (
        <div className="flex items-center justify-center h-full py-[40px]">
          알림 내역이 없습니다.
        </div>
      )}
      {hasNextPage && <div ref={ref} />}
    </ScrollArea>
  );
}

export function NotificationItem({
  title,
  message,
  isRead,
  createdAt,
}: Notification) {
  return (
    <li>
      <div className={cn('flex items-center')}>
        <Indicator
          active={!isRead}
          className={cn('w-1 h-1 rounded-full mr-1')}
        />
        <p className={NotificationTitleStyle}>{title}</p>
        <time className={NotificationTimeStyle}>
          {formatCreatedTimeDate(new Date(createdAt))}
        </time>
      </div>
      <p className={NotificationContentsStyle}>{message}</p>
      <Separator className="mt-4" />
    </li>
  );
}

export default NotificationDropdown;
