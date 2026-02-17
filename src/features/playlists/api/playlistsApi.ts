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
      fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs | void>({
        query: () => '/playlists',
        providesTags: ['Playlists'],
      }),
      createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
        query: (body) => ({ method: 'POST', url: '/playlists', body }),
        invalidatesTags: ['Playlists'],
      }),
      deletePlaylist: build.mutation<void, { playlistId: string }>({
        query: ({ playlistId }) => ({ method: 'DELETE', url: `/playlists/${playlistId}` }),
        invalidatesTags: ['Playlists'],
      }),
      updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
        query: ({ playlistId, body }) => ({ method: 'PUT', url: `/playlists/${playlistId}`, body }),
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
    };
  },
});

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
} = playlistsApi;
