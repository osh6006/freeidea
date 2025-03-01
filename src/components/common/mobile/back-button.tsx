'use client';

import { useRouter } from 'next/navigation';

import { UntitledIcon } from '@/components/icon';
import { cn } from '@/lib/utils';

const MobileBackbutton = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn('w-fit pc-screen:hidden', className)}
    >
      <UntitledIcon.ChevronLeft />
    </button>
  );
};

export default MobileBackbutton;
