import { SVGProps } from 'react';

import PngIcon, { PngIconWrapperProps } from './common/png-icon';

export function BookmarkSelect(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M3 7.8C3 6.11984 3 5.27976 3.4204 4.63803C3.7902 4.07354 4.38027 3.6146 5.10604 3.32698C5.93112 3 7.01123 3 9.17143 3H14.8286C16.9888 3 18.0689 3 18.894 3.32698C19.6197 3.6146 20.2098 4.07354 20.5796 4.63803C21 5.27976 21 6.11984 21 7.8V21L12 17L3 21V7.8Z"
        fill="#FF4040"
        stroke="#FF4040"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Bookmark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M3 7.8C3 6.11984 3 5.27976 3.4204 4.63803C3.7902 4.07354 4.38027 3.6146 5.10604 3.32698C5.93112 3 7.01123 3 9.17143 3H14.8286C16.9888 3 18.0689 3 18.894 3.32698C19.6197 3.6146 20.2098 4.07354 20.5796 4.63803C21 5.27976 21 6.11984 21 7.8V21L12 17L3 21V7.8Z"
        fill="white"
        fillOpacity="0.7"
        stroke="#717680"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookmarkToner(props: PngIconWrapperProps) {
  return (
    <PngIcon
      {...props}
      src="/icons/bookmark-toner.png"
    />
  );
}

export function BookmarkTonerSelect(props: PngIconWrapperProps) {
  return (
    <PngIcon
      {...props}
      src="/icons/bookmark-toner-select.png"
    />
  );
}
