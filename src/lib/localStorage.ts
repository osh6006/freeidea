let storage: Storage;

if (typeof window !== 'undefined') {
  storage = window.localStorage;
}

export const getItem = <T>(key: string, defaultValue: T) => {
  try {
    const storageValue = storage.getItem(key);
    if (storageValue) {
      return JSON.parse(storageValue);
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const setItem = <T>(key: string, value: T) => {
  const storageValue = storage.setItem(key, JSON.stringify(value));

  return storageValue;
};

export const removeItem = (key: string) => {
  storage.removeItem(key);
};
