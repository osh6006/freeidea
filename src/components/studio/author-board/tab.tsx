import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { TabListStyle, TabsTriggerStyle } from '@/styles/studio';

import TabSchedule from './tab-schedule';
import TabSlot from './tab-slot';

const CustomTabsTriggerStyle = cn(
  TabsTriggerStyle,
  `
   typo-body-14-bold-100-tight
   border-b-2
   data-[state=active]:border-b-2
  `
);

const AuthorBoardTab = () => {
  return (
    <Tabs defaultValue="slot">
      <TabsList
        className={cn(
          TabListStyle,
          'flex justify-start gap-x-5 border-slate-200 typo-body-14-bold-100-tight rounded-none'
        )}
      >
        <TabsTrigger
          value="slot"
          className={CustomTabsTriggerStyle}
        >
          슬롯
        </TabsTrigger>
        <TabsTrigger
          value="schedule"
          className={CustomTabsTriggerStyle}
        >
          일정
        </TabsTrigger>
      </TabsList>
      <TabsContent value="slot">
        <TabSlot />
      </TabsContent>
      <TabsContent value="schedule">
        <TabSchedule />
      </TabsContent>
    </Tabs>
  );
};

export default AuthorBoardTab;
