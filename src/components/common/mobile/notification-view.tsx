'use client';

import { useState } from 'react';

import { NotificationList } from '@/components/navbar/notification-dropdown';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useNotificationSocket from '@/hooks/socket/use-notification-socket';
import { useModalWithBack } from '@/hooks/use-modal-with-back';
import { mergeListsWithDeduplication } from '@/lib/utils';
import {
  useNotificationList,
  useReadNotification,
} from '@/service/notification/use-service';
import { NotificationType } from '@/types/notification';
import { Bell02, ChevronLeft } from '@untitled-ui/icons-react';

import Indicator from '../indicator';
import { SecureButton } from '../secure-button';

const TabstwStyles = {
  trigger: `flex-1 text-[16px] leading-[150%] font-[400] text-slate-400 h-[48px] rounded-none 
    data-[state=active]:bg-transparent data-[state=active]:text-foreground 
    data-[state=active]:typo-body-16-bold-100-tight data-[state=active]:border-b-[3px] 
    data-[state=active]:border-b-slate-800  data-[state=active]:shadow-none`,
  wrapper: 'space-y-4',
  title: 'text-[14px] font-bold tracking-[0.28px] mr-[10px]',
  time: 'text-slate-500 typo-body-14-regular-150-tight',
  content: 'text-[14px] text-slate-700 leading-[150%] mt-[10px] tracking-base',
};

const MobileNotifiactionView = () => {
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

  const { open, setOpen } = useModalWithBack();

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <SecureButton
          requiredLevel="USER"
          className="relative"
        >
          <Bell02 />
          {hasUnreadNotification && (
            <Indicator className="absolute -right-[-1px] -top-[1px]" />
          )}
        </SecureButton>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-dvh bg-white"
      >
        <SheetHeader>
          <div className="flex items-center gap-x-4">
            <SheetClose>
              <ChevronLeft />
            </SheetClose>
            <SheetTitle className="text-left typo-title-20-bold-100-tight">
              알림
            </SheetTitle>
          </div>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <Tabs
          defaultValue="STORE"
          onValueChange={(value) => setTab(value as NotificationType)}
        >
          <TabsList className="w-full flex bg-transparent gap-x-[10px] mt-[6px] text-base tracking-[-0.32px]">
            <TabsTrigger
              value="STORE"
              className={TabstwStyles.trigger}
            >
              커미션
            </TabsTrigger>
            <TabsTrigger
              value="LOUNGE"
              className={TabstwStyles.trigger}
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
        {hasUnreadNotification && (
          <div className="w-full flex items-center py-[20px] px-[20px] justify-center">
            <button
              type="button"
              className="w-full"
              onClick={() => readNotificationMutate({ notificationType: tab })}
            >
              모두 읽음 처리
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNotifiactionView;
