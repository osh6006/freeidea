import { HomeSubNavbar } from '@/components/navbar/sub-nav-bar';

export default function SubNavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HomeSubNavbar />
      {children}
    </>
  );
}
