import React from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { stringify } from 'query-string';
import { PhotosList, Layout, Input, Tabs, CollectionsList, Tab } from 'src/components';
import { SearchIcon } from 'src/icons';
import { PhotoModel, CollectionModel } from 'src/models';

type SearchResult = {
  total: number;
  total_pages: number;
  results: PhotoModel[] | CollectionModel[];
};

export const SearchPageContent = () => {
  const router = useRouter();
  const { data: results, isFetching: isSearching, fetchMore, canFetchMore, clear: clearSearchData } = useInfiniteQuery<
    SearchResult,
    ['search', string | undefined, string | undefined],
    number
  >({
    queryKey: ['search', router.query.query as string | undefined, router.query.type as string | undefined],
    queryFn(_key, searchQuery, type, page = 1) {
      return fetch(`/api/unsplash/search/${type}?${stringify({ page, query: searchQuery })}`).then((response) =>
        response.json(),
      );
    },
    config: {
      enabled: !!router.query.query && !!router.query.type,
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
  const items = (results ? results.map(({ results }) => results).flat() : []) as PhotoModel[] | CollectionModel[];
  const [queryString, setQueryString] = React.useState<string>((router.query.query as string | undefined) ?? '');
  const [tab, setTab] = React.useState<string>((router.query.type as string | undefined) ?? 'photos');

  const handleSearch = ({ query = undefined, type = undefined }: { query?: string; type?: string } = {}) => {
    const nextUrl = `/search?${stringify({ ...router.query, query: query ?? queryString, type: type ?? tab })}`;
    router.push(nextUrl, nextUrl);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch({ query: queryString });
  };

  const handleFetchMore = () => {
    if (canFetchMore) {
      fetchMore();
    }
  };

  const handleChangeTab = (tabValue: string) => {
    if (tabValue !== tab) {
      clearSearchData();
      setTab(tabValue);
      handleSearch({ type: tabValue });
    }
  };

  const handleQueryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryString(event.target.value);
  };

  return (
    <Layout>
      <form onSubmit={handleFormSubmit}>
        <Input
          id="query"
          type="search"
          value={queryString}
          icon={<SearchIcon />}
          placeholder="Enter query and press enter to search"
          aria-label="Search"
          required
          onChange={handleQueryInputChange}
        />
      </form>

      <div className="h-5"></div>

      <Tabs aria-label="Search type">
        <Tab selected={tab === 'photos'} onClick={() => handleChangeTab('photos')}>
          Photos
        </Tab>
        <Tab selected={tab === 'collections'} onClick={() => handleChangeTab('collections')}>
          Collections
        </Tab>
      </Tabs>

      <div className="h-5"></div>

      {tab === 'photos' ? (
        <PhotosList photos={items as PhotoModel[]} isFetching={isSearching} onLoadMore={handleFetchMore} />
      ) : (
        <CollectionsList
          collections={items as CollectionModel[]}
          isFetching={isSearching}
          onLoadMore={handleFetchMore}
        />
      )}
    </Layout>
  );
};
