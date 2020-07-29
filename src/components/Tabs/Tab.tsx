import React from 'react';
import clsx from 'clsx';
import { ExtendableComponentProps } from '../common';
import classes from './Tab.module.scss';

type BaseProps = {
  selected?: boolean;
};
type Props = ExtendableComponentProps<'button', BaseProps>;

export const Tab: React.FC<Props> = ({
  children,
  className,
  selected,
  role = 'tab',
  tabIndex = selected ? 0 : -1,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center justify-center cursor-pointer py-3 border-b-2 border-transparent hover:bg-gray-300 focus:outline-none focus:bg-gray-300 active:bg-gray-200 transition-all duration-200 ease-in-out',
        selected ? 'border-gray-700' : undefined,
        classes.tab,
        className,
      )}
      aria-selected={selected}
      role={role}
      tabIndex={tabIndex}
    >
      <span className="prose prose-sm">{children}</span>
    </button>
  );
};
