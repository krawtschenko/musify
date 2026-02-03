import s from './playlistsPage.module.scss';
import { CreatePlaylistForm } from './createPlaylistForm';
import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,
  useUpdatePlaylistMutation,
} from '@/features/playlists/api';
import { type SubmitHandler, useForm } from 'react-hook-form';
import type { UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts';
import { useState } from 'react';

export const PlaylistsPage = () => {
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const { data } = useFetchPlaylistsQuery();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [updatePlaylist] = useUpdatePlaylistMutation();

  const updatePlaylistHandler = (playlistId: string) => {
    updatePlaylist({
      playlistId,
      body: {
        title: '💕Updated Playlist',
        description: '🐖Updated Playlist',
        tagIds: [],
      },
    });
  };
  const editPlaylistHandler = (arg: null) => {};
  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (data) => {};

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>

      <CreatePlaylistForm />

      <div className={s.items}>
        {data?.data.map((playlist) => {
          const isEditing = playlist.id === playlistId;

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2>Edit playlist</h2>
                  <div>
                    <input {...register('title')} placeholder={'title'} />
                  </div>
                  <div>
                    <input {...register('description')} placeholder={'description'} />
                  </div>
                  <button type={'submit'}>save</button>
                  <button type={'button'} onClick={() => editPlaylistHandler(null)}>
                    cancel
                  </button>
                </form>
              ) : (
                <div>
                  <div>title: {playlist.attributes.title}</div>
                  <div>description: {playlist.attributes.description}</div>
                  <div>userName: {playlist.attributes.user.name}</div>
                  <button onClick={() => deletePlaylist({ playlistId: playlist.id })}>
                    DELETE
                  </button>
                  <button onClick={() => updatePlaylistHandler(playlist.id)}>UPDATE</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
