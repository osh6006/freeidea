import { useEffect, useRef, useState } from 'react';

export const HOME_SCROLL_CHANGE_VALUE = 80;

function useScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollYRatio, setScrollYRatio] = useState(0);

  useEffect(() => {
    const scrollTarget = ref.current || window;

    let timeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const element = ref.current || document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = element;
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);

      if (!isScrolling) {
        setIsScrolling(true);
      }
      setScrollY(scrollTop);
      setScrollYRatio(scrollRatio);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    scrollTarget.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      scrollTarget.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolling, setScrollY, setScrollYRatio, ref]);

  return { isScrolling, scrollY: scrollY, ref, scrollYRatio };
}

export default useScroll;
