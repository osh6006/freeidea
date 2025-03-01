import { SVGProps } from 'react';

export function HeartSelect(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9932 5.15567C9.9938 2.79653 6.65975 2.16192 4.15469 4.32219C1.64964 6.48246 1.29697 10.0943 3.2642 12.6493C4.89982 14.7736 9.84977 19.2538 11.4721 20.7039C11.6536 20.8661 11.7444 20.9473 11.8502 20.9791C11.9426 21.007 12.0437 21.007 12.1361 20.9791C12.2419 20.9473 12.3327 20.8661 12.5142 20.7039C14.1365 19.2538 19.0865 14.7736 20.7221 12.6493C22.6893 10.0943 22.3797 6.45974 19.8316 4.32219C17.2835 2.18465 13.9925 2.79653 11.9932 5.15567Z"
        fill="#FF4040"
        stroke="#FF4040"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Heart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9932 5.30778C10.0138 3.00106 6.71312 2.38056 4.23312 4.49282C1.75312 6.60509 1.40397 10.1367 3.35153 12.6349C4.97079 14.7119 9.87125 19.0926 11.4774 20.5105C11.657 20.6691 11.7469 20.7484 11.8517 20.7796C11.9432 20.8068 12.0432 20.8068 12.1347 20.7796C12.2395 20.7484 12.3293 20.6691 12.509 20.5105C14.1151 19.0926 19.0156 14.7119 20.6349 12.6349C22.5824 10.1367 22.2759 6.58287 19.7533 4.49282C17.2306 2.40278 13.9726 3.00106 11.9932 5.30778Z"
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

export function HeartToner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#717680"
        fillOpacity="0.4"
      />
      <path
        d="M14.9167 9.08333L9.08337 14.9167M9.08337 9.08333L14.9167 14.9167"
        stroke="#24282F"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
