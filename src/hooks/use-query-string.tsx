import { usePathname, useSearchParams } from 'next/navigation';

function useQueryString() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  const deleteQueryString = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);

    return params.toString();
  };

  return { pathname, searchParams, createQueryString, deleteQueryString };
}

export default useQueryString;
