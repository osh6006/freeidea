import React from 'react';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';

const TabTriggerStyle = `
    w-full h-[36px] px-[12px] py-2 typo-body-14-medium-100-tight flex justify-start bg-transparent rounded-none
    data-[state=active]:bg-slate-50 data-[state=active]:shadow-none
`;

const BoardSideTabs = () => {
  return (
    <>
      <TabsList className="sticky top-[56px] min-w-[220px] h-full flex flex-col gap-y-2 justify-start text-slate-800 items-start bg-transparent">
        <TabsTrigger
          value="noti"
          className={TabTriggerStyle}
        >
          공지
        </TabsTrigger>
        <TabsTrigger
          value="qna"
          className={TabTriggerStyle}
        >
          Q&A
        </TabsTrigger>
        <TabsTrigger
          value="guestbook"
          className={TabTriggerStyle}
        >
          방명록
        </TabsTrigger>
      </TabsList>
    </>
  );
};

export default BoardSideTabs;
