import React from 'react';
import { usePreventBodyScroll, useScrollBarWidth } from 'src/hooks';

export type UseDialogProps = {
  isOpen: boolean;
  onDismiss: () => void;
  enableAutoFocus?: boolean;
  hasBackDrop?: boolean;
  preventScrollOnOpen?: boolean;
};

export const useDialog = (
  { isOpen, onDismiss, enableAutoFocus = true, hasBackDrop = true, preventScrollOnOpen = true }: UseDialogProps,
  { content }: { content: HTMLElement | null },
) => {
  usePreventBodyScroll(!!preventScrollOnOpen && isOpen);
  const scrollBarWidth = useScrollBarWidth();
  const style = React.useMemo<React.CSSProperties>(() => ({ paddingRight: `${scrollBarWidth}px` }), [scrollBarWidth]);
  const previousActiveElementRef = React.useRef<HTMLElement | null>(null);

  const handleBackDropClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!content?.contains(event.target as HTMLElement)) {
      onDismiss();
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;

      if (enableAutoFocus) {
        content?.focus();
      }
    } else {
      previousActiveElementRef.current?.focus();
      previousActiveElementRef.current = null;
    }
  }, [content, enableAutoFocus, isOpen]);

  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onDismiss();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, onDismiss]);

  React.useEffect(() => {
    if (hasBackDrop || !isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!content?.contains(event.target as HTMLElement)) {
        onDismiss();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [content, hasBackDrop, isOpen, onDismiss]);

  return { style, handleBackDropClick };
};
