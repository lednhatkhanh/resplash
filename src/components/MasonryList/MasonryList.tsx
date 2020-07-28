import React from 'react';
import { Spinner } from '../Spinner';
import { UseMasonryListProps, useMasonryList } from './use-masonry-list';

type Props<Item extends { [key: string]: unknown }> = UseMasonryListProps<Item> & {
  isFetching: boolean;
};

export const MasonryList = <Item extends { [key: string]: unknown }>(props: Props<Item>) => {
  const { items, isFetching } = props;
  const listRef = React.useRef<HTMLDivElement | null>(null);
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null);
  const { style, renderingItems } = useMasonryList(props, { list: listRef.current, loadMore: loadMoreRef.current });

  return (
    <>
      {!items.length && !isFetching && (
        <img className="w-full md:w-1/2 lg:w-1/3 mx-auto" src="/images/undraw_not_found.svg" alt="Not found" />
      )}

      <div ref={listRef} style={style} className="relative">
        {renderingItems}
      </div>

      <div ref={loadMoreRef} className="h-10" />
      <div className="flex justify-center h-16">{isFetching && <Spinner className="w-12 h-12" />}</div>
    </>
  );
};
