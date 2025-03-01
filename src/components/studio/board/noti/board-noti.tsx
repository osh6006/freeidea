'use client';

import { useParams } from 'next/navigation';

import { useMyInfoQuery } from '@/service/auth/use-service';
import { useStudioProfileQuery } from '@/service/studio/use-service';

import BoardNotiList from './noti-list';
import BoardNotiWrite from './noti-write';

const BoardNoti = () => {
  const params = useParams<{ id: string }>();
  const { data: myInfo } = useMyInfoQuery();
  const { data: profileInfo } = useStudioProfileQuery(params.id);

  const isMe = myInfo?.userId === profileInfo?.userId;

  return (
    <>
      {isMe && <BoardNotiWrite />}
      <BoardNotiList />
    </>
  );
};

export default BoardNoti;
