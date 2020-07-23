import React from 'react';
import Link, { LinkProps } from 'next/link';
import { ListItem } from '../ListItem';

type Props = Pick<LinkProps, 'href' | 'as'> & React.ComponentPropsWithRef<typeof ListItem>;
export const SideBarLink = React.forwardRef<HTMLAnchorElement, Props>(function SideBarItem(
  { href, as, children, ...rest },
  ref,
) {
  return (
    <Link href={href} as={as} passHref>
      <ListItem {...rest} ref={ref} component="a">
        {children}
      </ListItem>
    </Link>
  );
});
