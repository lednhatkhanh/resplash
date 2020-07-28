import React from 'react';
import clsx from 'clsx';
import { ExtendableComponentProps } from '../common';
import { Dialog } from '../Dialog';
import { useMenuItem } from '../Menu';

type BaseProps = {
  isOpen: boolean;
  onDismiss: () => void;
};
type Props = ExtendableComponentProps<'nav', BaseProps>;

export const SideBar: React.FC<Props> = ({ className, children, isOpen = false, onDismiss, ...rest }) => {
  const { items } = useMenuItem({ children, isOpen });

  return (
    <Dialog isOpen={isOpen} onDismiss={onDismiss} enableAutoFocus={false}>
      <nav {...rest} className={clsx('fixed inset-y-0 left-0 bg-white w-48', className)}>
        {items}
      </nav>
    </Dialog>
  );
};
