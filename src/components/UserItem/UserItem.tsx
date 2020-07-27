import React from 'react';
import { UserModel } from 'src/models';
import clsx from 'clsx';
import classes from './UserItem.module.scss';

type Props = {
  user: UserModel;
};

export const UserItem: React.FC<Props> = ({ user }) => {
  return (
    <div className={clsx('flex items-center', classes.user)}>
      <img
        className="w-8 h-8 rounded-full"
        src={user.profile_image.medium}
        alt={`@${user.username}`}
        loading="lazy"
        width={32}
        height={32}
      />
      <span className="prose prose-sm">{user.name}</span>
    </div>
  );
};
