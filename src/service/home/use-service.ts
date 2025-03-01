import { IBasicEventParams } from '@/types/home';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  authorProfileOptions,
  homeAuthorCurationOptions,
  homeEventDetailOption,
  homeEventListOption,
  newAuthorOptions,
  recomendWorkOptions,
  recommendCategoryPickOptions,
} from './query-option';

export const useAuthorProfileQuery = (id: string) =>
  useQuery(authorProfileOptions(id));

export const useNewAuthorQuery = () => useQuery(newAuthorOptions());
export const useRecommendWorkQuery = () => useQuery(recomendWorkOptions());
export const useRecommendPickQuery = () =>
  useQuery(recommendCategoryPickOptions());
export const useHomeAuthorCuration = () =>
  useQuery(homeAuthorCurationOptions());

export const useEventListQuery = (params: Omit<IBasicEventParams, 'page'>) =>
  useInfiniteQuery(homeEventListOption(params));
export const useEventDetailQuery = (eventId: string) =>
  useQuery(homeEventDetailOption(eventId));
