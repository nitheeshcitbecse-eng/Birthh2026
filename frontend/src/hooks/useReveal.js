import { useEffect, useRef, useState } from 'react';

const SUPPORTED = typeof IntersectionObserver !== 'undefined';

/**
 * Reveals an element once it scrolls into view.
 * Without IntersectionObserver support, content starts visible.
 * Usage: const [ref, shown] = useReveal();
 */
export default function useReveal({
  threshold = 0.2,
  rootMargin = '0px 0px -60px 0px',
} = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(!SUPPORTED);

  useEffect(() => {
    const node = ref.current;
    if (!node || !SUPPORTED) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, shown];
}
