import React from 'react';

import { PhotoModel } from 'src/models';

import { MasonryList } from '../MasonryList';
import { PhotoCard } from '../PhotoCard';

type Props = {
  photos: PhotoModel[];
  isFetching: boolean;
  onLoadMore: () => void;
};

export const PhotosList: React.FC<Props> = ({ photos, isFetching, onLoadMore }) => {
  const renderPhoto = React.useCallback((photo: PhotoModel) => {
    return <PhotoCard key={photo.id} photo={photo} />;
  }, []);

  return <MasonryList items={photos} renderItem={renderPhoto} isFetching={isFetching} onLoadMore={onLoadMore} />;
};
