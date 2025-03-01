'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { CommonAvatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useStudioProfileQuery } from '@/service/studio/use-service';

const FloatingProfile = () => {
  const { id }: { id: string } = useParams();
  const { data: studioInfo } = useStudioProfileQuery(id);

  const [isAtTop, setIsAtTop] = useState(true); // 스크롤이 최상단인지 여부

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsAtTop(scrollTop === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-[20px] flex items-center gap-x-[10px] rounded-[10px] bg-white/70 p-5 shadow transition-all duration-300 left-1/2 -translate-x-1/2 ',
        isAtTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <CommonAvatar
        nickname={studioInfo?.nickname}
        src={studioInfo?.profileImageUrl}
        className="size-10"
      />
      <div className="flex flex-col ">
        <span className="typo-body-16-bold-100-tight">
          {studioInfo?.nickname}
        </span>
        <span className="typo-body-16-regular-150 text-slate-500">
          {studioInfo?.introduction}
        </span>
      </div>
    </div>
  );
};

export default FloatingProfile;
