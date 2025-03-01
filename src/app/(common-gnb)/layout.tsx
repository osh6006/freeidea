import React from 'react';

import MobileBottomBar from '@/components/common/mobile/bottom-bar';
import MobileGlobalHeader from '@/components/common/mobile/header';
import Footer from '@/components/home/footer';
import Navbar from '@/components/navbar/navbar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex-col min-h-screen overflow-clip pt-11 pb-[60px] pc-screen:pb-0 pc-screen:pt-0">
      {/* Mobile */}
      <MobileGlobalHeader />

      {/* Desktop */}
      <Navbar />
      {children}
      <Footer />

      {/* Mobile */}
      <MobileBottomBar />
    </div>
  );
}
