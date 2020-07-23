import React from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { stringify } from 'query-string';
import { PhotosList, Layout, Input } from 'src/components';
import { SearchIcon } from 'src/icons';
import { PhotoModel } from 'src/models';

type SearchPhotoResult = {
  total: number;
  total_pages: number;
  results: PhotoModel[];
};

const SearchPage = () => {
  const router = useRouter();
  const { data: results, isFetching: isSearching, fetchMore } = useInfiniteQuery<
    SearchPhotoResult,
    ['search', string | undefined],
    number
  >({
    queryKey: ['search', router.query.query as string | undefined],
    queryFn(_key, searchQuery, page = 1) {
      return fetch(`/api/unsplash/search/photos?${stringify({ page, query: searchQuery })}`).then((response) =>
        response.json(),
      );
    },
    config: {
      enabled: !!router.query.query,
      getFetchMore(lastPage, allPages) {
        if (!lastPage.results) {
          return false;
        }

        return allPages.length + 1;
      },
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  });
  const photos = results ? results.map(({ results }) => results).flat() : [];

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const newQuery = (form.elements.namedItem('query') as HTMLInputElement).value;
    const nextUrl = `/search?${stringify({ query: newQuery })}`;
    router.push(nextUrl, nextUrl, {
      shallow: true,
    });
  };

  return (
    <Layout>
      <form onSubmit={handleSearch}>
        <Input
          id="query"
          type="search"
          icon={<SearchIcon />}
          placeholder="Enter query and press enter to search"
          aria-label="Search"
          required
        />
      </form>

      <div className="h-5"></div>

      <PhotosList photos={photos} isFetching={isSearching} onLoadMore={fetchMore} />
    </Layout>
  );
};

export default SearchPage;
