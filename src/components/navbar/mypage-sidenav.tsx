'use client';

import { Fragment } from 'react';

import { usePathname } from 'next/navigation';

import {
  SideNav,
  SideNavGroup,
  SideNavLink,
  SideNavTitle,
} from '@/components/ui/side-nav';
import { scrapTabDict } from '@/constants/dictionary';
import { PATH } from '@/constants/path';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { Level } from '@/types/auth';

import { Separator } from '../ui/separator';

const NAV_WITH_FLAGS: {
  title: string;
  links: {
    href: string;
    label: string;
    levels: Level[];
  }[];
}[] = [
  {
    title: '프로필',
    links: [
      {
        href: PATH.myProfile,
        label: '프로필 관리',
        levels: ['USER', 'AUTHOR'],
      },
      {
        href: `${PATH.myScrap}?tab=${scrapTabDict.data.product.en}`,
        label: '스크랩',
        levels: ['USER', 'AUTHOR'],
      },
      {
        href: PATH.myFollower,
        label: '팔로워',
        levels: ['USER', 'AUTHOR'],
      },
      {
        href: PATH.myAuthorApply,
        label: '작가 신청하기',
        levels: ['USER'],
      },
    ],
  },
  {
    title: 'Q&A',
    links: [
      { href: PATH.myQuestion, label: '나의 질문', levels: ['USER', 'AUTHOR'] },
    ],
  },
  {
    title: '의뢰하기 / 커미션 관리',
    links: [
      {
        href: PATH.myRequestList,
        label: '나의 의뢰글',
        levels: ['USER', 'AUTHOR'],
      },
      {
        href: PATH.myRequesterList,
        label: '의뢰 지원자',
        levels: ['USER', 'AUTHOR'],
      },
      {
        href: PATH.myRequestState,
        label: '나의 지원 현황',
        levels: ['AUTHOR'],
      },

      {
        href: PATH.myStoreList,
        label: '나의 판매글',
        levels: ['AUTHOR'],
      },
      {
        href: PATH.myMileage,
        label: '마일리지 관리',
        levels: ['USER', 'AUTHOR'],
      },
      {
        href: PATH.myMemberShip,
        label: '멤버십 관리',
        levels: ['AUTHOR'],
      },
    ],
  },
];

function filterNavByRole(nav: typeof NAV_WITH_FLAGS, level: Level) {
  return nav
    .map(({ title, links }) => ({
      title,
      links: links.filter((link) => link.levels.includes(level)),
    }))
    .filter(({ links }) => links.length > 0);
}

export function MyPageSideNav() {
  const pathname = usePathname();
  const { data: myInfo } = useMyInfoQuery();

  const userLevel = myInfo?.userLevel || 'GUEST';
  const filteredNav = filterNavByRole(NAV_WITH_FLAGS, userLevel);

  return (
    <SideNav className="sticky left-0 top-[50px] h-screen">
      {filteredNav.map(({ title, links }, index) => (
        <Fragment key={title}>
          <SideNavGroup>
            <SideNavTitle>{title}</SideNavTitle>
            {links.map(({ href, label }) => (
              <SideNavLink
                key={label}
                href={href}
                isActive={href.includes(pathname)}
              >
                {label}
              </SideNavLink>
            ))}
          </SideNavGroup>
          {filteredNav.length - 1 !== index && <Separator />}
        </Fragment>
      ))}
    </SideNav>
  );
}
