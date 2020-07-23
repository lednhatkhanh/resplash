import React from 'react';
import clsx from 'clsx';

interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {}

export const IconButton: React.FC<IconButtonProps> = ({ className, children, ...rest }) => {
  const domRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <button
      {...rest}
      className={clsx(
        'p-2 md:p-3 bg-transparent rounded-full focus:outline-none focus:shadow-outline active:bg-gray-700 active:bg-opacity-25 hover:bg-gray-600 hover:bg-opacity-25 transition-all duration-200 ease-in-out select-none',
        className,
      )}
      ref={domRef}
    >
      {children}
    </button>
  );
};
