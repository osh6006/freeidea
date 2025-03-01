import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { LOCALSTORAGE_KEY } from '@/constants/localstorage';
import { PATH } from '@/constants/path';
import { SECOND } from '@/constants/time';
import useLocalStorage from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';
import { useSearchAutoCompleteQuery } from '@/service/search/use-service';
import { RecentlySearchType, recentlySearchSchema } from '@/types/search';
import { X } from '@untitled-ui/icons-react';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

import { UntitledIcon } from '../icon';
import { FormControl, FormField, FormItem } from '../ui/form';
import { Skeleton } from '../ui/skeleton';
import HightLightWord from './high-light-word';
import HistoryField from './history-field';
import { SearchSchemaType } from './search-bar';

const SearchAutoComplete = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const { watch, setValue, control, handleSubmit } =
    useFormContext<SearchSchemaType>();

  const [debouncedSearchValue] = useDebounce(watch('value'), 0.2 * SECOND);
  const { data, isLoading } = useSearchAutoCompleteQuery(debouncedSearchValue);

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
    setOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!data) return;
    if (!debouncedSearchValue) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < data.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && data[highlightedIndex]) {
          onSelectItem(
            data[highlightedIndex].type,
            data[highlightedIndex].title
          );
        } else {
          handleSubmit(onSubmit)();
        }
        break;
      case 'Escape':
        setOpen(false);
        break;
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
    setOpen(false);
  };

  const typeToPath = ({ keyword, type }: { type: string; keyword: string }) => {
    if (type === 'product') {
      return `${PATH.searchHome}?keyword=${keyword}`;
    }

    return `${PATH.searchHome}/${type}?keyword=${keyword}`;
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.target instanceof Node && !formRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center"
    >
      <div
        className={cn(
          'relative rounded-full w-full border-[2px] border-slate-300 overflow-hidden',
          'focus-within:border-slate-800'
        )}
      >
        <div className="flex w-full justify-between items-center relative">
          <FormField
            control={control}
            name="value"
            render={({ field }) => (
              <FormItem className="w-full p-0">
                <FormControl>
                  <input
                    {...field}
                    placeholder="원하는 키워드 혹은 작가님을 검색해보세요!"
                    className="w-full h-[40px] px-[18px] focus:outline-none text-[14px]"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setHighlightedIndex(-1);
                    }}
                    autoComplete="off"
                    onClick={() => {
                      if (!open) {
                        setOpen(true);
                      }
                    }}
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

      <div
        className={cn(
          'absolute border top-full bg-white shadow left-0 w-full p-0 rounded-[6px] px-2 py-[10px] animate-in fade-in-0 zoom-in-95',
          open ? 'block' : 'hidden'
        )}
      >
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
          />
        )}
      </div>
    </form>
  );
};

export function AutoCompleteResult({
  data,
  highlightedIndex,
  onSelectItem,
  onClose,
}: {
  data: { type: string; title: string; id: string }[];
  highlightedIndex: number;
  onSelectItem: (type: string, inputValue: string) => void;
  onClose?: () => void;
}) {
  const { watch } = useFormContext<SearchSchemaType>();
  const searchInputValue = watch('value');

  return (
    <ul className="space-y-[10px]">
      {data?.map((el, i) => (
        <li
          key={el.id}
          className={cn(
            'flex gap-x-[10px] items-center rounded-sm px-[12px] py-2 cursor-pointer transition-colors hover:bg-slate-50',
            highlightedIndex === i && 'bg-slate-50'
          )}
          onClick={() => {
            onSelectItem(el.type, el.title);
            if (onClose) {
              onClose();
            }
          }}
        >
          <UntitledIcon.SearchLg
            width={20}
            height={20}
          />
          <span className="line-clamp-1 flex-1">
            <HightLightWord
              text={el.title}
              highlight={searchInputValue}
            />
          </span>
          {el.type === 'author' && (
            <span className=" text-slate-300 typo-body-14-regular-150-tight ">
              작가
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default SearchAutoComplete;
