import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { stringify } from 'querystring';
import { Layout, CollectionsList } from 'src/components';
import { CollectionModel } from 'src/models';
import Head from 'next/head';

const CollectionsPage = () => {
  const { collections, isFetchingCollections, fetchMoreCollections } = useFetchCollections();

  return (
    <>
      <Head>
        <title>Resplash - Collections</title>
      </Head>
      <Layout>
        <CollectionsList
          collections={collections}
          isFetching={isFetchingCollections}
          onLoadMore={fetchMoreCollections}
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
  } = useInfiniteQuery<CollectionModel[], 'collections', number>({
    queryKey: 'collections',
    queryFn(_key, page = 1) {
      return fetch(`/api/unsplash/collections?${stringify({ page, per_page: 15 })}`).then((response) =>
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
  const collections = (collectionPages ?? []).flat();

  return { collections, isFetchingCollections, isFetchingMoreCollections, fetchMoreCollections };
};

export default CollectionsPage;
