import React from 'react';
import { ExtendableComponentProps } from '../common';
import clsx from 'clsx';

type Props = ExtendableComponentProps<'span'>;

export const ListItemText: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <span {...rest} className={clsx('prose prose-sm', className)}>
      {children}
    </span>
  );
};
