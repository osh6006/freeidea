import { metadataMap } from '@/lib/metadata';

export const metadata = metadataMap.update;

export default function UpdateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
