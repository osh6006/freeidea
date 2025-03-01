import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export type THeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: THeadingElements;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { as: Type = 'h1', className, ...rest } = props;

  return (
    <Type
      ref={ref}
      {...rest}
      className={cn('', className)}
    />
  );
});

Heading.displayName = 'Heading';

export default Heading;
