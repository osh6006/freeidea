import { QueryFilters, QueryKey, useQueryClient } from '@tanstack/react-query';

type InfinitePageData<T> = {
  pages: { list: T[] }[];
};

type PageData<T> = {
  list: T[];
};

type UpdateConfig<T> = {
  target: (item: T) => boolean;
  updater: (item: T) => T;
};

export const useOptimisticUpdate = () => {
  const queryClient = useQueryClient();

  const setInfinitePageQueriesData = <T>(
    queryFilter: QueryFilters,
    { target, updater }: UpdateConfig<T>
  ) => {
    const prevData = queryClient.getQueriesData(queryFilter);
    queryClient.setQueriesData(
      queryFilter,
      (oldData: InfinitePageData<T> | undefined) => {
        if (!oldData) return oldData;
        if (!('pages' in oldData)) return oldData;
        return {
          ...oldData,
          pages: oldData.pages?.map((page) => ({
            ...page,
            list: page.list.map((item) =>
              target(item) ? updater(item) : item
            ),
          })),
        };
      }
    );
    return prevData;
  };

  const setPageQueriesData = <T>(
    queryFilter: QueryFilters,
    { target, updater }: UpdateConfig<T>
  ) => {
    const prevData = queryClient.getQueriesData(queryFilter);
    queryClient.setQueriesData(
      queryFilter,
      (oldData: PageData<T> | undefined) => {
        if (!oldData) return oldData;
        if (!('list' in oldData)) return oldData;
        return {
          ...oldData,
          list: oldData.list.map((item) =>
            target(item) ? updater(item) : item
          ),
        };
      }
    );
    return prevData;
  };

  const setQueriesData = <T>(
    queryFilter: QueryFilters,
    updater: UpdateConfig<T>['updater']
  ) => {
    const prevData = queryClient.getQueriesData(queryFilter);
    queryClient.setQueriesData(queryFilter, (oldData: T | undefined) => {
      if (!oldData) return oldData;
      return updater(oldData);
    });
    return prevData;
  };

  const rollbackQueriesDataList = (
    prevDataList: [QueryKey, unknown | undefined][][]
  ) => {
    prevDataList.forEach((prevData) => {
      prevData.forEach(([queryKey, previousData]) => {
        queryClient.setQueriesData({ queryKey }, previousData);
      });
    });
  };

  const rollbackQueriesData = (prevData: [QueryKey, unknown | undefined][]) => {
    prevData.forEach(([queryKey, previousData]) => {
      queryClient.setQueriesData({ queryKey }, previousData);
    });
  };

  return {
    setInfinitePageQueriesData,
    setPageQueriesData,
    setQueriesData,
    rollbackQueriesData,
    rollbackQueriesDataList,
  };
};
