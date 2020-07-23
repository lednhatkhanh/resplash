import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';

type Props = ExtendableComponentProps<'span'>;

export const ListItemIcon = React.forwardRef<HTMLLIElement, Props>(function ListItem(
  { children, className, ...rest },
  ref,
) {
  return (
    <span {...rest} ref={ref} className={clsx(className)}>
      {children}
    </span>
  );
});
