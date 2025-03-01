import { PortfolioCommentRequestParams } from '@/types/portfolio';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { id } from 'date-fns/locale';

import {
  getChallengeList,
  getCommentList,
  getPortfolio,
  getPortfolioEditData,
} from './service';

export const portfolioQueryKey = {
  all: ['portfolio'],

  lists: () => [...portfolioQueryKey.all, 'list'],
  list: (id: string) => [...portfolioQueryKey.lists(), id],

  details: () => [...portfolioQueryKey.all, 'detail'],
  detail: (id: string) => [...portfolioQueryKey.details(), id],

  comments: () => [...portfolioQueryKey.all, 'comment'],
  comment: (
    detailId: string,
    filter?: Omit<PortfolioCommentRequestParams, 'id'>
  ) => [
    ...portfolioQueryKey.details(),
    'comment',
    detailId,
    ...(filter ? [filter] : []),
  ],

  editData: (id: string) => [...portfolioQueryKey.all, 'edit-data', id],
};

export const portfolioDetailQueryOption = (id: string) =>
  queryOptions({
    queryKey: portfolioQueryKey.detail(id),
    queryFn: () => getPortfolio(id),
  });

export const portfolioCommentListQueryOption = ({
  id,
  page = 1,
  limit = 10,
}: PortfolioCommentRequestParams) =>
  infiniteQueryOptions({
    queryKey: portfolioQueryKey.comment(id, { page, limit }),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getCommentList({ id, page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      return lastPage.list.length === limit ? lastPage.page + 1 : undefined;
    },
    select: (data) => {
      const flattenList = data.pages.flatMap(({ list }) => list);
      return { ...data, flattenList };
    },
  });

export const challengeListQueryOption = (enabled = true) =>
  queryOptions({
    enabled,
    queryKey: ['challenge-list'],
    queryFn: getChallengeList,
  });

export const portfolioEditDataQueryOption = (id: string) =>
  queryOptions({
    queryKey: portfolioQueryKey.editData(id),
    queryFn: () => getPortfolioEditData(id),
  });
