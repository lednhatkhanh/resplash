import React from 'react';
import { ExtendableComponentProps } from '../common';

type Props = ExtendableComponentProps<'ul'>;

export const List: React.FC<Props> = ({ children, ...rest }) => {
  return <ul {...rest}>{children}</ul>;
};
