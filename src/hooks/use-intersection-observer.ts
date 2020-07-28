import React from 'react';

export const useIntersectionObserver = (
  element: HTMLElement | null,
  callback: () => void,
  options?: IntersectionObserverInit,
) => {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    if (callback !== callbackRef.current) {
      callbackRef.current = callback;
    }
  }, [callback]);

  React.useEffect(() => {
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [firstEntry] = entries;

      if (firstEntry.isIntersecting) {
        callbackRef.current();
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element, options]);
};
