'use client';

import { PropsWithChildren, createContext, useContext } from 'react';

type TSearchParams = { [key: string]: string | string[] | undefined };

interface Props {
  searchParams: TSearchParams | undefined;
}

const SearchParamsCacheContext = createContext<Props>({
  searchParams: undefined,
});

const SearchParamsCacheProvider = ({
  children,
  searchParams,
}: PropsWithChildren<Props>) => {
  return (
    <SearchParamsCacheContext.Provider value={{ searchParams }}>
      {children}
    </SearchParamsCacheContext.Provider>
  );
};

export function useSearchParamsCache<T extends TSearchParams>() {
  const context = useContext(SearchParamsCacheContext);
  return context.searchParams as T;
}

export default SearchParamsCacheProvider;
