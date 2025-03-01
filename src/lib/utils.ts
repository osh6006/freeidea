import { COMMON_CATEGORIES } from '@/constants/common';
import { JWT } from '@/types/auth';
import { TCategory, TUseRange } from '@/types/common';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * @deprecated tailwind의 truncate 사용 권장
 */
export const truncateText = (text: string, wordNum: number) => {
  return text.length > wordNum ? text.slice(0, wordNum) + '...' : text;
};

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const shimmer = (
  w: number,
  h: number,
  className?: string,
  color?: string
) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="${className}">
  <defs>
    <linearGradient id="g">
      <stop stop-color="${color}" offset="20%" />
      <stop stop-color="#FCFCFC" offset="50%" />
      <stop stop-color="${color}" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${color}" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const formatCurrency = (value: number | string | undefined) => {
  if (value === undefined) return '0';

  const numValue =
    typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;

  if (isNaN(numValue)) return '0';

  return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export function objectToQueryString(obj: object): string {
  return new URLSearchParams(
    Object.entries(obj).reduce(
      (acc, [key, value]) => {
        if (value === undefined || value === null) return acc;
        acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>
    )
  ).toString();
}

export const generateRandomId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const findCategoryValueToLabel = (category: TCategory) => {
  return COMMON_CATEGORIES.find((el) => el.value === category);
};

export const findUseRangeValue = (useRange: TUseRange) => {
  switch (useRange) {
    case 'NON_PROFIT':
      return '비상업용';
    case 'PROFIT':
      return '상업용';
    default:
      return '비상업용';
  }
};

export const decodeToken = <T = JWT>(token: string): T => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    throw new Error('Invalid token');
  }
};

export const getQueryParam = (param: string, url: string) => {
  const urlParams = new URLSearchParams(url);
  return urlParams.get(param);
};

export function formatSocialNumber(value: number): string {
  if (!value) return '0';

  switch (true) {
    case value >= 10000 && value < 1000000:
      return `${(value / 10000).toFixed(1).replace(/\.0$/, '')}만`;
    case value >= 1000000:
      return `${Math.floor(value / 10000)}만`;
    default:
      return value.toString();
  }
}

export function getTextFromHtml(html: string) {
  const textOnly = html.replace(/<\/?[^>]+(>|$)/g, '');
  return textOnly;
}

export function compressUUID(uuid: string): string {
  return uuid.replaceAll('-', '').slice(0, 20);
}

export function getHashedColor(id?: string): string {
  const colors = [
    'bg-slate-600',
    'bg-pink-600',
    'bg-neonGreen-600',
    'bg-indigo-600',
    'bg-mustard-600',
    'bg-neonPurple-600',
    'bg-blue-600',
  ];

  if (!id) return colors[0];

  const hash = Array.from(id).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );
  return colors[hash % colors.length];
}

export function mergeListsWithDeduplication<T extends object>({
  list1,
  list2,
  key,
}: {
  list1: T[];
  list2: T[];
  key: keyof T;
}): T[] {
  const filteredList1 = list1.filter(
    (item) => !list2.some((list2Item) => list2Item[key] === item[key])
  );

  const mergedList = [...filteredList1, ...list2];
  return mergedList;
}

export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
    array.slice(index * size, index * size + size)
  );
};
