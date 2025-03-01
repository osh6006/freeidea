import { IBasicEventParams } from '@/types/home';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';

import {
  getAuthorCurations,
  getAuthorProfile,
  getEventDetail,
  getEventList,
  getNewAuthors,
  getRecommendPicks,
  getRecommendWorks,
} from './service';

export const homeQueryKey = {
  all: ['home'],
  author: () => [...homeQueryKey.all, 'author'],
  authorHover: (id: string) => [...homeQueryKey.author(), 'hover', id],
  newAuthor: () => [...homeQueryKey.author(), 'new'],
  recommendWork: () => [...homeQueryKey.all, 'recommendWork'],
  recommendPick: () => [...homeQueryKey.all, 'recommendPick'],
  curation: () => [...homeQueryKey.all, 'curation'],

  event: () => [...homeQueryKey.all, 'event'],
  eventList: (params: IBasicEventParams) =>
    [...homeQueryKey.event(), 'list', params].map((v) => v !== undefined),
  eventDetail: (id: string) => [...homeQueryKey.event(), 'detail', id],
};

export const authorProfileOptions = (id: string) =>
  queryOptions({
    queryKey: homeQueryKey.authorHover(id),
    queryFn: () => getAuthorProfile(id),
  });

export const newAuthorOptions = () =>
  queryOptions({
    queryKey: homeQueryKey.newAuthor(),
    queryFn: () => getNewAuthors(),
  });

export const recomendWorkOptions = () =>
  queryOptions({
    queryKey: homeQueryKey.recommendWork(),
    queryFn: () => getRecommendWorks(),
  });

export const recommendCategoryPickOptions = () =>
  queryOptions({
    queryKey: homeQueryKey.recommendPick(),
    queryFn: () => getRecommendPicks(),
  });

export const homeAuthorCurationOptions = () =>
  queryOptions({
    queryKey: homeQueryKey.curation(),
    queryFn: () => getAuthorCurations(),
  });

export const homeEventListOption = (params: Omit<IBasicEventParams, 'page'>) =>
  infiniteQueryOptions({
    queryKey: homeQueryKey.eventList(params),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getEventList({ page: pageParam, limit: params.limit }),
    getNextPageParam: (lastPage) =>
      lastPage.list.length === params.limit ? lastPage.page + 1 : undefined,
    placeholderData: keepPreviousData,
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return {
        ...data,
        flattenList,
        count: data.pages[0].count,
      };
    },
  });

export const homeEventDetailOption = (eventId: string) =>
  queryOptions({
    queryKey: homeQueryKey.eventDetail(eventId),
    queryFn: () => getEventDetail(eventId),
    enabled: !!eventId,
  });
