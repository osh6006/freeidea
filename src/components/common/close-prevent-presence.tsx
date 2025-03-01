'use client';

import { useEffect } from 'react';

export default function ClosePreventPresence() {
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventClose);
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  return <></>;
}
