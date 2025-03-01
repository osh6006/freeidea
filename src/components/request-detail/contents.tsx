import { PropsWithChildren } from 'react';

const RequestDetailContents = ({ children }: PropsWithChildren) => {
  return (
    <section className="hidden h-fit border-[1px] border-t-transparent border-l-transparent border-r-transparent pc-screen:flex">
      <div className="flex mt-[50px] mb-[60px] justify-between gap-[60px]">
        {children}
      </div>
    </section>
  );
};

export default RequestDetailContents;
