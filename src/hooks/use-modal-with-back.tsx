import { useEffect, useState } from 'react';

export function useModalWithBack() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleBack = (event: PopStateEvent) => {
      if (open) {
        event.preventDefault();
        setOpen(false);
        window.history.pushState(null, '', window.location.pathname);
      }
    };

    if (open) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handleBack);
    }

    return () => {
      window.removeEventListener('popstate', handleBack);
    };
  }, [open]);

  return { open, setOpen };
}
