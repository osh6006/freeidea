type AsyncFunction<T, P extends unknown[]> = (...args: P) => Promise<T>;

export const debounce = <T, P extends unknown[]>(
  func: AsyncFunction<T, P>,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: P): Promise<T> => {
    return new Promise<T>((resolve) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const result = await func(...args);
        resolve(result);
      }, delay);
    });
  };
};
