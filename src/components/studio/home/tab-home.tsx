'use client';

import { useParams } from 'next/navigation';

import HomeNotification from '@/components/studio/home/home-notification';
import HomePortfolioList from '@/components/studio/home/home-portfolio-list';
import HomeWorkList from '@/components/studio/home/home-work-list';
import TabEmpty from '@/components/studio/tab-empty';
import { useMyInfoQuery } from '@/service/auth/use-service';
import {
  useStudioHomePortfolioListQuery,
  useStudioHomeStoreListQuery,
  useStudioProfileQuery,
} from '@/service/studio/use-service';

const TabHome = () => {
  const { id }: { id: string } = useParams();
  const { data: myInfo } = useMyInfoQuery();
  const { data: studioInfo } = useStudioProfileQuery(id);

  const { data: portfolioList, isLoading: isPortfolioLoading } =
    useStudioHomePortfolioListQuery(id);
  const { data: workList, isLoading: isWorkListLoading } =
    useStudioHomeStoreListQuery(id, {
      page: 1,
      limit: 4,
    });

  const isMe = id === myInfo?.studioId;

  return (
    <>
      <HomeNotification />
      {workList?.list.length === 0 && portfolioList?.list.length === 0 ? (
        <TabEmpty
          title="등록된 작품이 없어요"
          buttonTitle="포트폴리오 등록하러 가기"
          path="/"
          isMe={isMe}
        />
      ) : (
        <>
          <HomePortfolioList
            totalCount={portfolioList?.count || 0}
            portfolioList={portfolioList?.list || []}
            isLoading={isPortfolioLoading}
          />

          {studioInfo?.userLevel === 'AUTHOR' && (
            <HomeWorkList
              homeWorkList={workList?.list || []}
              totalCount={workList?.count || 0}
              isLoading={isWorkListLoading}
            />
          )}
        </>
      )}
    </>
  );
};

export default TabHome;
