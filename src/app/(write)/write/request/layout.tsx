import { PropsWithChildren } from 'react';

import Footer from '@/components/home/footer';
import RequestWriteHeader from '@/components/request/request-write-header';

export const dynamic = 'force-dynamic';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <RequestWriteHeader />
      <main className="px-5 py-3 mx-auto pc-screen:w-[1000px] pc-screen:px-0 pc-screen:py-0">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
