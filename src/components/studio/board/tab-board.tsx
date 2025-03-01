import { Tabs } from '@/components/ui/tabs';

import BoardContents from './board-contents';
import BoardSideTabs from './board-side-tabs';

const TabBoard = () => {
  return (
    <>
      <Tabs
        defaultValue="noti"
        className="w-full flex gap-x-[30px]"
      >
        <BoardSideTabs />
        <BoardContents />
      </Tabs>
    </>
  );
};

export default TabBoard;
