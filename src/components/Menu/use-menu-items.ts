import React from 'react';
import { useRefInjectedItems, useCycledIndex } from 'src/hooks';

export type UseMenuItemsProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onDismiss: () => void;
};

export const useMenuItem = ({ children, isOpen, onDismiss }: UseMenuItemsProps) => {
  const handleItemClick = React.useCallback(() => {
    if (isOpen) {
      onDismiss();
    }
  }, [isOpen, onDismiss]);
  const injectingProps = React.useMemo(
    () => ({
      onClick: handleItemClick,
    }),
    [handleItemClick],
  );
  const { items, itemRefs } = useRefInjectedItems(children, injectingProps);
  const {
    index: hoveringIndex,
    increase: increaseHoveringIndex,
    decrease: decreaseHoveringIndex,
    setIndex: setHoveringIndex,
  } = useCycledIndex(items?.length ?? 0);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (isOpen) {
        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault();
            increaseHoveringIndex();
            return;
          }
          case 'ArrowUp': {
            event.preventDefault();
            decreaseHoveringIndex();
            return;
          }
        }
      }
    },
    [decreaseHoveringIndex, increaseHoveringIndex, isOpen],
  );

  React.useEffect(() => {
    if (!isOpen) {
      setHoveringIndex(-1);
      return;
    }

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
  }, [handleItemClick, handleKeyDown]);

  return { items };
};
