import React from 'react';
import clsx from 'clsx';

import { useIntersectionObserver, useMediaQuery, mediaQueries } from 'src/hooks';

import { Spinner } from '../Spinner';

import classes from './MasonryList.module.scss';

interface Props<Item extends unknown> {
  items: Item[];
  renderItem: (item: Item) => React.ReactNode;
  isFetching: boolean;
  onLoadMore: () => void;
}

export const MasonryList = <Item extends unknown>({ items, renderItem, isFetching, onLoadMore }: Props<Item>) => {
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);
  const isLgUp = useMediaQuery(mediaQueries.lgUp);
  const isMdUp = useMediaQuery(mediaQueries.mdUp);
  const columnsCount = React.useMemo(() => {
    if (typeof isLgUp === 'undefined' || typeof isMdUp === 'undefined') {
      return undefined;
    }

    return isLgUp ? 3 : isMdUp ? 2 : 1;
  }, [isLgUp, isMdUp]);

  const handleIntersect = React.useCallback(() => {
    if (items.length) {
      onLoadMore();
    }
  }, [onLoadMore, items.length]);
  useIntersectionObserver(loadMoreRef.current, handleIntersect);

  const renderColumns = () => {
    if (typeof columnsCount === 'undefined') {
      return null;
    }

    return items
      .reduce((columnItems, item, itemIndex) => {
        const columnIndex = itemIndex % columnsCount;

        if (!columnItems[columnIndex]) {
          columnItems[columnIndex] = [];
        }

        columnItems[columnIndex]?.push(renderItem(item));
        return columnItems;
      }, [] as React.ReactNode[][])
      .map((column, index) => (
        <div key={index} className={clsx('flex flex-col flex-1', classes.column)}>
          {column}
        </div>
      ));
  };

  return (
    <>
      {!items.length && !isFetching && (
        <img className="w-full md:w-1/2 lg:w-1/3 mx-auto" src="/images/undraw_not_found.svg" alt="Not found" />
      )}
      <div className={clsx('flex', classes.list)}>{renderColumns()}</div>
      <div ref={loadMoreRef} className="h-1" />
      {isFetching && (
        <div className="flex justify-center py-5">
          <Spinner className="w-12 h-12" />
        </div>
      )}
    </>
  );
};
