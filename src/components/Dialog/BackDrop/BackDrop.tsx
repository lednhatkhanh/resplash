import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from 'src/components/common';

import classes from './BackDrop.module.scss';

type Props = ExtendableComponentProps<'div'>;
export const BackDrop: React.FC<Props> = React.forwardRef(function BackDrop({ className, onClick, ...rest }, ref) {
  return (
    <div
      {...rest}
      ref={ref}
      role="presentation"
      className={clsx('absolute left-0 top-0 right-0 bottom-0 bg-black bg-opacity-75', classes.backdrop, className)}
      onClick={onClick}
    />
  );
});
