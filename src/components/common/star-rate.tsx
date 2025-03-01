import React from 'react';

import { cn } from '@/lib/utils';

interface IStarRateProps {
  rate: number;
  id: string; // 반드시 고유한 값이어야 함
  starClassName?: string;
  wrapperClassName?: string;
}

export default function StarRate({
  id,
  rate,
  wrapperClassName,
  starClassName,
}: IStarRateProps) {
  const fullStars = Math.floor(rate);
  const partialStar = rate % 1;

  const getPartialStarOffset = (partial: number) => {
    if (partial >= 0.1 && partial <= 0.2) return 25.5;
    if (partial >= 0.8 && partial <= 0.9) return 75.5;
    return partial * 100;
  };

  return (
    <ul className={cn('flex', wrapperClassName)}>
      {Array.from({ length: 5 }, (_, i) => (
        <li
          key={i}
          className={cn('mr-1', starClassName)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="none"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient
                id={`starGrad-${id}-${i}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="#FF96B5"
                  stopOpacity="1"
                />
                <stop
                  offset={`${i < fullStars ? 100 : i === fullStars ? getPartialStarOffset(partialStar) : 0}%`}
                  stopColor="#FF96B5"
                  stopOpacity="1"
                />
                <stop
                  offset={`${i < fullStars ? 100 : i === fullStars ? getPartialStarOffset(partialStar) : 0}%`}
                  stopColor="#D1D5DB"
                  stopOpacity="1"
                />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={`url(#starGrad-${id}-${i})`}
              stroke="none"
            />
          </svg>
        </li>
      ))}
    </ul>
  );
}
