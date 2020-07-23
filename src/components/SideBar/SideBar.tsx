import React from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ExtendableComponentProps } from '../common';
import { BackDrop } from './BackDrop';
import { useSideBar } from './use-side-bar';

type BaseProps = {
  isOpen: boolean;
  onClose: () => void;
};
type Props = ExtendableComponentProps<'nav', BaseProps>;

export const SideBar: React.FC<Props> = ({ className, children, isOpen = false, onClose, ...rest }) => {
  const navDomRef = React.useRef<HTMLElement | null>(null);
  const { items } = useSideBar({ isOpen, children, onClose });

  const handleBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!navDomRef.current?.contains(event.target as HTMLElement)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="z-50 fixed left-0 top-0 right-0 bottom-0">
          <MotionBackDrop
            initial={backdropExitAnimate}
            animate={backdropAnimate}
            exit={backdropExitAnimate}
            onClick={handleBackDropClick}
          />
          <motion.nav
            {...(rest as unknown)}
            initial={sidebarExitAnimate}
            animate={sidebarAnimate}
            exit={sidebarExitAnimate}
            ref={navDomRef}
            className={clsx('bg-white w-56 z-10 absolute left-0 top-0 bottom-0 shadow-2xl', className)}
          >
            {items}
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
};

const MotionBackDrop = motion.custom(BackDrop);
const backdropExitAnimate = { opacity: 0 };
const backdropAnimate = { opacity: 1 };

const sidebarExitAnimate = { transform: 'translateX(-100%)' };
const sidebarAnimate = { transform: 'translateX(0%)' };
