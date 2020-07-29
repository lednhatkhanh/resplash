import React from 'react';
import { ExtendableComponentProps } from '../common';
import clsx from 'clsx';

type Props = ExtendableComponentProps<'div'>;
export const Tabs: React.FC<Props> = ({ children, className, role = 'tablist', ...rest }) => {
  return (
    <div {...rest} role={role} className={clsx('grid grid-flow-col rounded-t overflow-hidden', className)}>
      {children}
    </div>
  );
};
