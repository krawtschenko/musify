import type { PlaylistData, UpdatePlaylistArgs } from '@/features/playlists/api';
import s from './playlistsList.module.scss';
import { useState } from 'react';
import { EditPlaylistForm } from '../editPlaylistForm';
import { PlaylistItem } from '../playlistItem';
import { useForm } from 'react-hook-form';

type Props = {
  playlists: PlaylistData[];
  isPlaylistsLoading: boolean;
};

export const PlaylistsList = ({ playlists, isPlaylistsLoading }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

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
    <div className={s.items}>
      {!playlists.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}
      {playlists.map((playlist) => {
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
  );
};
