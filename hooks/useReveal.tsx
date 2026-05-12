import { useEffect, useRef, useState } from 'react';

export default function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once it's visible so it only animates once
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it comes into full view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}