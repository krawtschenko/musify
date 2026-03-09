import { type PlaylistData, useDeletePlaylistMutation } from '@/features/playlists/api';
import { PlaylistCover } from '@/features/playlists/ui/playlistsPage/playlistItem/playlistCover';
import { PlaylistDescription } from '@/features/playlists/ui/playlistsPage/playlistItem/playlistDescription';

type Props = {
  playlist: PlaylistData;
  editPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({ playlist, editPlaylist }: Props) => {
  const [deletePlaylist] = useDeletePlaylistMutation();

  return (
    <div>
      <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
      <PlaylistDescription attributes={playlist.attributes} />

      <button onClick={() => deletePlaylist({ playlistId: playlist.id })}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </div>
  );
};
