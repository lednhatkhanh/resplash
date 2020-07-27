import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { stringify } from 'querystring';
import { Layout, CollectionsList } from 'src/components';
import { CollectionModel } from 'src/models';
import Head from 'next/head';
import { uniqBy } from 'src/helpers';

const CollectionsPage = () => {
  const { collections, isFetchingCollections, fetchMoreCollections, canFetchMoreCollections } = useFetchCollections();

  const handleFetchMoreCollections = () => {
    if (canFetchMoreCollections && collections.length) {
      fetchMoreCollections();
    }
  };

  return (
    <>
      <Head>
        <title>Resplash - Collections</title>
      </Head>
      <Layout>
        <CollectionsList
          collections={collections}
          isFetching={isFetchingCollections}
          onLoadMore={handleFetchMoreCollections}
        />
      </Layout>
    </>
  );
};

const useFetchCollections = () => {
  const {
    data: collectionPages,
    isFetching: isFetchingCollections,
    isFetchingMore: isFetchingMoreCollections,
    fetchMore: fetchMoreCollections,
    canFetchMore: canFetchMoreCollections,
  } = useInfiniteQuery<CollectionModel[], 'collections', number>({
    queryKey: 'collections',
    queryFn(_key, page = 1) {
      return fetch(`/api/unsplash/collections/featured?${stringify({ page, per_page: 15 })}`).then((response) =>
        response.json(),
      );
    },
    config: {
      getFetchMore(lastPage, allPages) {
        if (!lastPage || !lastPage.length) {
          return false;
        }

        return allPages.length + 1;
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  });
  const collections = uniqBy((collectionPages ?? []).flat(), 'id');

  return {
    collections,
    isFetchingCollections,
    isFetchingMoreCollections,
    fetchMoreCollections,
    canFetchMoreCollections,
  };
};

export default CollectionsPage;
