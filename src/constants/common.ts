// Category
import { snsLinkDict, sortDict } from './dictionary';

export const COMMON_CATEGORIES = [
  {
    label: '일러스트',
    value: 'ILLUSTRATION',
  },
  {
    label: '버츄얼',
    value: 'VIRTUAL',
  },
  // {
  //   label: '웹툰',
  //   value: 'WEBTOON',
  // },
  {
    label: '글',
    value: 'WRITING',
  },
  {
    label: '디자인',
    value: 'DESIGN',
  },
  {
    label: '기타',
    value: 'ETC',
  },
];

export const STORE_CATEGORIES = [
  {
    label: '추천',
    value: '',
  },
  ...COMMON_CATEGORIES,
];

// Sort
export const COMMON_SORTS = [
  {
    label: sortDict.data.latest.ko,
    value: sortDict.data.latest.en,
  },
  {
    label: sortDict.data.lowestPrice.ko,
    value: sortDict.data.lowestPrice.en,
  },
  {
    label: sortDict.data.highestPrice.ko,
    value: sortDict.data.highestPrice.en,
  },
];

export const SEARCH_AUTHOR_SORTS = [
  {
    label: sortDict.get('ko').followers,
    value: sortDict.get('en').followers,
  },
  {
    label: sortDict.get('ko').latest,
    value: sortDict.get('en').latest,
  },
];

export const REVIEW_SORTS = [
  {
    label: sortDict.get('ko').latest,
    value: sortDict.get('en').latest,
  },
  {
    label: sortDict.get('ko').reviewStars,
    value: sortDict.get('en').reviewStars,
  },
];

export const CHALLENGE_SORTS = [
  {
    label: sortDict.data.latest.ko,
    value: sortDict.data.latest.en,
  },
  {
    label: sortDict.data.likes.ko,
    value: sortDict.data.likes.en,
  },
  {
    label: sortDict.data.scraps.ko,
    value: sortDict.data.scraps.en,
  },
];

export const BLUR_IMG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';

// SNS
export const COMMON_SNS_LINK_VALUES = [
  {
    label: snsLinkDict.data.none.ko,
    value: snsLinkDict.data.none.en,
  },
  {
    label: snsLinkDict.data.youtube.ko,
    value: snsLinkDict.data.youtube.en,
  },

  {
    label: snsLinkDict.data.twitter.ko,
    value: snsLinkDict.data.twitter.en,
  },
  {
    label: snsLinkDict.data.tiktok.ko,
    value: snsLinkDict.data.tiktok.en,
  },
  {
    label: snsLinkDict.data.instagram.ko,
    value: snsLinkDict.data.instagram.en,
  },
  {
    label: snsLinkDict.data.facebook.ko,
    value: snsLinkDict.data.facebook.en,
  },
  {
    label: snsLinkDict.data.blog.ko,
    value: snsLinkDict.data.blog.en,
  },
  {
    label: snsLinkDict.data.etc.ko,
    value: snsLinkDict.data.etc.en,
  },
];

// api 연동하면 삭제
export const TEMP_DESC_MARKUP = `
    <h1>사이클 라이딩 데이터 분석 서비스 개발 및 운영</h1>
    
    <h2>상세내용</h2>
    <h3>신규 기능 추가</h3>
    <ul>
        <li>
            <strong>블루투스 기기 연결 화면</strong>
            <p>블루투스 기기와의 연결을 위한 UI 화면 제공</p>
        </li>
        <li>
            <strong>워크아웃 진행 화 수치 차트 표시 화면</strong>
            <p>워크아웃 진행 중 데이터를 시각화한 차트를 제공</p>
            <p>실시간 수치 변화에 따른 차트 업데이트</p>
        </li>
    </ul>

    <hr>

    <h2>상세내용</h2>
    <h3>신규 기능 추가</h3>
    <ul>
        <li>
            <strong>블루투스 기기 연결 화면</strong>
            <p>블루투스 기기와의 연결을 위한 UI 화면 제공</p>
        </li>
        <li>
            <strong>워크아웃 진행 화 수치 차트 표시 화면</strong>
            <p>워크아웃 진행 중 데이터를 시각화한 차트를 제공</p>
            <p>실시간 수치 변화에 따른 차트 업데이트</p>
        </li>
    </ul>

    <hr>

    <h2>상세내용</h2>
    <h3>신규 기능 추가</h3>
    <ul>
        <li>
            <strong>블루투스 기기 연결 화면</strong>
            <p>블루투스 기기와의 연결을 위한 UI 화면 제공</p>
        </li>
        <li>
            <strong>워크아웃 진행 화 수치 차트 표시 화면</strong>
            <p>워크아웃 진행 중 데이터를 시각화한 차트를 제공</p>
            <p>실시간 수치 변화에 따른 차트 업데이트</p>
        </li>
    </ul>

    <hr>

    <h2>상세내용</h2>
    <h3>신규 기능 추가</h3>
    <ul>
        <li>
            <strong>블루투스 기기 연결 화면</strong>
            <p>블루투스 기기와의 연결을 위한 UI 화면 제공</p>
        </li>
        <li>
            <strong>워크아웃 진행 화 수치 차트 표시 화면</strong>
            <p>워크아웃 진행 중 데이터를 시각화한 차트를 제공</p>
            <p>실시간 수치 변화에 따른 차트 업데이트</p>
        </li>
    </ul>
`;
