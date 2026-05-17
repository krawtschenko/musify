import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  UpdatePlaylistArgs,
} from './playlistsApi.types.ts';
import { baseApi } from '@/app/api/baseApi.ts';
import {
  playlistCreateResponseSchema,
  playlistsResponseSchema,
} from '../model/playlists.schemas.ts';
import { imagesSchema } from '@/common/schemas';
import { withZodCatch } from '@/common/utils';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      fetchPlaylists: build.query({
        query: (params: FetchPlaylistsArgs) => ({ url: '/playlists', params }),
        providesTags: ['Playlists'],
        ...withZodCatch(playlistsResponseSchema),
      }),
      createPlaylist: build.mutation({
        query: (body: CreatePlaylistArgs) => {
          body.data.type = 'playlists';
          return { method: 'POST', url: '/playlists', body };
        },
        invalidatesTags: ['Playlists'],
        ...withZodCatch(playlistCreateResponseSchema),
      }),
      deletePlaylist: build.mutation<void, { playlistId: string }>({
        query: ({ playlistId }) => ({ method: 'DELETE', url: `/playlists/${playlistId}` }),
        invalidatesTags: ['Playlists'],
      }),
      updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
        query: ({ playlistId, body }) => {
          body.data.type = 'playlists';
          return { method: 'PUT', url: `/playlists/${playlistId}`, body };
        },
        async onQueryStarted({ playlistId, body }, { dispatch, queryFulfilled, getState }) {
          const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists');

          const patchResults: { undo: () => void }[] = [];

          args.forEach((arg) => {
            patchResults.push(
              dispatch(
                playlistsApi.util.updateQueryData(
                  'fetchPlaylists',
                  {
                    pageNumber: arg.pageNumber,
                    pageSize: arg.pageSize,
                    search: arg.search,
                  },
                  (state) => {
                    const index = state.data.findIndex((playlist) => playlist.id === playlistId);
                    if (index !== -1) {
                      state.data[index].attributes = { ...state.data[index].attributes, ...body };
                    }
                  },
                ),
              ),
            );
          });

          try {
            await queryFulfilled;
          } catch {
            patchResults.forEach((patchResult) => {
              patchResult.undo();
            });
          }
        },
        invalidatesTags: ['Playlists'],
      }),
      uploadPlaylistCover: build.mutation({
        query: ({ playlistId, file }: { playlistId: string; file: File }) => {
          const formData = new FormData();
          formData.append('file', file);

          return { method: 'POST', url: `/playlists/${playlistId}/images/main`, body: formData };
        },
        invalidatesTags: ['Playlists'],
        ...withZodCatch(imagesSchema),
      }),
      deletePlaylistCover: build.mutation<void, { playlistId: string }>({
        query: ({ playlistId }) => ({
          method: 'DELETE',
          url: `/playlists/${playlistId}/images/main`,
        }),
        invalidatesTags: ['Playlists'],
      }),
    };
  },
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi;
