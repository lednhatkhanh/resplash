import React from 'react';
import { ExtendableComponentProps } from '../common';
import clsx from 'clsx';

export const Paper: React.FC<ExtendableComponentProps<'div'>> = React.forwardRef(function Paper(
  { className, children, ...rest },
  ref,
) {
  return (
    <div {...rest} ref={ref} className={clsx('bg-white p-5 rounded focus:outline-none', className)}>
      {children}
    </div>
  );
});
