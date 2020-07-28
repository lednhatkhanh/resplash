import React from 'react';
import { ExtendableComponentProps } from '../common';

type Props = ExtendableComponentProps<'ul'>;

export const List: React.FC<Props> = React.forwardRef(function List({ children, ...rest }, ref) {
  return (
    <ul {...rest} ref={ref}>
      {children}
    </ul>
  );
});
