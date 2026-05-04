import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from './playlistsApi.types.ts';
import { baseApi } from '@/app/api/baseApi.ts';
import type { Images } from '@/common/types';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
        query: (params) => ({ url: '/playlists', params }),
        providesTags: ['Playlists'],
      }),
      createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
        query: (body) => {
          body.data.type = 'playlists';
          return { method: 'POST', url: '/playlists', body };
        },
        invalidatesTags: ['Playlists'],
      }),
      deletePlaylist: build.mutation<void, { playlistId: string }>({
        query: ({ playlistId }) => ({ method: 'DELETE', url: `/playlists/${playlistId}` }),
        invalidatesTags: ['Playlists'],
      }),
      updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
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
        query: ({ playlistId, body }) => {
          body.data.type = 'playlists';
          return { method: 'PUT', url: `/playlists/${playlistId}`, body };
        },
        invalidatesTags: ['Playlists'],
      }),
      uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
        query: ({ playlistId, file }) => {
          const formData = new FormData();
          formData.append('file', file);

          return { method: 'POST', url: `/playlists/${playlistId}/images/main`, body: formData };
        },
        invalidatesTags: ['Playlists'],
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
