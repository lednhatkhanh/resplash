import React from 'react';

type Options = {
  threshold?: number;
};
export const useScrollTrigger = ({ threshold = 100 }: Options = {}) => {
  const lastPosition = React.useRef(0);
  const [shouldTrigger, setShouldTrigger] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      if (window.pageYOffset - lastPosition.current >= threshold) {
        setShouldTrigger(true);
        lastPosition.current = window.pageYOffset;
      } else if (lastPosition.current - window.pageYOffset >= threshold) {
        setShouldTrigger(false);
        lastPosition.current = window.pageYOffset;
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return shouldTrigger;
};
