import { Metadata } from 'next';

import { getFeedDetail } from '@/service/feed/service';
import { getEventDetail } from '@/service/home/service';
import { getChallenge, getChallengeList } from '@/service/lounge/service';
import { getPortfolio } from '@/service/portfolio/service';
import { getQnaDetail } from '@/service/qna/service';
import { getRequestDetail } from '@/service/request/service';
import { getStoreDetail } from '@/service/store/service';
import { getStudioProfileInfo } from '@/service/studio/service';

import { getTextFromHtml } from './utils';

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

type Params<T> = {
  params: T;
};

type SearchParams<T> = {
  searchParams: T;
};

type GenerateMetadataFn<T> = (params: T) => Promise<Metadata>;

type MetadataMap = {
  root: Metadata;

  // home
  request: Metadata;
  requestDetail: GenerateMetadataFn<Params<{ id: string }>>;
  searchAuthor: Metadata;
  curation: Metadata;
  event: Metadata;
  eventDetail: GenerateMetadataFn<Params<{ id: string }>>;

  // portfolio
  portfolio: GenerateMetadataFn<Params<{ id: string }>>;

  // studio
  studio: GenerateMetadataFn<Params<{ id: string }>>;

  // lounge
  feed: Metadata;
  feedDetail: GenerateMetadataFn<Params<{ id: string }>>;
  qna: Metadata;
  qnaDetail: GenerateMetadataFn<Params<{ id: string }>>;
  community: Metadata;
  challenge: GenerateMetadataFn<
    SearchParams<{
      cohort?: string;
      sort?: string;
      page?: string;
    }>
  >;

  // store
  store: Metadata;
  storeDetail: GenerateMetadataFn<Params<{ id: string }>>;

  // write, upate
  write: Metadata;
  update: Metadata;

  mypage: Metadata;
};

const isProduction =
  process.env.NEXT_PUBLIC_CLIENT_URL === 'https://www.freeidea.kr';

export const metadataMap: MetadataMap = {
  root: {
    robots: {
      index: isProduction,
      follow: isProduction,
    },
    title: {
      template: '%s | 프리디어',
      default: '프리디어 :: 나의 아트, 나의 공간',
    },
    description: '커미션과 창작이 만나는 일러스트 커뮤니티 Freeidea',
    metadataBase: new URL(BASE_URL),
    keywords: [
      '프리디어',
      'freeidea',
      '공모전',
      '일러스트',
      '작가',
      '커미션',
      '디자인',
      '버츄얼',
      '캐릭터 일러스트',
    ],
    openGraph: {
      images: [
        {
          url: '/opengraph/opengraph-image.png',
          alt: '프리디어 로고',
        },
      ],
    },
    twitter: {
      images: [
        {
          url: '/opengraph/opengraph-twitter-image.png',
          alt: '프리디어 로고',
        },
      ],
    },
    other: isProduction
      ? {
          'naver-site-verification': '2d72cf6d0014b3619838b57bb5f02f9f74eb1ebe',
          'google-site-verification':
            'Ff-e3zog-oktIZUv9cieQl9uVi2cv-81NAi1up25xwE',
        }
      : {},
  },

  request: {
    title: '의뢰해요',
    description: '작가들에게 작품을 의뢰해보세요.',
  },

  requestDetail: async ({ params: { id } }) => {
    const request = await getRequestDetail(id);
    return {
      title: request.title,
      description: getTextFromHtml(request.contents).slice(0, 150),
    };
  },

  searchAuthor: {
    title: '작가 찾기',
    // description: '일러스트, 버츄얼, 웹툰, 글, 디자인 작가를 찾아보세요.',
    description: '일러스트, 버츄얼, 글, 디자인 작가를 찾아보세요.',
  },

  curation: {
    title: '큐레이션',
  },

  event: {
    title: '이벤트',
    description:
      '작가들을 위한 다양한 이벤트와 공모전에 참여하고 특별한 혜택을 받아보세요.',
  },

  eventDetail: async ({ params: { id } }) => {
    const event = await getEventDetail(id);
    return {
      title: event.title,
      description: getTextFromHtml(event.contents).slice(0, 150),
      openGraph: {
        images: [event.thumbnailImageUrl],
      },
    };
  },

  portfolio: async ({ params: { id } }) => {
    const portfolio = await getPortfolio(id);
    return {
      title: portfolio.title,
      description: getTextFromHtml(portfolio.contents).slice(0, 150),
      openGraph: {
        images: portfolio.portfolioImages.map(({ fileUrl }) => fileUrl),
      },
    };
  },

  studio: async ({ params: { id } }) => {
    const studio = await getStudioProfileInfo(id);
    return {
      title: `${studio.nickname}의 스튜디오`,
      description: studio.introduction,
      openGraph: {
        images: studio.titleImageUrl,
      },
    };
  },

  feed: {
    title: '피드',
    description: '작가들의 피드를 구경해보세요.',
  },
  feedDetail: async ({ params: { id } }) => {
    const feed = await getFeedDetail(id);
    return {
      title: '피드',
      description: getTextFromHtml(feed.contents).slice(0, 150),
      openGraph: {
        images: feed.feedImages.map(({ feedImageUrl }) => feedImageUrl),
      },
    };
  },

  qna: {
    title: 'Q&A',
    description: '디자인, 작품 등에 대한 질문과 답변을 주고받아보세요.',
  },

  qnaDetail: async ({ params: { id } }) => {
    const qna = await getQnaDetail(id);
    const description = getTextFromHtml(qna.contents).slice(0, 150);
    return {
      title: qna.title,
      description,
    };
  },

  community: {
    title: '커뮤니티',
  },

  challenge: async ({ searchParams: { cohort } }) => {
    const challengeList = await getChallengeList();
    const challenge =
      challengeList.find(
        ({ challengeNumber }) => challengeNumber === Number(cohort)
      ) || challengeList.at(-1);

    if (!challenge) throw new Error('챌린지를 찾을 수 없습니다.');

    const challengeDetail = await getChallenge(challenge.challengeId);

    return {
      title: '도전작',
      description: challengeDetail.title,
      alternates: {
        canonical: `${BASE_URL}/lounge/challenge`,
      },
    };
  },

  store: {
    title: '커미션',
    description: '작가들의 다양한 작품을 자유롭게 거래해보세요.',
  },

  storeDetail: async ({ params: { id } }) => {
    const store = await getStoreDetail(id);
    return {
      title: store.title,
      description: getTextFromHtml(store.contents).slice(0, 150),
      openGraph: {
        images: store.thumbnailImages.map(({ fileUrl }) => fileUrl),
      },
    };
  },

  write: {
    title: '글 작성',
    robots: {
      index: false,
      follow: false,
    },
  },

  update: {
    title: '글 수정',
    robots: {
      index: false,
      follow: false,
    },
  },

  mypage: {
    title: '마이페이지',
    robots: {
      index: false,
      follow: false,
    },
  },
};
