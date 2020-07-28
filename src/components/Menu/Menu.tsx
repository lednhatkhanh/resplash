import React from 'react';
import clsx from 'clsx';
import { ExtendableComponentProps } from '../common';
import { Dialog } from '../Dialog';
import { List } from '../List';
import { useMenuItem, UseMenuItemsProps } from './use-menu-items';
import { usePopper } from 'react-popper';

type BaseProps = UseMenuItemsProps & {
  onDismiss: () => void;
  style?: React.CSSProperties;
  anchorEl: HTMLElement | null;
};
type Props = ExtendableComponentProps<'ul', BaseProps>;

export const Menu: React.FC<Props> = ({ isOpen, children, onDismiss, anchorEl, style, ...rest }) => {
  const [domEl, setDomEl] = React.useState<HTMLUListElement | null>(null);
  const { items } = useMenuItem({ children, isOpen, onDismiss });
  const { styles: popperStyles, attributes: popperAttributes } = usePopper(anchorEl, domEl, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
  const menuStyle = { ...popperStyles.popper, ...style };

  return (
    <Dialog isOpen={isOpen} onDismiss={onDismiss} hasBackDrop={false} enableAutoFocus={false} preventScroll={false}>
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
