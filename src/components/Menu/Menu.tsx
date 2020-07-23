import React from 'react';
import { usePopper } from 'react-popper';

import { ExtendableComponentProps } from '../common';
import { List } from '../List';
import { ListItem } from '../ListItem';

type BaseProps = {
  anchorEl: HTMLElement | null;
};
type Props = ExtendableComponentProps<'div', BaseProps>;

export const Menu: React.FC<Props> = ({ anchorEl, style, ...rest }) => {
  const [domEl, setDomEl] = React.useState<HTMLDivElement | null>(null);
  const { styles: popperStyles, attributes: popperAttributes } = usePopper(anchorEl, domEl, {
    placement: 'bottom-end',
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
    <div {...rest} ref={setDomEl} style={menuStyle} {...popperAttributes.popper}>
      <List role="menu">
        <ListItem>Facebook</ListItem>
        <ListItem>Twitter</ListItem>
        <ListItem>Reddit</ListItem>
      </List>
    </div>
  );
};
