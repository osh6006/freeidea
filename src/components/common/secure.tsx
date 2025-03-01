'use client';

import React, { createContext, useContext } from 'react';

import { useMyInfoQuery } from '@/service/auth/use-service';
import { LEVEL_NUMBER, Level } from '@/types/auth';

interface SecureProps {
  children: React.ReactNode;
  requiredLevel: Level;
}

const SecureContext = createContext<{
  canAccess: boolean;
}>({
  canAccess: false,
});

export function Secure({ children, requiredLevel }: SecureProps) {
  const { data: myInfo } = useMyInfoQuery();
  const myLevel = myInfo?.userLevel || 'GUEST';
  const canAccess = LEVEL_NUMBER[myLevel] >= LEVEL_NUMBER[requiredLevel];

  return (
    <SecureContext.Provider value={{ canAccess }}>
      {children}
    </SecureContext.Provider>
  );
}

export function SecureContent({ children }: { children?: React.ReactNode }) {
  const { canAccess } = useContext(SecureContext);

  if (!canAccess) return null;
  return <>{children}</>;
}

export function SecureFallback({ children }: { children?: React.ReactNode }) {
  const { canAccess } = useContext(SecureContext);

  if (canAccess) return null;
  return <>{children}</>;
}
