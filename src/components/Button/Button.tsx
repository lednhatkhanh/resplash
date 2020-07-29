import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ComponentPropsWithRef<'button'> & {
  variant?: 'default' | 'primary' | 'quiet';
  icon?: React.ReactNode;
  responsive?: boolean;
};

export const Button: React.FC<ButtonProps> = React.forwardRef(function Button(
  { variant = 'default', icon, className, children, responsive, ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      className={clsx(
        'px-2 md:px-5 rounded font-semibold text-sm transition-all duration-150 ease-in-out leading-none select-none inline-flex items-center justify-center relative focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed h-8',
        {
          primary: 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 active:bg-yellow-600',
          default: 'bg-gray-400 hover:bg-gray-300 active:bg-gray-500',
          quiet: 'bg-transparent hover:bg-gray-600 hover:bg-opacity-25 active:bg-gray-700 active:bg-opacity-25',
        }[variant],
        className,
      )}
    >
      {icon && (
        <>
          {React.isValidElement(icon) ? React.cloneElement(icon, { className: 'w-4 h-4' }) : null}
          <div className={clsx(responsive ? 'w-0 md:w-2' : 'w-2')} />
        </>
      )}
      <span className={clsx(responsive && icon ? 'sr-only md:not-sr-only' : '')}>{children}</span>
    </button>
  );
});
