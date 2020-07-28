import React from 'react';

export const useRefInjectedItems = (children: React.ReactNode, others?: { [eventName: string]: () => void }) => {
  const itemRefs = React.useRef<(HTMLElement | null)[]>([]);

  const handleChildrenRefs = React.useCallback((instance: HTMLElement | null, index: number) => {
    itemRefs.current[index] = instance;
  }, []);

  const items = React.useMemo(
    () =>
      React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              ref: (instance: HTMLElement | null) => {
                handleChildrenRefs(instance, index);
              },
              ...Object.entries(others || {}).reduce(
                (obj, [eventName, handler]) => ({
                  ...obj,
                  [eventName]: (...params: unknown[]) => {
                    if (child.props[eventName]) {
                      child.props[eventName](...params);
                    }

                    handler();
                  },
                }),
                {},
              ),
            })
          : child,
      ),
    [children, handleChildrenRefs, others],
  );

  return { items, itemRefs };
};
