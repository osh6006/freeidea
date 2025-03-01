'use client';

import { useParams, useRouter } from 'next/navigation';

import Inner from '@/components/common/inner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { studioTabDict } from '@/constants/dictionary';
import { ELEMENT_ID } from '@/constants/element-id';
import useQueryString from '@/hooks/use-query-string';
import { cn } from '@/lib/utils';
import { useStudioProfileQuery } from '@/service/studio/use-service';
import { TabListStyle, TabsTriggerStyle } from '@/styles/studio';

import ScrollUpButton from '../common/scroll-up-button';
import TabBoard from './board/tab-board';
import TabHome from './home/tab-home';
import TabFeed from './tab-feed';
import TabPortfolio from './tab-portfolio';
import TabStore from './tab-store';

const tabList = ['home', 'store', 'feed', 'portfolio', 'board'];

const StudioTab = () => {
  const router = useRouter();
  const { id }: { id: string } = useParams();

  const { data: studioInfo } = useStudioProfileQuery(id);

  const { pathname, searchParams, createQueryString } = useQueryString();
  const currentTab = searchParams.get('tab');

  const isGeneralUser = studioInfo?.userLevel === 'USER';

  return (
    <section
      id={ELEMENT_ID.studioTab}
      className="mt-[50px] scroll-mt-[50px]"
    >
      <Tabs value={currentTab || 'home'}>
        <TabsList className={TabListStyle}>
          <Inner className="m-0 space-x-[20px] w-full h-full">
            {tabList.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  TabsTriggerStyle,
                  tab === 'store' && isGeneralUser && 'hidden',
                  tab === 'feed' && isGeneralUser && 'hidden'
                )}
                asChild
              >
                <button
                  onClick={() => {
                    router.replace(
                      pathname + '?' + createQueryString('tab', tab),
                      {
                        scroll: false,
                      }
                    );
                  }}
                >
                  {studioTabDict.getTranslator('en-ko').translate(tab)}
                </button>
              </TabsTrigger>
            ))}
          </Inner>
        </TabsList>
        <Inner className="mt-[50px]">
          <TabsContent value="home">
            <TabHome />
          </TabsContent>
          <TabsContent value="store">
            <TabStore />
          </TabsContent>
          <TabsContent value="feed">
            <TabFeed />
          </TabsContent>
          <TabsContent value="portfolio">
            <TabPortfolio />
          </TabsContent>
          <TabsContent value="board">
            <TabBoard />
          </TabsContent>
        </Inner>
        <ScrollUpButton />
      </Tabs>
    </section>
  );
};

export default StudioTab;
