import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { stringify } from 'query-string';
import { PhotosList, Layout } from 'src/components';
import { PhotoModel } from 'src/models';
import { uniqBy } from 'src/helpers';

const HomePage = () => {
  const { photos, isFetchingPhotos, fetchMorePhotos, canFetchMorePhotos } = useFetchPhotos();

  const handleFetchMorePhotos = () => {
    if (canFetchMorePhotos && photos.length) {
      fetchMorePhotos();
    }
  };

  return (
    <Layout>
      <PhotosList photos={photos} isFetching={isFetchingPhotos} onLoadMore={handleFetchMorePhotos} />
    </Layout>
  );
};

const useFetchPhotos = () => {
  const {
    data: photosPages,
    isFetching: isFetchingPhotos,
    isFetchingMore: isFetchingMorePhotos,
    fetchMore: fetchMorePhotos,
    canFetchMore: canFetchMorePhotos,
  } = useInfiniteQuery<PhotoModel[], 'photos', number>({
    queryKey: 'photos',
    queryFn(_key, page = 1) {
      return fetch(`/api/unsplash/photos?${stringify({ page, per_page: 15 })}`).then((response) => response.json());
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
  const photos = uniqBy((photosPages ?? []).flat(), 'id');

  return { photos, isFetchingPhotos, isFetchingMorePhotos, fetchMorePhotos, canFetchMorePhotos };
};

export default HomePage;
