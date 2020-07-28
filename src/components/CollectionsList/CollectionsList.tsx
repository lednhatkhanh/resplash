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
  const renderCollection = (collection: CollectionModel, itemStyle: React.CSSProperties) => {
    return <CollectionCard key={collection.id} style={itemStyle} collection={collection} />;
  };

  return (
    <MasonryList
      items={collections}
      renderItem={renderCollection}
      isFetching={isFetching}
      onLoadMore={onLoadMore}
      itemHeightPath="cover_photo.height"
      itemWidthPath="cover_photo.width"
      rowGap={60}
    />
  );
};
