import React from 'react';
import { MasonryList } from '../MasonryList';
import { CollectionModel } from 'src/models';
import { CollectionCard } from '../CollectionCard';

type Props = {
  collections: CollectionModel[];
  isFetching: boolean;
  onLoadMore: () => void;
};

export const CollectionsList: React.FC<Props> = ({ collections, isFetching, onLoadMore }) => {
  const renderCollection = (collection: CollectionModel) => {
    return <CollectionCard key={collection.id} collection={collection} />;
  };

  return (
    <MasonryList items={collections} renderItem={renderCollection} isFetching={isFetching} onLoadMore={onLoadMore} />
  );
};
