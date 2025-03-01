import { Suspense } from 'react';

import ChannelTalk from '@/components/common/channel-talk';
import DeferredComponent from '@/components/common/deferred-component';
import Inner from '@/components/common/inner';
import FloatingActionButton from '@/components/common/mobile/floating-action-button';
import ScrollUpButton from '@/components/common/scroll-up-button';
import ArtWorkGrid from '@/components/home/art-work-grid';
import AuthorCuration from '@/components/home/author-curation';
import Banner from '@/components/home/banner';
import BestAuthor from '@/components/home/best-author';
import BottomBanner from '@/components/home/buttom-banner';
import MiddleSeperator from '@/components/home/middle-seperator';
import NewAuthor from '@/components/home/new-author';
import RecommendPick from '@/components/home/recommend-pick';
import ArtWorkGridSkeleton from '@/components/home/skeleton/art-work-skeleton';
import BannerSkeleton from '@/components/home/skeleton/banner-skeleton';
import BestAuthorSkeleton from '@/components/home/skeleton/bestAuthor-skeleton';
import WhatAboutTheseWorks from '@/components/home/what-about-these-works';

export default function HomePage() {
  return (
    <main>
      <ChannelTalk />
      <Inner
        maxWidth={1200}
        className=""
      >
        <Suspense
          fallback={
            <DeferredComponent>
              <BannerSkeleton />
            </DeferredComponent>
          }
        >
          <Banner />
        </Suspense>
        <div className="px-[20px] pc-screen:px-0">
          <Suspense
            fallback={
              <DeferredComponent>
                <BestAuthorSkeleton />
              </DeferredComponent>
            }
          >
            <BestAuthor />
          </Suspense>
          <RecommendPick />
          <AuthorCuration />

          {/*  */}
          <MiddleSeperator />
          {/*  */}

          <WhatAboutTheseWorks />
          <NewAuthor />

          <Suspense
            fallback={
              <DeferredComponent>
                <ArtWorkGridSkeleton />
              </DeferredComponent>
            }
          >
            <ArtWorkGrid />
          </Suspense>
        </div>
      </Inner>
      <BottomBanner />
      <div className="pc-screen:hidden">
        <FloatingActionButton />
        <ScrollUpButton />
      </div>
    </main>
  );
}
