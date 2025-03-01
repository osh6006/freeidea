'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { PATH } from '@/constants/path';

interface IResponsiveTagsProps {
  tags: string[];
  maxWidth: number;
  fontSize: number;
  padding: number;
}

const ResponsiveTags = ({
  fontSize,
  maxWidth,
  padding,
  tags,
}: IResponsiveTagsProps) => {
  const [visibleTags, setVisibleTags] = useState<string[]>(tags);

  useEffect(() => {
    const updateVisibleTags = () => {
      let totalWidth = 0;
      let visibleCount = 0;

      for (const tag of tags) {
        const tagWidth = Math.floor(tag.length * fontSize * 0.8) + padding * 2;

        if (totalWidth + tagWidth <= maxWidth - padding * 2 - fontSize) {
          totalWidth += tagWidth;
          visibleCount++;
        } else {
          break;
        }
      }

      setVisibleTags(tags.slice(0, visibleCount));
    };

    updateVisibleTags();

    window.addEventListener('resize', updateVisibleTags);

    return () => {
      window.removeEventListener('resize', updateVisibleTags);
    };
  }, [tags, maxWidth, fontSize, padding]);

  return (
    <ul className="flex gap-[6px] overflow-hidden w-full whitespace-nowrap">
      {visibleTags.map((tag: string) => (
        <Link
          href={`${PATH.searchHome}?keyword=${tag}`}
          key={tag}
        >
          <li
            style={{
              fontSize: fontSize,
              padding: padding,
            }}
            className="inline-flex items-center justify-center rounded-[2px] text-slate-500 bg-slate-50"
          >
            #{tag}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ResponsiveTags;
