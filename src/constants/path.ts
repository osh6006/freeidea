export const BASE_PATH = {
  myPage: '/mypage',
  write: '/write',
  update: '/update',
  store: '/store',
  membership: '/membership',
  admin: '/admin',
};

export const PATH = {
  unauthorized: '/unauthorized',

  // === Home === //
  home: '/home',
  requestCreate: `${BASE_PATH.write}/request`,
  searchAuthor: '/home/search-author',
  curation: '/home/curation',
  event: '/home/event',
  eventDetail: (id: string) => `${PATH.event}/${id}`,

  // === auth === //
  signUp: '/sign-up',
  forgotEmail: 'forgot-email',
  forgotPassword: 'forgot-password',
  resetPassword: 'reset-password',

  // === Store === //
  store: '/store',
  workDetail: (id: string) => `/store/product/${id}`,
  storeList: '/store',
  workOrder: (id: string) => `/store/product/${id}/order/payment`,
  workOrderComplete: (id: string) => `/store/product/${id}/order/complete`,
  workOrderFail: (id: string) => `/store/product/${id}/order/fail`,
  workCreate: `${BASE_PATH.write}/sell`,
  workUpdate: (id: string) => `${BASE_PATH.write}/sell?id=${id}`,

  // === Request === //
  request: '/home/request',
  requestWrite: '/write/request',
  requestDetail: (id: string) => `/home/request/${id}`,

  // === Search === //
  searchHome: '/search',
  searchRequest: '/search/request',
  searchQna: '/search/qna',
  searchAuthorResult: '/search/author',

  // === Lounge === //
  lounge: '/lounge',
  loungeQna: '/lounge/qna',
  loungeQnaWrite: '/write/qna',
  loungeQnaDetail: (id: string) => `/lounge/qna/${id}`,
  loungeCommunity: '/lounge/community',
  loungeChallenge: '/lounge/challenge',

  // === Feed === //
  feedDetail: (id: string) => `/feed/${id}`,

  /* === Studio === */
  studio: (id: string) => `/studio/${id}`,

  /* === Portfolio === */
  portfolioDetail: (id: string) => `/portfolio/${id}`,
  portfolioCreate: `${BASE_PATH.write}/portfolio`,
  portfolioUpdate: (id: string) => `${BASE_PATH.update}/portfolio/${id}`,

  /* === Mypage === */
  myProfile: `${BASE_PATH.myPage}/profile`,
  myFollower: `${BASE_PATH.myPage}/follower`,
  myAuthorApply: `${BASE_PATH.myPage}/authorApply`,
  myMemberShip: `${BASE_PATH.myPage}/membership/membership`,
  myAdvertisement: `${BASE_PATH.myPage}/membership/advertisement`,
  myMileage: `${BASE_PATH.myPage}/mileage`,
  myQuestion: `${BASE_PATH.myPage}/question`,
  myRequestList: `${BASE_PATH.myPage}/request-list`,
  myRequestState: `${BASE_PATH.myPage}/request-state`,
  myRequesterList: `${BASE_PATH.myPage}/requester-list`,
  myScrap: `${BASE_PATH.myPage}/scrap`,
  myStoreList: `${BASE_PATH.myPage}/store-list`,
  myPurchaseManage: `${BASE_PATH.myPage}/purchaseManage`,

  /* === Membership === */
  membershipIntro: `${BASE_PATH.membership}`,
  membershipPayment: `${BASE_PATH.membership}/payment`,
  membershipPaymentComplete: `${BASE_PATH.membership}/complete`,

  orderDetail: (id: string) => `/order-detail/${id}`,

  /* === Admin === */
  admin: `${BASE_PATH.admin}`,
  adminAdmins: `${BASE_PATH.admin}/admins`,
  adminPageManagement: `${BASE_PATH.admin}/page-management`,
  adminCache: `${BASE_PATH.admin}/cache`,
  adminMembers: `${BASE_PATH.admin}/members`,
  adminWithdrawn: `${BASE_PATH.admin}/withdrawn`,
  adminAuthorApproval: `${BASE_PATH.admin}/author-approval`,
  adminReports: `${BASE_PATH.admin}/reports`,
  adminInquiries: `${BASE_PATH.admin}/inquiries`,
  adminPayments: `${BASE_PATH.admin}/payments`,
  adminEvents: `${BASE_PATH.admin}/events`,
  adminEventDetail: (id: string) => `${BASE_PATH.admin}/events/${id}`,
  adminEventCreate: `${BASE_PATH.admin}/event-create`,

  // === Message === //
  message: '/message',
};

