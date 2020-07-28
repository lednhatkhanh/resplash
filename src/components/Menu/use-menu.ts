import React from 'react';
import { usePopper } from 'react-popper';
import { useMenuItem } from './use-menu-items';

export type UseMenuProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  anchorEl: HTMLElement | null;
  isOpen: boolean;
};

export const useMenu = (
  { children, style, anchorEl, isOpen }: UseMenuProps,
  { menu }: { menu: HTMLElement | null },
) => {
  const { styles: popperStyles, attributes: popperAttributes } = usePopper(anchorEl, menu, {
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
  const { items } = useMenuItem({ children, isOpen });

  return { items, menuStyle, popperAttributes };
};
