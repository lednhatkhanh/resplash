import React from 'react';

export const useRefInjectedItems = (children: React.ReactNode) => {
  const itemRefs = React.useRef<(HTMLElement | null)[]>([]);

  const handleChildrenRefs = React.useCallback((instance: HTMLElement | null, index: number) => {
    itemRefs.current[index] = instance;
  }, []);

  const items = React.Children.map(children, (child, index) =>
    React.isValidElement(child)
      ? React.cloneElement(child, {
          ref: (instance: HTMLElement | null) => {
            handleChildrenRefs(instance, index);
          },
        })
      : child,
  );

  return { items, itemRefs };
};
