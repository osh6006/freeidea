'use client';

import { useRouter } from 'next/navigation';

import Inner from '@/components/common/inner';
import { CATEGORY_FILTER_ICONS } from '@/constants/request/category';
import useQueryString from '@/hooks/use-query-string';
import { cn } from '@/lib/utils';

import { useSearchParamsCache } from '../provider/searchparams-cache-provider';

interface ICategoryFilterProps {
  categories: {
    [key: string]: string;
  }[];
}

const CategoryFilter: React.FunctionComponent<ICategoryFilterProps> = ({
  categories,
}) => {
  const { pathname, createQueryString, deleteQueryString } = useQueryString();
  const searchParams = useSearchParamsCache<{ category: string | undefined }>();
  const categoryName = searchParams.category;

  const { replace } = useRouter();

  return (
    <section className="border-b border-slate-200 py-4 scrollbar-hide overflow-x-auto">
      <Inner maxWidth={1200}>
        <ul className="flex w-full items-center px-5 gap-x-4  pc-screen:p-0 pc-screen:justify-center pc-screen:gap-x-7">
          {categories.map((category) => {
            const isActive = category.value === categoryName;
            const pathToMove = isActive
              ? pathname + '?' + deleteQueryString('category')
              : pathname + '?' + createQueryString('category', category.value);
            const categoryFilterIconPath =
              CATEGORY_FILTER_ICONS.find((el) => el.value === category.value)
                ?.path ?? null;
            const categoryFilterIconBackgroundImage = categoryFilterIconPath
              ? { backgroundImage: `url("${categoryFilterIconPath}")` }
              : {};

            return (
              <li
                className="flex flex-col items-center justify-center text-center text-[14px] font-medium tracking-base gap-y-[10px]"
                key={category.value}
                onClick={() => replace(pathToMove)}
              >
                <div
                  className={cn(
                    `rounded-full aspect-square size-16 flex items-center overflow-hidden pc-screen:size-[90px] bg-cover`,
                    isActive
                      ? 'border-2 border-primary bg-primary'
                      : 'border-2 border-white',
                    categoryFilterIconPath ? '' : 'bg-slate-300'
                  )}
                  style={{
                    ...categoryFilterIconBackgroundImage,
                    cursor: 'pointer',
                  }}
                />
                <div
                  className={cn(
                    'typo-caption-12-regular-100 pc-screen:typo-body-16-regular-150',
                    isActive ? 'text-primary' : ''
                  )}
                >
                  {category.label}
                </div>
              </li>
            );
          })}
        </ul>
      </Inner>
    </section>
  );
};

export default CategoryFilter;
