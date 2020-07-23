import React from 'react';
import { useScrollBarWidth } from './use-scrollbar-width';

export const usePreventBodyScroll = (shouldTrigger: boolean) => {
  const scrollBarWidth = useScrollBarWidth();

  React.useEffect(() => {
    if (!shouldTrigger) {
      return;
    }

    const hasScrollBar = document.body.clientHeight > window.innerHeight;
    if (!hasScrollBar) {
      return;
    }

    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [scrollBarWidth, shouldTrigger]);
};
