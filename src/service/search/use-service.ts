import { IQnaBasicParams } from '@/types/qna';
import { ISearchParameter } from '@/types/search';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  searchAuthorQueryOption,
  searchAutoCompleteQueryOption,
  searchFeedProductQueryOption,
  searchProductQueryOption,
  searchQnaQueryOption,
  searchRequestQueryOption,
} from './query-option';

export function useSearchAutoCompleteQuery(keyword: string) {
  return useQuery(searchAutoCompleteQueryOption(keyword));
}

export function useSearchProductQuery({
  keyword,
  ...params
}: ISearchParameter) {
  return useInfiniteQuery(
    searchProductQueryOption({
      keyword,
      ...params,
    })
  );
}

export function useSearchRequestQuery({
  keyword,
  ...params
}: ISearchParameter) {
  return useInfiniteQuery(
    searchRequestQueryOption({
      keyword,
      ...params,
    })
  );
}

export function useSearchAuthorQuery({ keyword, ...params }: ISearchParameter) {
  return useInfiniteQuery(
    searchAuthorQueryOption({
      keyword,
      ...params,
    })
  );
}

export function useFeedSearchQuery({ keyword, ...params }: ISearchParameter) {
  return useInfiniteQuery(
    searchFeedProductQueryOption({
      keyword,
      ...params,
    })
  );
}

export function useSearchQnaQuery({
  keyword,
  params,
}: {
  keyword: string;
  params: Omit<IQnaBasicParams, 'page'>;
}) {
  return useInfiniteQuery(
    searchQnaQueryOption({
      keyword,
      params,
    })
  );
}
