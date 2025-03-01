import React, { Suspense } from 'react';

import Pagination from '@/components/common/pagination';
import UseCenterBanner from '@/components/use-center/banner';
import UseCenterBreadCrumb from '@/components/use-center/bread-crumb';
import UseCenterWritingList from '@/components/use-center/writing-list';
import { faker } from '@faker-js/faker';

const tempTypeObj = {
  general: '일반',
  important: '중요',
};

function NoticePage() {
  const writingList: {
    id: string;
    title: string;
    date: string;
    type: 'news' | 'important' | 'general' | 'winner';
  }[] = Array.from(
    {
      length: 20,
    },
    (_, i) => {
      return {
        id: faker.string.uuid(),
        title: '테스트 의뢰자 가이드 글' + i,
        date: '24.07.14',
        type: Object.keys(tempTypeObj)[Math.floor(Math.random() * 2)] as
          | 'news'
          | 'important'
          | 'general'
          | 'winner',
      };
    }
  );

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <main className="max-w-[1200px] mx-auto pb-[200px]">
        <UseCenterBreadCrumb className="mt-[42px]" />
        <UseCenterBanner
          title="의뢰자 가이드"
          desc="프리디어 의뢰자 가이드를 알려드립니다"
        />
        <UseCenterWritingList
          writingList={writingList}
          path="guide"
        />
        <Pagination
          visibleButtonCount={5}
          pagePerItem={5}
          totalPost={writingList.length}
          className="mt-[100px]"
        />
      </main>
    </Suspense>
  );
}

export default NoticePage;
