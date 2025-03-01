'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { PATH } from '@/constants/path';
import { cn } from '@/lib/utils';
import { RecentlySearchType } from '@/types/search';
import { X } from '@untitled-ui/icons-react';

interface IHistoryFieldProps {
  recentlySearch: RecentlySearchType[];
  setRecentlySearch: (value: RecentlySearchType[]) => void;
  removeAll: () => void;
  onSearchValueChange: (keyword: string) => void;
  onClose?: () => void;
}

const TitleStyle = 'text-slate-800 font-bold text-base tracking-[-0.32px]';
const BadgeWrapperStyle = 'mt-[20px] flex flex-wrap gap-[10px] ';
const RecentlyBadgeStyle =
  'h-[32px] inline-flex items-center justify-center px-[10px] py-[6px] rounded-full bg-pink-tint-10 text-pink-500 tracking-base font-medium text-[14px] border border-pink-300 cursor-pointer';
const RecommendBadgeStyle =
  'h-[32px] inline-flex items-center justify-center gap-x-1 border border-slate-200 rounded-full px-[20px] font-medium text-[14px] tracking-base cursor-pointer ';

const RECOMMEND_SEARCH = [
  { keyword: '오마카세', type: 'qna' },
  { keyword: '여캐', type: 'product' },
  { keyword: '남캐', type: 'author' },
  { keyword: '썸네일', type: 'request' },
  { keyword: '방송화면', type: 'request' },
];

const Badge = ({
  label,
  href,
  onDelete,
  onSearchValueChange,
  onClose,
}: {
  label: string;
  href: string;
  onDelete?: () => void;
  onSearchValueChange: (keyword: string) => void;
  onClose?: () => void;
}) => {
  const router = useRouter();
  return (
    <li className={cn(onDelete ? RecentlyBadgeStyle : RecommendBadgeStyle)}>
      <button
        onClick={() => {
          router.push(href);
          onSearchValueChange(label);
          if (onClose) {
            onClose();
          }
        }}
        className="line-clamp-1"
      >
        {label}
      </button>
      {onDelete && (
        <button onClick={() => onDelete()}>
          <X className="size-[20px]" />
        </button>
      )}
    </li>
  );
};

const typeToPath = ({ keyword, type }: { type?: string; keyword: string }) => {
  if (!type || type === 'product') {
    return `${PATH.searchHome}?keyword=${keyword}`;
  }

  return `${PATH.searchHome}/${type}?keyword=${keyword}`;
};

const BadgeList = ({
  items,
  onDelete,
  onSearchValueChange,
  onClose,
}: {
  items: RecentlySearchType[];
  onDelete?: (item: string) => void;
  onSearchValueChange: (keyword: string) => void;
  onClose?: () => void;
}) => {
  return (
    <ul className={BadgeWrapperStyle}>
      {items?.map((item) => (
        <Badge
          key={item.keyword}
          label={item.keyword}
          href={typeToPath(item)}
          onDelete={onDelete ? () => onDelete(item.keyword) : undefined}
          onSearchValueChange={onSearchValueChange}
          onClose={onClose}
        />
      ))}
    </ul>
  );
};

const HistoryField = ({
  recentlySearch,
  removeAll,
  setRecentlySearch,
  onSearchValueChange,
  onClose,
}: IHistoryFieldProps) => {
  const handleDelete = (value: string) => {
    setRecentlySearch(recentlySearch.filter((item) => item.keyword !== value));
  };

  return (
    <div className="px-2 py-1">
      {/* 최근 검색어 */}
      <div className="flex justify-between">
        <span className={TitleStyle}>최근 검색어</span>
        {recentlySearch.length > 0 && (
          <button
            className="text-[14px] font-medium tracking-base text-slate-500"
            onClick={removeAll}
          >
            전체 삭제
          </button>
        )}
      </div>
      {recentlySearch.length > 0 && (
        <>
          <BadgeList
            items={recentlySearch}
            onDelete={handleDelete}
            onSearchValueChange={onSearchValueChange}
            onClose={onClose}
          />
        </>
      )}
      <div className="mb-[30px]" />

      {/* 추천 검색어 */}
      <div className="flex justify-between">
        <span className={TitleStyle}>추천 검색어</span>
      </div>
      <BadgeList
        items={RECOMMEND_SEARCH}
        onSearchValueChange={onSearchValueChange}
        onClose={onClose}
      />
    </div>
  );
};

export default HistoryField;
