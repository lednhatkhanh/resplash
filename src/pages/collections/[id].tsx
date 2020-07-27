import React from 'react';
import { Layout, Spinner, PhotosList } from 'src/components';
import Head from 'next/head';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';
import { SingleCollectionModel, PhotoModel } from 'src/models';
import { UserItem } from 'src/components/UserItem';
import { stringify } from 'querystring';

const CollectionDetailPage = () => {
  const router = useRouter();
  const { collection, isFetchingCollection } = useFetchCollectionDetail(router.query.id as string | undefined);
  const {
    photos,
    isFetchingCollectionPhotos,
    fetchMoreCollectionPhotos,
    canFetchMoreCollectionPhotos,
  } = useFetchCollectionPhotos(router.query.id as string | undefined);
  const pageDescription = collection
    ? `A collection of ${collection.total_photos} photos about ${collection.tags
        .map((tag) => tag.title)
        .join(', ')} of ${collection.user.name}`
    : '';

  const handleFetchMoreCollectionPhotos = () => {
    if (photos.length && canFetchMoreCollectionPhotos) {
      fetchMoreCollectionPhotos();
    }
  };

  const renderContent = () => {
    if (!collection || isFetchingCollection) {
      return (
        <div className="flex justify-center py-5">
          <Spinner className="w-12 h-12" />
        </div>
      );
    }

    return (
      <>
        <UserItem user={collection.user} />

        <div className="h-2" />

        <h1 className="prose prose-2xl capitalize">{collection.tags[0].title}</h1>

        <div className="h-2" />

        {collection.description && <div className="prose prose-lg">{collection.description}</div>}

        <div className="h-10" />

        <span className="prose prose-sm">{`${collection.total_photos} photos`}</span>

        <div className="h-5" />

        <PhotosList
          photos={photos}
          isFetching={isFetchingCollectionPhotos}
          onLoadMore={handleFetchMoreCollectionPhotos}
        />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Resplash</title>
        <meta name="description" content={pageDescription} />
      </Head>
      <Layout>{renderContent()}</Layout>
    </>
  );
};

const useFetchCollectionDetail = (id: string | undefined) => {
  const { data: collection, isFetching: isFetchingCollection } = useQuery<
    SingleCollectionModel,
    ['collection', string | undefined]
  >({
    queryKey: ['collection', id],
    queryFn(_key, collectionId) {
      return fetch(`/api/unsplash/collections/${collectionId}`).then((res) => res.json());
    },
    config: {
      enabled: !!id,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  });

  return { collection, isFetchingCollection };
};

const useFetchCollectionPhotos = (id: string | undefined) => {
  const PER_PAGE = 15;
  const {
    data: photosPages,
    isFetching: isFetchingCollectionPhotos,
    fetchMore: fetchMoreCollectionPhotos,
    canFetchMore: canFetchMoreCollectionPhotos,
  } = useInfiniteQuery<PhotoModel[], ['collectionPhotos', string | undefined], number>({
    queryKey: ['collectionPhotos', id],
    queryFn(_key, collectionId, page = 1) {
      return fetch(
        `/api/unsplash/collections/${collectionId}/photos?${stringify({ page, per_page: PER_PAGE })}`,
      ).then((res) => res.json());
    },
    config: {
      enabled: !!id,
      getFetchMore(lastPage, allPages) {
        if (!lastPage || lastPage.length < PER_PAGE) {
          return false;
        }

        return allPages.length + 1;
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  });
  const photos = (photosPages ?? []).flat();

  return { photos, isFetchingCollectionPhotos, fetchMoreCollectionPhotos, canFetchMoreCollectionPhotos };
};

export default CollectionDetailPage;
