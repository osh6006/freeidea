import ClosePreventPresence from '@/components/common/close-prevent-presence';
import { metadataMap } from '@/lib/metadata';

export const metadata = metadataMap.write;

function WriteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ClosePreventPresence />
    </>
  );
}

export default WriteLayout;
