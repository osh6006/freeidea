import React from 'react';

import { StoreSubNavbar } from '@/components/navbar/sub-nav-bar';

export const dynamic = 'force-dynamic';

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StoreSubNavbar />
      {children}
    </>
  );
}
