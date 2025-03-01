import { useEffect, useState } from 'react';

import { z } from 'zod';

function useLocalStorage<T>({
  key,
  schema,
}: {
  key: string;
  schema: z.ZodSchema<T>;
}) {
  const [storedValue, setStoredValue] = useState<T | undefined>();

  const setValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  const removeAll = () => {
    localStorage.removeItem(key);
    setStoredValue(undefined);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const item = localStorage.getItem(key);
    const result = schema.safeParse(JSON.parse(item || '{}'));

    if (!result.success) {
      localStorage.removeItem(key);
      setStoredValue(undefined);
      return;
    }

    setStoredValue(result.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { storedValue, setValue, removeAll };
}

export default useLocalStorage;
