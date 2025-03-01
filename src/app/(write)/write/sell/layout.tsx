import { PropsWithChildren } from 'react';

import Footer from '@/components/home/footer';
import WorkNewNavbar from '@/components/store-new/work-new-navbar';

export const dynamic = 'force-dynamic';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <WorkNewNavbar />
      <main className="w-[1000px] mx-auto">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
