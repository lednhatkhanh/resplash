import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ComponentPropsWithRef<'button'> & {
  variant?: 'default' | 'primary' | 'quiet';
  icon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = React.forwardRef(function Button(
  { variant = 'default', icon, className, children, ...rest },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      className={clsx(
        'p-2 md:px-5 md:py-3 rounded font-semibold text-sm transition-all duration-150 ease-in-out leading-none select-none inline-flex items-center justify-center relative focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
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
          <div>{icon}</div>
          <div className="w-2" />
        </>
      )}
      <span>{children}</span>
    </button>
  );
});
