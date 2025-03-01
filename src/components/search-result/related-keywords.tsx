'use client';

import { useRouter } from 'next/navigation';

import useQueryString from '@/hooks/use-query-string';

const RelatedKeywords = ({ keywords }: { keywords: string[] }) => {
  const router = useRouter();
  const { pathname, createQueryString } = useQueryString();

  return (
    <div className="h-[40px] flex gap-[12px] px-[20px] py-[8px] bg-slate-50 rounded-[4px]">
      <div className="text-[16px] text-slate-500 font-[400]">연관</div>
      <ul className="flex items-center justify-center gap-[6px]">
        {keywords?.map((item, idx) => (
          <li
            key={idx}
            className="h-[40px] px-[14px] py-[9.5px] text-[14px] font-[400] cursor-pointer hover:font-[600]"
            onClick={() =>
              router.push(pathname + '?' + createQueryString('keyword', item))
            }
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RelatedKeywords;
