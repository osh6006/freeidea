import ScrollUpButton from '@/components/common/scroll-up-button';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <ScrollUpButton />
    </>
  );
}
