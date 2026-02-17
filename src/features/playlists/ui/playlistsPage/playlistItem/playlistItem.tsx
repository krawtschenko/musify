import {
  type PlaylistData,
  useDeletePlaylistMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/playlists/api';
import defaultCover from '@/assets/images/default-playlist-cover.png';
import s from './playlistItem.module.scss';
import type { ChangeEvent } from 'react';

type Props = {
  playlist: PlaylistData;
  editPlaylist: (playlist: PlaylistData) => void;
};

export const PlaylistItem = ({ playlist, editPlaylist }: Props) => {
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();

  const originalCover = playlist.attributes.images.main.find((img) => img.type === 'original');
  const src = originalCover ? originalCover.url : defaultCover;

  function uploadCoverHandler(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.length && event.target.files[0];

    if (file) {
      uploadPlaylistCover({ playlistId: playlist.id, file: file });
    } else {
      return;
    }
  }

  return (
    <div>
      <img src={src} alt="'cover" className={s.cover} />
      <input type={'file'} onChange={uploadCoverHandler} />
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist({ playlistId: playlist.id })}>delete</button>
      <button onClick={() => editPlaylist(playlist)}>update</button>
    </div>
  );
};
