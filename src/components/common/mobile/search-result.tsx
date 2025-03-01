'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import HistoryField from '@/components/navbar/history-field';
import { AutoCompleteResult } from '@/components/navbar/search-auto-complete';
import { SearchSchemaType } from '@/components/navbar/search-bar';
import { Skeleton } from '@/components/ui/skeleton';
import { LOCALSTORAGE_KEY } from '@/constants/localstorage';
import { PATH } from '@/constants/path';
import { SECOND } from '@/constants/time';
import useLocalStorage from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import { useSearchAutoCompleteQuery } from '@/service/search/use-service';
import { RecentlySearchType, recentlySearchSchema } from '@/types/search';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

const MobileSearchResult = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { watch, setValue } = useFormContext<SearchSchemaType>();
  const [debouncedSearchValue] = useDebounce(watch('value'), 0.2 * SECOND);
  const { data, isLoading } = useSearchAutoCompleteQuery(debouncedSearchValue);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const {
    storedValue: recentlySearch,
    setValue: setRecentlySearch,
    removeAll,
  } = useLocalStorage<RecentlySearchType[]>({
    key: LOCALSTORAGE_KEY.recentlySearch,
    schema: z.array(recentlySearchSchema),
  });

  const updateRecentlySearch = (
    recentlySearch: RecentlySearchType[] | undefined,
    newSearchInfo: RecentlySearchType
  ) => {
    if (recentlySearch && recentlySearch.length >= 5) {
      const newValue = [...recentlySearch];
      newValue.unshift(newSearchInfo);
      newValue.pop();
      return newValue;
    } else {
      return [newSearchInfo, ...(recentlySearch || [])];
    }
  };

  const typeToPath = ({ keyword, type }: { type: string; keyword: string }) => {
    if (type === 'product') {
      return `${PATH.searchHome}?keyword=${keyword}`;
    }

    return `${PATH.searchHome}/${type}?keyword=${keyword}`;
  };

  const onSelectItem = (type: string, inputValue: string) => {
    if (recentlySearch?.some((item) => item.keyword === inputValue)) {
      return;
    }

    const updatedSearch = updateRecentlySearch(recentlySearch, {
      type,
      keyword: inputValue,
    });
    setRecentlySearch(updatedSearch);

    router.push(
      typeToPath({
        type,
        keyword: inputValue,
      })
    );
    setValue('value', inputValue);
    onClose();
  };

  return (
    <div className={cn('w-full p-0 rounded-[6px] mt-6')}>
      {debouncedSearchValue ? (
        isLoading ? (
          <div className="space-y-[10px] px-2 py-[10px]">
            <Skeleton className="h-8 rounded-sm" />
            <Skeleton className="h-8 rounded-sm" />
            <Skeleton className="h-8 rounded-sm" />
          </div>
        ) : data && data.length > 0 ? (
          <AutoCompleteResult
            data={data}
            highlightedIndex={highlightedIndex}
            onSelectItem={onSelectItem}
          />
        ) : (
          <div className="h-[100px] flex items-center justify-center w-full typo-body-14-regular-150-tight text-center">
            검색 결과가 없습니다.
          </div>
        )
      ) : (
        <HistoryField
          recentlySearch={recentlySearch || []}
          setRecentlySearch={setRecentlySearch}
          removeAll={removeAll}
          onSearchValueChange={(keyword) => setValue('value', keyword)}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default MobileSearchResult;
