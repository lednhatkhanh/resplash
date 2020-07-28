import React from 'react';
import clsx from 'clsx';
import { useMutation } from 'react-query';
import { PhotoModel } from 'src/models';
import { SoftwareDownloadIcon, HeartIcon } from 'src/icons';
import { useImageSrcset } from 'src/hooks';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { AppLink } from '../AppLink';
import { UserItem } from '../UserItem';
import classes from './PhotoCard.module.scss';

type Props = React.ComponentPropsWithRef<'a'> & {
  photo: PhotoModel;
};

const PhotoCard: React.FC<Props> = ({ photo, style, ...rest }) => {
  const description = photo.alt_description ?? photo.description ?? `A photo of @${photo.user.username}`;
  const handleDownload = useDownload(photo);
  const srcSet = useImageSrcset(photo.urls.raw, imageSizes);

  return (
    <AppLink
      {...rest}
      href="/"
      className="shadow-lg relative overflow-hidden w-full rounded focus:outline-none focus:shadow-outline transition-all duration-200 ease-in-out"
      aria-label={`Details about photo: ${description}`}
      style={style}
    >
      <img
        sizes="(min-width: 1280px) 400px, (min-width: 1024px) 315px, (min-width: 768px) 354px, calc(100vw - 40px)"
        src={photo.urls.regular}
        srcSet={srcSet}
        alt={description}
        height={style?.height}
        width={style?.width}
        loading="lazy"
      />

      <div
        className={clsx(
          'absolute left-0 bottom-0 right-0 bg-white bg-opacity-75 text-gray-900 rounded overflow-hidden grid p-2 grid-flow-col content-end grid-cols-1 col-gap-2 items-center',
          classes.overlay,
        )}
      >
        <UserItem user={photo.user} />

        <Button aria-label="Like" variant="quiet" icon={<HeartIcon />}>
          {photo.likes}
        </Button>

        <IconButton aria-label="Download" onClick={handleDownload}>
          <SoftwareDownloadIcon />
        </IconButton>
      </div>
    </AppLink>
  );
};

const imageSizes = Array.from({ length: 7 }, (_v, i) => (i + 6) * 100);

const useDownload = (photo: PhotoModel) => {
  const [triggerTrackDownloads] = useMutation(() => fetch(`/api/unsplash/photos/${photo.id}/download`));

  const triggerDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const anchorTag = document.createElement('a');
    anchorTag.href = `${photo.links.download}?force=true`;
    document.body.append(anchorTag);
    anchorTag.click();
    document.body.removeChild(anchorTag);

    triggerTrackDownloads();
  };

  return triggerDownload;
};

export { PhotoCard };
