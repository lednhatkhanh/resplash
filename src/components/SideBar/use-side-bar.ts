import React from 'react';
import { useRefInjectedItems, useCycledIndex, usePreventBodyScroll } from 'src/hooks';

export const useSideBar = ({
  isOpen,
  children,
  onClose,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const { items, itemRefs } = useRefInjectedItems(children);
  const {
    index: hoveringIndex,
    increase: increaseHoveringIndex,
    decrease: decreaseHoveringIndex,
    setIndex: setHoveringIndex,
  } = useCycledIndex(items?.length ?? 0);
  usePreventBodyScroll(isOpen);
  const previousFocusedElementRef = React.useRef<HTMLElement | null>(null);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (isOpen) {
        switch (event.key) {
          case 'ArrowDown': {
            increaseHoveringIndex();
            return;
          }
          case 'ArrowUp': {
            decreaseHoveringIndex();
            return;
          }
          case 'Escape': {
            onClose();
            return;
          }
        }
      }
    },
    [decreaseHoveringIndex, onClose, increaseHoveringIndex, isOpen],
  );

  React.useEffect(() => {
    if (!isOpen) {
      setHoveringIndex(-1);

      previousFocusedElementRef.current?.focus();
      previousFocusedElementRef.current = null;
      return;
    }

    previousFocusedElementRef.current = (document.activeElement as HTMLElement) ?? null;
    setHoveringIndex(0);
  }, [isOpen, itemRefs, setHoveringIndex]);

  React.useEffect(() => {
    const hoveringItem = itemRefs.current[hoveringIndex];
    if (hoveringItem && isOpen) {
      hoveringItem.focus();
    }
  }, [hoveringIndex, isOpen, itemRefs]);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { items };
};
