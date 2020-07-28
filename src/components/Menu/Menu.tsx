import React from 'react';
import clsx from 'clsx';
import { ExtendableComponentProps } from '../common';
import { Dialog } from '../Dialog';
import { List } from '../List';
import { UseMenuProps, useMenu } from './use-menu';

type BaseProps = UseMenuProps & { onDismiss: () => void };
type Props = ExtendableComponentProps<'ul', BaseProps>;

export const Menu: React.FC<Props> = ({ isOpen, children, onDismiss, anchorEl, style, ...rest }) => {
  const [domEl, setDomEl] = React.useState<HTMLUListElement | null>(null);
  const { menuStyle, popperAttributes, items } = useMenu({ isOpen, children, anchorEl, style }, { menu: domEl });

  return (
    <Dialog
      isOpen={isOpen}
      onDismiss={onDismiss}
      hasBackDrop={false}
      enableAutoFocus={false}
      preventScrollOnOpen={false}
    >
      <List
        {...rest}
        ref={setDomEl}
        className={clsx('shadow-lg bg-white')}
        style={menuStyle}
        {...popperAttributes.popper}
        role="menu"
      >
        {items}
      </List>
    </Dialog>
  );
};
