import * as React from 'react';

import { cn } from '@/lib/utils';

interface IInnerProps {
  as?: 'div' | 'main';
  maxWidth?: number;
  className?: string;
  children: React.ReactNode;
}

const Inner: React.FunctionComponent<IInnerProps> = ({
  as = 'div',
  children,
  maxWidth = 1200,
  className,
}) => {
  return React.createElement(
    as,
    {
      style: {
        maxWidth,
      },
      className: cn(`mx-auto w-full`, className),
    },
    children
  );
};

export default Inner;
