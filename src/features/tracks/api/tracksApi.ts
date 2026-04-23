import { baseApi } from '@/app/api';
import type { FetchTracksResponse } from './tracksApi.types.ts';

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | null>({
        infiniteQueryOptions: {
          initialPageParam: null,
          getNextPageParam: (lastPage) => {
            return lastPage.meta.nextCursor || null;
          },
        },
        query: ({ pageParam }) => ({
          url: 'playlists/tracks',
          params: { cursor: pageParam, pageSize: 5, paginationType: 'cursor' },
        }),
      }),
    };
  },
});

export const { useFetchTracksInfiniteQuery } = tracksApi;
