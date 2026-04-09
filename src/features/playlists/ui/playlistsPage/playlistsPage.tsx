import s from './playlistsPage.module.scss';
import { CreatePlaylistForm } from './createPlaylistForm';
import type { PlaylistData, UpdatePlaylistArgs } from '@/features/playlists/api';
import { useFetchPlaylistsQuery } from '@/features/playlists/api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { PlaylistItem } from '@/features/playlists/ui/playlistsPage/playlistItem';
import { EditPlaylistForm } from '@/features/playlists/ui/playlistsPage/editPlaylistForm';
import { useDebounceValue } from '@/common/hooks';

export const PlaylistsPage = () => {
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const debounceSearch = useDebounceValue(search);
  const { data, isLoading } = useFetchPlaylistsQuery({ search: debounceSearch });

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
      <input
        type="search"
        placeholder={'Search playlist by title'}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      <div className={s.items}>
        {!data?.data.length && !isLoading && <h2>Playlists not found</h2>}
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
