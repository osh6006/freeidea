'use client';

import React from 'react';

import Inner from '@/components/common/inner';
import { COMMON_SORTS } from '@/constants/common';

import SearchTagFilter from '../common/search-tagFilter';
import SortOrder from '../common/sort-order';
import TotalNumber from '../common/total-number';
import { SearchSubNavbar } from '../navbar/sub-nav-bar';
import CategoryDropDown from './category-dropdown';

const SearchResultHeader = ({ totalCount }: { totalCount: number }) => {
  return (
    <>
      <SearchSubNavbar />
      <Inner
        maxWidth={1200}
        className="mt-[50px]"
      >
        <TotalNumber
          number={totalCount || 0}
          className="my-[20px]"
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-[10px]">
            <SearchTagFilter
              queryKey="useRange"
              queryValue="NON_PROFIT"
            >
              비상업용
            </SearchTagFilter>
            <SearchTagFilter
              queryKey="useRange"
              queryValue="PROFIT"
            >
              상업용
            </SearchTagFilter>

            <CategoryDropDown />
          </div>
          <SortOrder sortList={COMMON_SORTS} />
        </div>
      </Inner>
    </>
  );
};

export default SearchResultHeader;
