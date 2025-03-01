import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { TabListStyle, TabsTriggerStyle } from '@/styles/studio';

import TabFollower from './tab-follower';
import TabFollowing from './tab-following';
import TabIntro from './tab-intro';

const CustomTabsTriggerStyles = cn(
  TabsTriggerStyle,
  `
   typo-body-14-bold-100-tight text-slate-300 
   border-b
   data-[state=active]:border-b data-[state=active]:border-slate-800
  `
);

const ProfileDialogTab = () => {
  return (
    <Tabs defaultValue="intro">
      <TabsList
        className={cn(
          TabListStyle,
          'flex justify-start gap-x-5 border-slate-200 rounded-none'
        )}
      >
        <TabsTrigger
          value="intro"
          className={CustomTabsTriggerStyles}
        >
          내 소개
        </TabsTrigger>
        <TabsTrigger
          value="follower"
          className={CustomTabsTriggerStyles}
        >
          팔로워
        </TabsTrigger>
        <TabsTrigger
          value="following"
          className={CustomTabsTriggerStyles}
        >
          팔로잉
        </TabsTrigger>
      </TabsList>

      <ScrollArea className="h-[215px] pt-[20px]">
        <TabIntro />
        <TabFollower />
        <TabFollowing />
      </ScrollArea>
    </Tabs>
  );
};

export default ProfileDialogTab;
