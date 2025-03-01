'use client';

import * as React from 'react';

import { SECOND } from '@/constants/time';
import { cn, getHashedColor } from '@/lib/utils';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { UntitledIcon } from '../icon';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex size-[24px] shrink-0 overflow-hidden rounded-full bg-white',
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    style={{
      objectFit: 'cover',
    }}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    bgColor?: string;
  }
>(({ bgColor, className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full text-white',
        bgColor ? bgColor : 'bg-slate-600',
        className
      )}
      {...props}
    />
  );
});

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const CommonAvatar = ({
  nickname,
  src,
  className,
  style,
}: {
  nickname: string | undefined;
  src?: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Avatar
      className={className}
      style={style}
    >
      <AvatarImage
        src={src}
        alt={`${nickname} avatar`}
        sizes="500px"
      />
      <AvatarFallback
        delayMs={0.5 * SECOND}
        bgColor={getHashedColor(nickname)}
      >
        <UntitledIcon.User03 className="size-full" />
      </AvatarFallback>
    </Avatar>
  );
};

export { Avatar, AvatarImage, AvatarFallback, CommonAvatar };
