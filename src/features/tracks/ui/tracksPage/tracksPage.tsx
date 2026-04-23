import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi.ts';
import s from './tracksPage.module.scss';

export const TracksPage = () => {
  const { data, hasNextPage, isLoading, isFetching, isFetchingNextPage, fetchNextPage } =
    useFetchTracksInfiniteQuery();

  const page = data?.pages.flatMap((page) => page.data);

  function loadMoreHandler() {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }

  return (
    <div>
      <h1>Tracks page</h1>
      <div className={s.list}>
        {page?.map((track) => {
          const { title, user, attachments } = track.attributes;

          return (
            <div key={track.id} className={s.item}>
              <div>
                <p>Title: {title}</p>
                <p>Name: {user.name}</p>
              </div>
              {attachments.length ? <audio controls src={attachments[0].url} /> : 'no file'}
            </div>
          );
        })}
      </div>
      {!isLoading && (
        <>
          {hasNextPage ? (
            <button onClick={loadMoreHandler} disabled={isFetching}>
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
          ) : (
            <p>Nothing more to load</p>
          )}
        </>
      )}
    </div>
  );
};
