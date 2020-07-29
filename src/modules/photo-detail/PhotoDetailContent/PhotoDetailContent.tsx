import React from 'react';
import { Layout, Spinner, Button } from 'src/components';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { SinglePhotoModel } from 'src/models';
import { UserItem } from 'src/components/UserItem';
import { HeartIcon, SoftwareDownloadIcon } from 'src/icons';
import { useImageSrcset, usePhotoMeta, useDownloadPhoto } from 'src/hooks';
import Head from 'next/head';
import classes from './PhotoDetailContent.module.scss';
import clsx from 'clsx';

export const PhotoDetailContent: React.FC = () => {
  const router = useRouter();
  const { data: photo, isFetching: isFetchingPhoto } = useQuery<SinglePhotoModel, 'photo'>({
    queryKey: 'photo',
    queryFn() {
      return fetch(`/api/unsplash/photos/${router.query.id}`).then((response) => response.json());
    },
    config: {
      enabled: !!router.query.id,
    },
  });
  const srcSet = useImageSrcset(photo ? photo.urls.raw : '', imageSizes);
  const photoMeta = usePhotoMeta(photo);
  const handleDownload = useDownloadPhoto(photo);

  return (
    <>
      <Head>
        <title>Resplash - {photoMeta?.description}</title>
      </Head>
      <Layout>
        {photo ? (
          <>
            <UserItem user={photo.user} />
            <div className="h-5"></div>
            <div className={clsx('flex justify-center', classes.imageContainer)}>
              <img
                sizes="(min-width: 1280px) 1280px, calc(100vw - 40px)"
                className={clsx('h-full', classes.image)}
                src={photo.urls.regular}
                alt={photoMeta?.description}
                srcSet={srcSet}
              />
            </div>
            <div className="h-5"></div>
            <div className="grid items-center justify-end grid-flow-col gap-2">
              <Button variant="default" icon={<HeartIcon />} aria-label="Like">
                {photo.likes}
              </Button>
              <Button variant="default" icon={<SoftwareDownloadIcon />} responsive onClick={handleDownload}>
                Download
              </Button>
            </div>
          </>
        ) : isFetchingPhoto ? (
          <div className="flex justify-center h-16">{<Spinner className="w-12 h-12" />}</div>
        ) : (
          <div>Error</div>
        )}
      </Layout>
    </>
  );
};

const imageSizes = [700, 1000, 1100, 1300, 1500, 2000, 2600, 3000];
