import React from 'react';
import { ExtendableComponentProps } from '../common';
import clsx from 'clsx';

type BaseProps = {
  icon?: React.ReactNode;
};
type Props = ExtendableComponentProps<'input', BaseProps>;

export const Input: React.FC<Props> = ({ className, icon, ...rest }) => {
  return (
    <div className={clsx('w-full relative', className)}>
      {icon && (
        <div className="pointer-events-none absolute left-0 flex items-center inset-y-0 text-gray-600 pl-2">{icon}</div>
      )}

      <input
        {...rest}
        className={clsx(
          'w-full py-2 px-5 bg-white border rounded-md text-sm focus:outline-none focus:shadow-outline transition-all duration-150 ease-in-out hover:bg-gray-100 text-gray-700 appearance-none',
          icon && 'pl-10',
        )}
      />
    </div>
  );
};
