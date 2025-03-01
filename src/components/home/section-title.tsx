import * as React from 'react';

import Heading from '@/components/common/heading';

interface ISectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FunctionComponent<ISectionTitleProps> = ({
  children,
}) => {
  return (
    <Heading
      as="h3"
      className="text-[18px] pc-screen:text-[24px] font-bold leading-[140%] tracking-[-0.48px] "
    >
      {children}
    </Heading>
  );
};

export default SectionTitle;
