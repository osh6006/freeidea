'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import {
  HOME_SUB_NAVBAR_PATHS,
  LOUNGE_SUB_NAVBAR_PATHS,
  SEARCH_SUB_NAVBAR_PATHS,
  STORE_SUB_NAVBAR_PATHS,
  SubNavbarPath,
} from '@/constants/path';
import { PATH } from '@/constants/path';
import { useIsMobile } from '@/hooks/use-mobile';
import useQueryString from '@/hooks/use-query-string';
import { hiddenRoutePatterns } from '@/lib/regex';
import { useMyInfoQuery } from '@/service/auth/use-service';

import { SecureLink } from '../common/secure-button';
import { Button } from '../ui/button';
import { SubNavLink, SubNavbar } from '../ui/sub-nav-bar';
import WritingMenu from './writing-menu';

interface CommonSubNavbarProps {
  paths: SubNavbarPath[];
  isActive?: (path: string) => boolean;
}

function CommonSubNavbar({ paths, isActive }: CommonSubNavbarProps) {
  const { data } = useMyInfoQuery();

  return (
    <SubNavbar>
      <div className="flex items-center gap-[30px]">
        {paths.map(({ label, path, variant }) => (
          <SubNavLink
            key={path}
            href={path}
            variant={variant}
            isActive={isActive?.(path)}
          >
            {label}
          </SubNavLink>
        ))}
      </div>
      <div className="gap-x-[10px] items-center hidden pc-screen:flex">
        <>
          {data?.userLevel !== 'MASTER' && data?.userLevel !== 'ADMIN' ? (
            <WritingMenu userLevel={data?.userLevel ?? 'GUEST'} />
          ) : null}
          <Button asChild>
            <SecureLink
              href={data ? PATH.studio(data.studioId) : '#'}
              requiredLevel="USER"
              className="w-[144px]"
            >
              스튜디오
            </SecureLink>
          </Button>
        </>
      </div>
    </SubNavbar>
  );
}

export function HomeSubNavbar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const shouldHideNavbar =
    isMobile && hiddenRoutePatterns.some((pattern) => pattern.test(pathname));

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <CommonSubNavbar
      paths={HOME_SUB_NAVBAR_PATHS}
      isActive={(path) => {
        return pathname.split('/')[2] === path.split('/')[2];
      }}
    />
  );
}

export function LoungeSubNavbar() {
  const pathname = usePathname();

  return (
    <CommonSubNavbar
      paths={LOUNGE_SUB_NAVBAR_PATHS}
      isActive={(path) => pathname.split('/')[2] === path.split('/')[2]}
    />
  );
}

export function StoreSubNavbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <CommonSubNavbar
      paths={STORE_SUB_NAVBAR_PATHS}
      isActive={(path) => {
        // '추천' 페이지에 대한 처리
        if (!category) {
          return path === PATH.storeList;
        }
        return path.startsWith(pathname) && path.includes(category);
      }}
    />
  );
}

export function SearchSubNavbar() {
  const { pathname, searchParams } = useQueryString();
  const queryString = searchParams.toString();
  const fullPath = `${pathname}?${queryString}`;

  const SEARCH_SUB_NAVBAR_PATHS_WITH_QUERY = SEARCH_SUB_NAVBAR_PATHS.map(
    ({ path, label }) => ({ path: `${path}?${queryString}`, label })
  );

  return (
    <CommonSubNavbar
      paths={SEARCH_SUB_NAVBAR_PATHS_WITH_QUERY}
      isActive={(path) => fullPath.startsWith(path)}
    />
  );
}
