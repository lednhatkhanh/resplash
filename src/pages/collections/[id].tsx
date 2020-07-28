import React from 'react';
import { Layout, Spinner, PhotosList, Button, Menu, ListItem, ListItemText, ListItemIcon } from 'src/components';
import Head from 'next/head';
import { useQuery, useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';
import { SingleCollectionModel, PhotoModel } from 'src/models';
import { UserItem } from 'src/components/UserItem';
import { stringify } from 'querystring';
import { ShareIcon, FacebookIcon, TwitterIcon } from 'src/icons';

const CollectionDetailPage = () => {
  const router = useRouter();
  const { collection } = useFetchCollectionDetail(router.query.id as string | undefined);
  const {
    photos,
    isFetchingCollectionPhotos,
    fetchMoreCollectionPhotos,
    canFetchMoreCollectionPhotos,
  } = useFetchCollectionPhotos(router.query.id as string | undefined);
  const shareButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pageTitle = capitalize(collection?.tags[0].title);
  const pageDescription = collection
    ? `A collection of ${collection.total_photos} photos about ${collection.tags
        .map((tag) => tag.title)
        .join(', ')} of ${collection.user.name}`
    : '';
  const coverPhotoDescription =
    collection?.cover_photo.alt_description ??
    collection?.cover_photo.description ??
    `A photo of ${collection?.cover_photo.user.name}` ??
    '';

  const handleFetchMoreCollectionPhotos = () => {
    if (photos.length && canFetchMoreCollectionPhotos) {
      fetchMoreCollectionPhotos();
    }
  };

  const handleShare = () => {
    if (navigator.share && collection) {
      navigator
        .share({
          text: pageDescription,
          url: window.location.href,
          title: `${collection.tags[0].title.slice(0).toUpperCase()}${collection.tags[0].title.slice(1)}`,
        })
        .catch(() => {
          // Just do nothing...
        });
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleDismissMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Head>
        {collection ? (
          <>
            <title>Resplash - {pageTitle}</title>
            <meta name="description" content={pageDescription} />

            {/* OpenGraph tags */}
            <meta property="og:title" content={`Resplash - ${pageTitle}`} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`Resplash - ${pageTitle}`} />
            <meta name="twitter:description" content={pageDescription} />
            <meta name="twitter:image" content={collection.cover_photo.urls.regular} />
            <meta name="twitter:image:alt" content={coverPhotoDescription} />
          </>
        ) : (
          <title>Resplash</title>
        )}
      </Head>
      <Layout>
        {collection ? (
          <>
            <UserItem user={collection.user} />

            <div className="h-2" />

            <div className="grid row-gap-3 md:row-gap-0 md:grid-flow-col content-start justify-between">
              <div>
                <h1 className="prose prose-2xl capitalize">{collection.tags[0].title}</h1>

                <div className="h-2" />

                {collection.description && <div className="prose prose-lg">{collection.description}</div>}
              </div>

              <div>
                <Button ref={shareButtonRef} variant="primary" onClick={handleShare} icon={<ShareIcon />}>
                  Share
                </Button>
              </div>
            </div>

            <div className="h-10" />

            <span className="prose prose-sm">{`${collection.total_photos} photos`}</span>

            <div className="h-5" />

            <PhotosList
              photos={photos}
              isFetching={isFetchingCollectionPhotos}
              onLoadMore={handleFetchMoreCollectionPhotos}
            />

            <Menu anchorEl={shareButtonRef.current} isOpen={isMenuOpen} onDismiss={handleDismissMenu}>
              <ListItem
                component="a"
                href={`https://facebook.com/sharer.php?display=page&u=${window.location.href}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <ListItemIcon>
                  <FacebookIcon />
                </ListItemIcon>
                <ListItemText>Facebook</ListItemText>
              </ListItem>
              <ListItem
                component="a"
                href={`https://twitter.com/intent/tweet?text=${encodeURI(
                  `${pageDescription} on Resplash - ${window.location.href}`,
                )}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <ListItemIcon>
                  <TwitterIcon />
                </ListItemIcon>
                <ListItemText>Twitter</ListItemText>
              </ListItem>
            </Menu>
          </>
        ) : (
          <div className="flex justify-center py-5">
            <Spinner className="w-12 h-12" />
          </div>
        )}
      </Layout>
    </>
  );
};

const capitalize = (str: string | undefined) => {
  if (typeof str === 'undefined') {
    return '';
  }
  return str
    .split(' ')
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(' ');
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
