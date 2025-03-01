import { LoungeSubNavbar } from '@/components/navbar/sub-nav-bar';

export default async function LoungeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LoungeSubNavbar />
      {children}
    </>
  );
}
