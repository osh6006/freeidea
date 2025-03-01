import { MetadataRoute } from 'next';

import { PATH } from '@/constants/path';
import { HOUR } from '@/constants/time';
import { getEventList } from '@/service/home/service';
import { getQnaList } from '@/service/qna/service';
import { getRequestData } from '@/service/request/service';
import { getStoreList } from '@/service/store/service';

const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;
const LIST_LIMIT = 1000;
const LIST_PRIORITY = 0.6;
const DETAIL_PRIORITY = 0.8;

export const revalidate = 1 * HOUR;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemaps = await Promise.all(sitemapGenerators.map((fn) => fn()));

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...sitemaps.flat(),
  ];
}

const sitemapGenerators: Array<() => Promise<MetadataRoute.Sitemap>> = [
  async function generateStoreSitemap() {
    const { list: storeList } = await getStoreList({ page: 1, limit: 1000 });

    const storeListSitemap = {
      url: `${BASE_URL}${PATH.storeList}`,
      changeFrequency: 'daily',
      priority: LIST_PRIORITY,
    } as const;

    const storeDetailSitemap = storeList.map(
      ({ productId }) =>
        ({
          url: `${BASE_URL}${PATH.workDetail(productId)}`,
          changeFrequency: 'weekly',
          priority: DETAIL_PRIORITY,
        }) as const
    );

    return [storeListSitemap, ...storeDetailSitemap];
  },

  async function generateRequestSitemap() {
    const { list: requestList } = await getRequestData({
      page: 1,
      limit: LIST_LIMIT,
      inProgressOnly: true,
    });

    const requestListSitemap = {
      url: `${BASE_URL}${PATH.request}`,
      changeFrequency: 'hourly',
      priority: LIST_PRIORITY,
    } as const;

    const requestDetailSitemap = requestList.map(
      ({ inquiryId }) =>
        ({
          url: `${BASE_URL}${PATH.requestDetail(inquiryId)}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: DETAIL_PRIORITY,
        }) as const
    );

    return [requestListSitemap, ...requestDetailSitemap];
  },

  async function generateQnaSitemap() {
    const { list: qnaList } = await getQnaList({ page: 1, limit: LIST_LIMIT });

    const qnaListSitemap = {
      url: `${BASE_URL}${PATH.loungeQna}`,
      changeFrequency: 'hourly',
      priority: LIST_PRIORITY,
    } as const;

    const qnaDetailSitemap = qnaList.map(
      ({ qnaId }) =>
        ({
          url: `${BASE_URL}${PATH.loungeQnaDetail(qnaId)}`,
          changeFrequency: 'weekly',
          priority: DETAIL_PRIORITY,
        }) as const
    );

    return [qnaListSitemap, ...qnaDetailSitemap];
  },

  async function generateEventSitemap() {
    const { list: eventList } = await getEventList({
      page: 1,
      limit: LIST_LIMIT,
    });

    const eventListSitemap = {
      url: `${BASE_URL}${PATH.event}`,
      changeFrequency: 'monthly',
      priority: 0.4,
    } as const;

    const eventDetailSitemap = eventList.map(
      ({ eventId }) =>
        ({
          url: `${BASE_URL}${PATH.eventDetail(eventId)}`,
          changeFrequency: 'monthly',
          priority: 0.4,
        }) as const
    );

    return [eventListSitemap, ...eventDetailSitemap];
  },
];
