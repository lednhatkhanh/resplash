import React from 'react';
import clsx from 'clsx';

import { OverridableComponentProps } from '../common';

type Props<Component extends React.ElementType = 'li'> = OverridableComponentProps<Component>;

export const ListItem = React.forwardRef<HTMLLIElement, Props>(function ListItem(
  { children, component, className, tabIndex = 0, ...rest },
  ref,
) {
  const Component = component ?? 'li';

  return (
    <Component
      {...rest}
      ref={ref}
      className={clsx(
        'grid grid-flow-col justify-start gap-2 items-center px-3 py-2 text-gray-700 focus:outline-none hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-300 transition-all duration-150 ease-in-out cursor-pointer border-b',
        className,
      )}
      tabIndex={tabIndex}
    >
      {children}
    </Component>
  );
}) as <Component extends React.ElementType = 'li'>(props: Props<Component>) => React.ReactElement<Props<Component>>;
