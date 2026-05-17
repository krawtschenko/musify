import { baseApi } from '@/app/api';
import { withZodCatch } from '@/common/utils/withZodCatch.ts';
import { fetchTracksResponseSchema } from '../model/tracks.schemas.ts';

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      fetchTracks: build.infiniteQuery({
        infiniteQueryOptions: {
          initialPageParam: null,
          getNextPageParam: (lastPage) => {
            return lastPage.meta.nextCursor || null;
          },
        },
        query: ({ pageParam }: { pageParam: string | null }) => ({
          url: 'playlists/tracks',
          params: { cursor: pageParam, pageSize: 5, paginationType: 'cursor' },
        }),
        ...withZodCatch(fetchTracksResponseSchema),
      }),
    };
  },
});

export const { useFetchTracksInfiniteQuery } = tracksApi;
