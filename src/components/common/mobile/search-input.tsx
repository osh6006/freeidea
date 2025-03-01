import React from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { X } from 'lucide-react';

import { UntitledIcon } from '@/components/icon';
import { SearchSchemaType } from '@/components/navbar/search-bar';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { LOCALSTORAGE_KEY } from '@/constants/localstorage';
import { PATH } from '@/constants/path';
import { SECOND } from '@/constants/time';
import useLocalStorage from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import { RecentlySearchType, recentlySearchSchema } from '@/types/search';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

export const MobileSearchInput = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();

  const { watch, setValue, control, handleSubmit } =
    useFormContext<SearchSchemaType>();

  const { storedValue: recentlySearch, setValue: setRecentlySearch } =
    useLocalStorage<RecentlySearchType[]>({
      key: LOCALSTORAGE_KEY.recentlySearch,
      schema: z.array(recentlySearchSchema),
    });

  const [debouncedSearchValue] = useDebounce(watch('value'), 0.2 * SECOND);

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

  const onSubmit: SubmitHandler<SearchSchemaType> = (data) => {
    if (recentlySearch?.some((item) => item.keyword === data.value)) {
      return;
    }

    const updatedSearch = updateRecentlySearch(recentlySearch, {
      keyword: data.value,
    });

    setRecentlySearch(updatedSearch);
    router.push(`${PATH.searchHome}?keyword=${data.value}`);
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1"
    >
      <div
        className={cn(
          'relative rounded-full w-full border-[2px] border-slate-300 overflow-hidden',
          'focus-within:border-slate-800'
        )}
      >
        <div className="flex w-full justify-between items-center relative bg-slate-tint-5">
          <FormField
            control={control}
            name="value"
            render={({ field }) => (
              <FormItem className="w-full p-0">
                <FormControl>
                  <input
                    {...field}
                    placeholder="원하는 키워드 혹은 작가님을 검색해보세요!"
                    className="w-full h-[40px] px-[18px] focus:outline-none text-[14px] bg-transparent "
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {debouncedSearchValue && (
            <button
              type="button"
              className="rounded-full bg-slate-tint-10 mr-1 p-[2.5px]"
              onClick={() => setValue('value', '')}
            >
              <X
                width={14}
                height={14}
                className="text-black"
              />
            </button>
          )}
          <button type="submit">
            <UntitledIcon.SearchLg
              width={20}
              height={20}
              className="text-slate-300 mr-[18px]"
            />
          </button>
        </div>
      </div>
    </form>
  );
};
