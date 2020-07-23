import React from 'react';
import Link, { LinkProps } from 'next/link';

type Props = Pick<LinkProps, 'href' | 'as' | 'passHref'> & React.ComponentPropsWithRef<'a'>;

export const AppLink: React.FC<Props> = React.forwardRef(function AppLink(
  { children, href, as, passHref, ...rest },
  ref,
) {
  return (
    <Link href={href} as={as} passHref={passHref}>
      <a {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  );
});
