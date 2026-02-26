import s from './playlistsPage.module.scss';
import { CreatePlaylistForm } from './createPlaylistForm';
import { useFetchPlaylistsQuery } from '@/features/playlists/api';
import { useForm } from 'react-hook-form';
import type { PlaylistData, UpdatePlaylistArgs } from '@/features/playlists/api';
import { useState } from 'react';
import { PlaylistItem } from '@/features/playlists/ui/playlistsPage/playlistItem';
import { EditPlaylistForm } from '@/features/playlists/ui/playlistsPage/editPlaylistForm';

export const PlaylistsPage = () => {
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const { data } = useFetchPlaylistsQuery();

  function editPlaylistHandler(playlist: PlaylistData | null) {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        data: {
          type: 'playlist',
          attributes: {
            title: playlist.attributes.title,
            description: playlist.attributes.description,
            tagIds: playlist.attributes.tags.map((t) => t.id),
          },
        },
      });
    } else {
      setPlaylistId(null);
    }
  }

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
                <EditPlaylistForm
                  editPlaylist={editPlaylistHandler}
                  setPlaylistId={setPlaylistId}
                  playlistId={playlist.id}
                  register={register}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <PlaylistItem playlist={playlist} editPlaylist={editPlaylistHandler} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
