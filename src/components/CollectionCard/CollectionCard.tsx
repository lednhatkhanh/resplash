import React from 'react';
import clsx from 'clsx';
import { CollectionModel } from 'src/models';
import { AppLink } from '../AppLink';
import classes from './CollectionCard.module.scss';
import { useImageSrcset } from 'src/hooks';

type Props = {
  collection: CollectionModel;
};
export const CollectionCard: React.FC<Props> = ({ collection }) => {
  const coverPhotoDescription =
    collection.cover_photo.alt_description ??
    collection.cover_photo.description ??
    `A photo of @${collection.user.username}`;
  const coverPhotoSrcset = useImageSrcset(collection.cover_photo.urls.raw, imageSizes);

  return (
    <AppLink
      className="focus:outline-none focus:shadow-outline rounded p-1 transition-all duration-150 ease-in-out"
      href="/"
    >
      <div className={clsx('flex items-center', classes.user)}>
        <img
          className="w-8 h-8 rounded-full"
          src={collection.user.profile_image.medium}
          alt={`@${collection.user.username}`}
          loading="lazy"
          width={32}
          height={32}
        />
        <span>{collection.user.name}</span>
      </div>

      <div className="h-2" />

      <div className="relative">
        <img
          className="shadow-lg rounded"
          height={collection.cover_photo.height}
          width={collection.cover_photo.width}
          src={collection.cover_photo.urls.regular}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 315px, (min-width: 768px) 354px, calc(100vw - 40px)"
          srcSet={coverPhotoSrcset}
          alt={coverPhotoDescription}
          loading="lazy"
        />

        <div className={clsx('absolute inset-x-0 bottom-0 bg-white bg-opacity-75 rounded p-2', classes.overlay)}>
          <h3 className="prose prose-lg capitalize">
            {collection.tags.length ? collection.tags[0].title : `A collection of @${collection.user.username}`}
          </h3>
          <span className="prose prose-sm">{`${collection.total_photos} photos`}</span>
        </div>
      </div>
    </AppLink>
  );
};

const imageSizes = Array.from({ length: 7 }, (_v, i) => (i + 6) * 100);
