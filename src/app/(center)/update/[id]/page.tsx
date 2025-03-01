import React from 'react';

import Image from 'next/image';

import Inner from '@/components/common/inner';
import UseCenterBreadCrumb from '@/components/use-center/bread-crumb';
import UseCenterDetailTitle from '@/components/use-center/detail-title';
import UseCenterRestMenus from '@/components/use-center/rest-menus';
import UseCenterSideMenu from '@/components/use-center/side-menu';
import { faker } from '@faker-js/faker';

export default function NoticeDetailPage() {
  // api로 id를 이용하여 데이터 가져옴
  return (
    <main className="w-full">
      <Inner maxWidth={1200}>
        <div className="flex justify-between gap-x-[130px] ">
          <section className="w-full flex-1 ">
            <UseCenterBreadCrumb
              title="프리디어 소개"
              className="mt-[42px]"
            />
            <UseCenterDetailTitle date="2024.01.01">
              프리디어 소개
            </UseCenterDetailTitle>
            <div className="prose prose-lg prose-w-full mt-[60px] max-w-full ">
              <h3>서브제목</h3>
              <p>{faker.lorem.sentences()}</p>
              <p>{faker.lorem.sentences()}</p>
              <p>{faker.lorem.sentences()}</p>
              <p>{faker.lorem.sentences()}</p>
              <Image
                src={faker.image.urlPicsumPhotos()}
                alt="이미지"
                width={0}
                height={0}
                sizes="1200px"
                className="rounded-[8px] mx-auto"
                style={{ width: '100%', height: 'auto' }}
              />
              <p>{faker.lorem.sentences()}</p>
              <p>{faker.lorem.sentences()}</p>
              <p>{faker.lorem.sentences()}</p>
            </div>
          </section>
          <UseCenterSideMenu className="mt-[42px]" />
        </div>
      </Inner>
      <UseCenterRestMenus />
    </main>
  );
}
