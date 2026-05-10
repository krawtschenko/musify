import { type PlaylistData, useDeletePlaylistMutation } from '@/features/playlists/api';
import { PlaylistCover } from './playlistCover';
import { PlaylistDescription } from './playlistDescription';

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
