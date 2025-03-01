'use client';

import { PropsWithChildren, ReactNode } from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  children: ReactNode;
}

export function ErrorBox({ className, children }: Props) {
  return (
    <div
      className={cn(
        'flex gap-[30px] items-center flex-1 justify-center h-full',
        className
      )}
    >
      {children}
    </div>
  );
}

export function ErrorImage({ src }: { src: `/errors/${string}` }) {
  return (
    <div className="relative size-[200px] pc-screen:size-[400px]">
      <Image
        fill
        className="rounded-full bg-slate-50"
        src={src}
        alt="error-image"
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

export function ErrorContent({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-[20px]', className)}>{children}</div>
  );
}

export function ErrorTitle({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h1 className={cn('typo-title-40-bold-150', className)}>{children}</h1>
  );
}

export function ErrorDescription({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn('typo-title-18-medium-100 text-slate-500', className)}>
      {children}
    </span>
  );
}

export function ErrorButtonGroup({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn('flex gap-1', className)}>{children}</div>;
}
