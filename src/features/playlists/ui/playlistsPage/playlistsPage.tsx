import s from './playlistsPage.module.scss';
import { CreatePlaylistForm } from './createPlaylistForm';
import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from '@/features/playlists/api';

export const PlaylistsPage = () => {
  const { data } = useFetchPlaylistsQuery();
  const [deletePlaylist] = useDeletePlaylistMutation();

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>

      <CreatePlaylistForm />

      <div className={s.items}>
        {data?.data.map((playlist) => {
          return (
            <div className={s.item} key={playlist.id}>
              <div>title: {playlist.attributes.title}</div>
              <div>description: {playlist.attributes.description}</div>
              <div>userName: {playlist.attributes.user.name}</div>
              <button onClick={() => deletePlaylist({ playlistId: playlist.id })}>DELETE</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
