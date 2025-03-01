'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { ChevronUp } from '@untitled-ui/icons-react';

import { Button } from '../ui/button';

export default function ScrollUpButton({
  upTo = 0,
  className,
}: {
  upTo?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onClick = () => {
    window.scrollTo({ top: upTo, behavior: 'smooth' });
  };

  if (!isVisible) return null;
  return (
    <Button
      className={cn(
        'fixed flex items-center justify-center p-0 size-12 bottom-[140px] right-[20px] pc-screen:size-[54px] pc-screen:bottom-[80px] pc-screen:right-[100px] z-20',
        className
      )}
      variant="outline"
      onClick={onClick}
      rounded
    >
      <ChevronUp className="size-[24px]" />
    </Button>
  );
}
