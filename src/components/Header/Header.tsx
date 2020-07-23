import React from 'react';
import clsx from 'clsx';
import { MenuIcon } from 'src/icons';
import { useScrollTrigger } from 'src/hooks';
import { AppLink } from '../AppLink';
import { IconButton } from '../IconButton';
import classes from './Header.module.scss';
import { motion } from 'framer-motion';

type Props = {
  onMenuButtonClick: () => void;
};

export const Header = React.forwardRef<HTMLElement, Props>(function Header({ onMenuButtonClick }, ref) {
  const hide = useScrollTrigger();

  return (
    <motion.header
      animate={{ y: hide ? '-150%' : '0%' }}
      transition={transition}
      ref={ref}
      className="sticky z-10 top-0 left-0 right-0 h-12 shadow-xl bg-white"
    >
      <div className="flex items-center container mx-auto h-full relative px-2">
        <IconButton onClick={onMenuButtonClick} aria-label="Toggle menu">
          <MenuIcon />
        </IconButton>

        <AppLink href="/" className={clsx('h-full flex items-center px-2 absolute', classes.logo)}>
          <img className="w-8" src="images/unsplash.svg" alt="Logo" />
        </AppLink>
      </div>
    </motion.header>
  );
});

const transition = { bounceDamping: 0 };
