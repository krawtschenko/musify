import { type PlaylistData, useDeletePlaylistMutation } from '@/features/playlists/api';

type Props = {
  playlist: PlaylistData;
  editPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({ playlist, editPlaylist }: Props) => {
  const [deletePlaylist] = useDeletePlaylistMutation();

  return (
    <div>
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist({ playlistId: playlist.id })}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </div>
  );
};
