import React, { Suspense } from 'react';

import Pagination from '@/components/common/pagination';
import UseCenterAccordionList from '@/components/use-center/accordion-list';
import UseCenterBanner from '@/components/use-center/banner';
import UseCenterBreadCrumb from '@/components/use-center/bread-crumb';
import { faker } from '@faker-js/faker';

function NoticePage() {
  const writingList: {
    id: string;
    title: string;
    contents: string;
  }[] = Array.from(
    {
      length: 20,
    },
    (_, i) => {
      return {
        id: faker.string.uuid(),
        title: '테스트 배너 광고 안내 글' + i,
        contents: '테스트 배너 광고 안내 내용 ' + i,
      };
    }
  );

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <main className="max-w-[1200px] mx-auto pb-[200px]">
        <UseCenterBreadCrumb />
        <UseCenterBanner
          title="배너 광고 안내"
          desc="프리디어 배너 광고 안내를 알려드립니다"
        />
        <UseCenterAccordionList
          accordionList={writingList}
          className="mt-[60px]"
        />
        <Pagination
          visibleButtonCount={5}
          pagePerItem={5}
          totalPost={writingList.length}
          className="mt-[80px]"
        />
      </main>
    </Suspense>
  );
}

export default NoticePage;
