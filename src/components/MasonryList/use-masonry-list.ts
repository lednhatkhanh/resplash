import React from 'react';
import debounce from 'lodash.debounce';
import { useIntersectionObserver, useMediaQuery, mediaQueries } from 'src/hooks';
import { get } from 'src/helpers';

export type UseMasonryListProps<Item extends { [key: string]: unknown }> = {
  items: Item[];
  renderItem: (item: Item, itemStyle: React.CSSProperties) => React.ReactNode;
  itemHeightPath: string;
  itemWidthPath: string;
  rowGap?: number;
  columnGap?: number;
  onLoadMore: () => void;
};

export const useMasonryList = <Item extends { [key: string]: unknown }>(
  {
    items,
    renderItem,
    onLoadMore,
    itemHeightPath,
    itemWidthPath,
    rowGap = 20,
    columnGap = 20,
  }: UseMasonryListProps<Item>,
  { list, loadMore }: { list: HTMLDivElement | null; loadMore: HTMLDivElement | null },
) => {
  useIntersectionObserver(loadMore, onLoadMore);
  const columnsCount = useResponsiveColumnsCount();
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  const [renderingItems, setRenderingItems] = React.useState<React.ReactNode[]>([]);

  const handleRenderItems = React.useCallback(() => {
    if (typeof columnsCount === 'undefined' || !list) {
      return null;
    }

    const listWidth = list.clientWidth;
    const itemWidth = (listWidth - columnGap * (columnsCount - 1)) / columnsCount;

    const withStylesItems = items.map((item, itemIndex) => {
      const itemOriginalHeight = get(item, itemHeightPath) as number;
      const itemOriginalWidth = get(item, itemWidthPath) as number;
      const itemRatio = itemOriginalWidth / itemOriginalHeight;
      const itemHeight = itemWidth / itemRatio;
      const itemLeft = (itemIndex % columnsCount) * itemWidth + columnGap * (itemIndex % columnsCount);

      return {
        item,
        position: 'absolute' as const,
        width: itemWidth,
        left: itemLeft,
        height: itemHeight,
      };
    });

    const columnHeightTracker = new Map<number, number>();
    let listHeight = 0;
    const toBeRenderedItems = withStylesItems.map(({ item, ...rest }, itemIndex) => {
      const columnIndex = itemIndex % columnsCount;
      const itemTop = columnHeightTracker.get(columnIndex) ?? 0;
      const columnHeight = itemTop + rest.height + rowGap;
      columnHeightTracker.set(columnIndex, columnHeight);
      if (columnHeight > listHeight) {
        listHeight = columnHeight;
      }
      return renderItem(item, { ...rest, top: itemTop });
    });

    setRenderingItems(toBeRenderedItems);
    setStyle({ height: listHeight });
  }, [columnsCount, list, columnGap, items, itemHeightPath, itemWidthPath, rowGap, renderItem]);
  React.useEffect(() => {
    const handleRenderResult = debounce(() => {
      handleRenderItems();
    }, 200);
    handleRenderResult();

    window.addEventListener('resize', handleRenderResult);
    return () => {
      window.removeEventListener('resize', handleRenderResult);
    };
  }, [handleRenderItems]);

  return { style, renderingItems };
};

const useResponsiveColumnsCount = () => {
  const isLgUp = useMediaQuery(mediaQueries.lgUp);
  const isMdUp = useMediaQuery(mediaQueries.mdUp);
  const columnsCount = React.useMemo(() => {
    if (typeof isLgUp === 'undefined' || typeof isMdUp === 'undefined') {
      return undefined;
    }

    return isLgUp ? 3 : isMdUp ? 2 : 1;
  }, [isLgUp, isMdUp]);

  return columnsCount;
};
