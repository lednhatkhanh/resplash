import React from 'react';
import { CollectionModel } from 'src/models';
import { AppLink } from '../AppLink';
import { useImageSrcset } from 'src/hooks';
import { UserItem } from '../UserItem';

type Props = React.ComponentPropsWithRef<'a'> & {
  collection: CollectionModel;
};
export const CollectionCard: React.FC<Props> = ({ collection, style, ...rest }) => {
  const coverPhotoDescription =
    collection.cover_photo.alt_description ??
    collection.cover_photo.description ??
    `A photo of @${collection.user.username}`;
  const coverPhotoSrcset = useImageSrcset(collection.cover_photo.urls.raw, imageSizes);
  const containerStyle = { ...style, height: undefined, width: undefined };

  return (
    <AppLink
      {...rest}
      className="focus:outline-none focus:shadow-outline rounded p-1 transition-all duration-150 ease-in-out"
      href={`/collections/${collection.id}`}
      style={containerStyle}
    >
      <UserItem user={collection.user} />

      <div className="h-2" />

      <div className="relative">
        <img
          className="shadow-lg rounded"
          height={style?.height}
          width={style?.width}
          src={collection.cover_photo.urls.regular}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 315px, (min-width: 768px) 354px, calc(100vw - 40px)"
          srcSet={coverPhotoSrcset}
          alt={coverPhotoDescription}
          loading="lazy"
        />

        <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-75 rounded p-2">
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
