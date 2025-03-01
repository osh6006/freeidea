'use client';

import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  forwardRef,
} from 'react';
import React from 'react';

import Link, { LinkProps } from 'next/link';

import { cn } from '@/lib/utils';
import { useMyInfoQuery } from '@/service/auth/use-service';
import { Level } from '@/types/auth';

import { useGlobalDialogStore } from '../provider/global-dialog/store';
import { Secure, SecureContent, SecureFallback } from './secure';

/**
 * @description
 * - 특정 레벨 이상의 사용자만 접근할 수 있는 button 컴포넌트
 *
 * @param fallbackOnClick
 * - 레벨이 낮은 사용자가 접근하려고 할 때 실행되는 함수
 * - default: 모달을 띄움
 */
export const SecureButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    requiredLevel: Level;
    fallbackOnClick?: MouseEventHandler<HTMLButtonElement>;
  }
>(({ children, onClick, requiredLevel, fallbackOnClick, ...props }, ref) => {
  const { data: myInfo } = useMyInfoQuery();

  const myLevel = myInfo?.userLevel || 'GUEST';

  const { setIsNeedLoginDialogOpen, setIsAuthorLevelDialogOpen } =
    useGlobalDialogStore();

  const getDefaultFallbackFn = () => {
    if (myLevel === 'GUEST') {
      return () => setIsNeedLoginDialogOpen(true);
    }
    if (myLevel === 'USER') {
      return () => setIsAuthorLevelDialogOpen(true);
    }
  };

  return (
    <Secure requiredLevel={requiredLevel}>
      <SecureContent>
        <button
          ref={ref}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      </SecureContent>
      <SecureFallback>
        <button
          ref={ref}
          onClick={fallbackOnClick || getDefaultFallbackFn()}
          {...props}
        >
          {children}
        </button>
      </SecureFallback>
    </Secure>
  );
});

SecureButton.displayName = 'SecureButton';

/**
 * @description
 * - 특정 레벨 이상의 사용자만 접근할 수 있는 Link 컴포넌트
 * - 레벨이 낮은 사용자일때는 Link 대신 button이 렌더링 됨
 *
 * @param fallbackOnClick
 * - 레벨이 낮은 사용자가 접근하려고 할 때 실행되는 함수
 * - default: 모달을 띄움
 */
export function SecureLink({
  children,
  href,
  requiredLevel,
  className,
  fallbackOnClick,
  ...props
}: PropsWithChildren<LinkProps> & {
  requiredLevel: Level;
  className?: string;
  fallbackOnClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const { data: myInfo } = useMyInfoQuery();

  const myLevel = myInfo?.userLevel || 'GUEST';

  const { setIsNeedLoginDialogOpen, setIsAuthorLevelDialogOpen } =
    useGlobalDialogStore();

  const getFallbackFn = () => {
    if (myLevel === 'GUEST') {
      return () => setIsNeedLoginDialogOpen(true);
    }
    if (myLevel === 'USER') {
      return () => setIsAuthorLevelDialogOpen(true);
    }
  };

  return (
    <Secure requiredLevel={requiredLevel}>
      <SecureContent>
        <Link
          href={href}
          className={className}
          {...props}
        >
          {children}
        </Link>
      </SecureContent>
      <SecureFallback>
        <button
          className={cn('contents', className)}
          onClick={fallbackOnClick || getFallbackFn()}
        >
          {children}
        </button>
      </SecureFallback>
    </Secure>
  );
}
