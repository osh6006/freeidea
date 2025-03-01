import { PropsWithChildren } from 'react';

const BoardEmpty = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[485px] flex items-center justify-center w-full typo-title-24-bold-140-tight">
      {children}
    </div>
  );
};

export default BoardEmpty;
