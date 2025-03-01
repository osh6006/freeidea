import { NextRequest, NextResponse } from 'next/server';

import { BASE_PATH, PATH } from './constants/path';
import { decodeToken } from './lib/utils';
import { JWT } from './types/auth';
import { LEVEL_NUMBER } from './types/auth';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
/**
 * exact: 정확한 레벨 일치 여부, true면 일치하는(===) 레벨, false면 이상의 레벨(>=) 허용
 * default = false
 */
type T_PATH_PERMISSIONS = Record<
  string,
  | {
      level: (typeof LEVEL_NUMBER)[keyof typeof LEVEL_NUMBER];
      exact?: boolean;
    }
  | (typeof LEVEL_NUMBER)[keyof typeof LEVEL_NUMBER]
>;

/**
 * @description 접근 권한 여기서 관리하면 됩니다.
 * 노션 - 메뉴 구조도에 목록화 된 대로 정렬 해주세요.
 * 동적 path 일 경우 `:value` 형식으로 작성해주세요.
 * ADMIN, MASTER 계정은 권한 검사 무시하고 모든 페이지 접근 가능합니다.
 */
const PATH_PERMISSIONS: T_PATH_PERMISSIONS = {
  [`${BASE_PATH.admin}/:every`]: LEVEL_NUMBER.ADMIN,

  // 멤버십
  [PATH.membershipPayment]: LEVEL_NUMBER.AUTHOR,

  // 글쓰기
  [PATH.requestCreate]: LEVEL_NUMBER.USER,
  [PATH.portfolioCreate]: LEVEL_NUMBER.USER,
  [PATH.workCreate]: LEVEL_NUMBER.AUTHOR,

  // 피드
  [PATH.feedDetail(':id')]: LEVEL_NUMBER.USER,

  // 포트폴리오
  [PATH.portfolioDetail(':id')]: LEVEL_NUMBER.USER,

  // Q&A
  [PATH.loungeQna]: LEVEL_NUMBER.GUEST,
  [PATH.loungeQnaDetail(':id')]: LEVEL_NUMBER.USER,
  [PATH.loungeQnaWrite]: LEVEL_NUMBER.USER,

  // 마이페이지
  [`${BASE_PATH.myPage}/:every`]: LEVEL_NUMBER.USER,
  [PATH.myProfile]: LEVEL_NUMBER.USER,
  [PATH.myScrap]: LEVEL_NUMBER.USER,
  [PATH.myFollower]: LEVEL_NUMBER.USER,
  [PATH.myAuthorApply]: {
    level: LEVEL_NUMBER.USER,
    exact: true,
  },
  [PATH.myQuestion]: LEVEL_NUMBER.USER,
  [PATH.myRequesterList]: LEVEL_NUMBER.USER,
  [PATH.myRequestList]: LEVEL_NUMBER.USER,
  [PATH.myRequestState]: LEVEL_NUMBER.AUTHOR,
  [PATH.myStoreList]: LEVEL_NUMBER.AUTHOR,
  [PATH.myMemberShip]: LEVEL_NUMBER.USER,
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const userLevel = getUserLevel(request);

  if (userLevel === LEVEL_NUMBER.MASTER || userLevel === LEVEL_NUMBER.ADMIN) {
    return NextResponse.next();
  }

  const { canAccess } = checkAccess({
    pathname,
    userLevel,
  });

  if (!canAccess) {
    return NextResponse.rewrite(new URL(PATH.unauthorized, request.url));
  }
}

function getUserLevel(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  if (!refreshToken) return LEVEL_NUMBER.GUEST;
  const jwt = decodeToken<JWT>(refreshToken);
  return LEVEL_NUMBER[jwt.level];
}

function checkAccess({
  pathname,
  userLevel,
}: {
  pathname: string;
  userLevel: number;
}) {
  const requiredInfo =
    Object.entries(PATH_PERMISSIONS).find(([path, info]) => {
      const pathSegments = path.split('/');
      const pathnameSegments = pathname.split('/');

      const isDynamicPath = pathSegments.some((segment) =>
        segment.startsWith(':')
      );

      if (isDynamicPath) {
        return pathSegments.every((segment, index) => {
          if (segment.startsWith(':')) return true;
          return segment === pathnameSegments[index];
        });
      }

      return pathname === path;
    })?.[1] || LEVEL_NUMBER.GUEST;

  const requiredPathLevel =
    typeof requiredInfo === 'number' ? requiredInfo : requiredInfo.level;
  const exact = typeof requiredInfo === 'object' ? requiredInfo.exact : false;

  const canAccess = exact
    ? userLevel === requiredPathLevel
    : userLevel >= requiredPathLevel;

  return { requiredPathLevel, canAccess };
}
