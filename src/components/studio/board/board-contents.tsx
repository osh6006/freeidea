import { TabsContent } from '@/components/ui/tabs';

import BoardGuestBook from './guest-book/board-guest-book';
import BoardNoti from './noti/board-noti';
import BoardQna from './qna/board-qna';

const BoardContents = () => {
  return (
    <>
      <TabsContent
        value="noti"
        className="flex-1 "
      >
        <BoardNoti />
      </TabsContent>
      <TabsContent
        value="qna"
        className="w-full"
      >
        <BoardQna />
      </TabsContent>
      <TabsContent
        value="guestbook"
        className="w-full p-0 m-0 "
      >
        <BoardGuestBook />
      </TabsContent>
    </>
  );
};

export default BoardContents;