export const EXTERNAL_PATH = {
  /* === Notice === */
  termsOfService:
    'https://ossified-editorial-3b1.notion.site/ebaf9cbd1a5745fc88e2da7eec47b946',
  privacyPolicy:
    'https://ossified-editorial-3b1.notion.site/1b10e6bda496408e97a69d9fc2227810',
  marketingConsent:
    'https://ossified-editorial-3b1.notion.site/13bd24254201808e882cfb561cc46c19',
  supportCetner:
    'https://ossified-editorial-3b1.notion.site/113d242542018047a44ef3042a530f1c',
  businessInfo: 'https://www.ftc.go.kr/bizCommPop.do?wrkr_no=3781502754',
};

export type SubNavbarPath = {
  path: string;
  label: string;
  variant?: 'black' | 'pink';
};

export const HIDE_MOBILE_NAVBAR_PAGES = [PATH.requestDetail];

export const HOME_SUB_NAVBAR_PATHS: SubNavbarPath[] = [
  {
    path: PATH.home,
    label: '추천',
  },
  {
    path: PATH.request,
    label: '의뢰해요',
  },
  {
    path: PATH.searchAuthor,
    label: '작가 찾기',
  },
  {
    path: PATH.curation,
    label: '큐레이션',
  },
  {
    path: PATH.event,
    label: '이벤트',
  },
];

export const SEARCH_SUB_NAVBAR_PATHS: SubNavbarPath[] = [
  {
    path: PATH.searchHome,
    label: '판매작품',
  },
  {
    path: PATH.searchRequest,
    label: '의뢰해요',
  },
  {
    path: PATH.searchQna,
    label: 'Q&A',
  },
  {
    path: PATH.searchAuthorResult,
    label: '작가',
  },
];

export const LOUNGE_SUB_NAVBAR_PATHS: SubNavbarPath[] = [
  {
    path: PATH.lounge,
    label: '피드',
    variant: 'pink',
  },
  {
    path: PATH.loungeQna,
    label: 'Q&A',
  },
  {
    path: PATH.loungeCommunity,
    label: '커뮤니티',
  },
  {
    path: PATH.loungeChallenge,
    label: '도전작',
  },
];

export const STORE_SUB_NAVBAR_PATHS: SubNavbarPath[] = [
  {
    path: `${PATH.storeList}`,
    label: '전체',
  },
  {
    path: `${PATH.storeList}?category=ILLUSTRATION`,
    label: '일러스트',
  },
  {
    path: `${PATH.storeList}?category=VIRTUAL`,
    label: '버추얼',
  },
  // {
  //   path: `${PATH.storeList}?category=WEBTOON`,
  //   label: '웹툰',
  // },
  {
    path: `${PATH.storeList}?category=WRITING`,
    label: '글',
  },
  {
    path: `${PATH.storeList}?category=DESIGN`,
    label: '디자인',
  },
  {
    path: `${PATH.storeList}?category=ETC`,
    label: '기타',
  },
];

export const BASIC_MOBILE_PATHS = [
  {
    label: '홈',
    subMenu: [
      { label: '추천', path: PATH.home },
      { label: '의뢰해요', path: PATH.request },
      { label: '작가 찾기', path: PATH.searchAuthor },
      { label: '큐레이션', path: PATH.curation },
      { label: '이벤트', path: PATH.event },
    ],
  },

  {
    label: '라운지',
    subMenu: [
      { label: '피드', path: PATH.home },
      { label: 'Q&A', path: PATH.loungeQna },
      { label: '커뮤니티', path: PATH.loungeCommunity },
      { label: '도전작', path: PATH.loungeChallenge },
    ],
  },

  {
    label: '커미션',
    subMenu: [
      { label: '전체', path: PATH.store },
      { label: '일러스트', path: `${PATH.storeList}?category=ILLUSTRATION` },
      { label: '버추얼', path: `${PATH.storeList}?category=VIRTUAL` },
      { label: '글', path: `${PATH.storeList}?category=WRITING` },
      { label: '디자인', path: `${PATH.storeList}?category=DESIGN` },
      { label: '기타', path: `${PATH.storeList}?category=ETC` },
    ],
  },
];

export const LOGGEDIN_MOBILE_PATHS = [
  ...BASIC_MOBILE_PATHS,
  {
    label: '글쓰기',
    subMenu: [
      { label: '의뢰하기', path: PATH.requestWrite },
      {
        label: '포트폴리오 올리기',
        path: PATH.portfolioCreate,
      },
      {
        label: '판매작품 등록하기',
        path: PATH.workCreate,
      },
      { label: '피드 올리기', path: PATH.workCreate },
    ],
  },

  {
    label: '마이페이지',
    subMenu: [
      { label: '스크랩', path: PATH.myScrap },
      { label: '마일리지', path: PATH.myMileage },
      { label: '나의 질문', path: PATH.myQuestion },
      { label: '팔로워', path: PATH.myFollower },
    ],
  },
];
