import { InfiniteData } from '@tanstack/react-query';

type InfinitePageListItem<
  T extends InfiniteData<{ list: U[] }>,
  U,
> = T['pages'][number]['list'][number];

interface UpdateInfiniteQueryCacheParams<
  T extends InfiniteData<{ list: U[] }>,
  U,
> {
  oldData: T;
  target: {
    key: keyof InfinitePageListItem<T, U>;
    value: InfinitePageListItem<T, U>[keyof InfinitePageListItem<T, U>];
  };
  updateItem: (
    oldItem: InfinitePageListItem<T, U>
  ) => InfinitePageListItem<T, U>;
}

/**
 * @property oldData - 기존 데이터
 * @property target - 업데이트할 대상의 key와 value
 * @property updateItem - target을 기반으로 찾은 item이 입력으로 전달됨
 * @deprecated 어려운 인터페이스.. useOptimisticUpdate를 사용해주세요.
 */
export function updateInfiniteQueryCache<
  T extends InfiniteData<{ list: U[] }>,
  U,
>({ oldData, target, updateItem }: UpdateInfiniteQueryCacheParams<T, U>): T {
  const newData = { ...oldData };
  newData.pages = newData.pages?.map((page) => {
    const newList = page.list.map((item) => {
      if (item[target.key] !== target.value) return item;
      const newItem = updateItem(item);
      return newItem;
    });

    return { ...page, list: newList };
  });

  return newData;
}

/**
 * @param page - 현재 페이지
 * @param count - 총 개수
 * @param limit - 페이지당 개수
 * @returns 다음 페이지 파라미터
 * @description queryFn의 limit가 일치하는지 반드시 확인해주세요.
 */
export function getNextPageParam(
  {
    page,
    count,
  }: {
    page: number;
    count: number;
  },
  limit = 10
) {
  return page * limit > count ? undefined : page + 1;
}
