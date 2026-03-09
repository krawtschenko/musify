import type { ChangeEvent } from 'react';
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/playlists/api';
import defaultCover from '@/assets/images/default-playlist-cover.png';
import type { Images } from '@/common/types';
import s from './playlistCover.module.scss';
import { toast } from 'react-toastify';

type Props = {
  playlistId: string;
  images: Images;
};

export const PlaylistCover = ({ playlistId, images }: Props) => {
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation();

  const originalCover = images.main.find((img) => img.type === 'original');
  const src = originalCover ? originalCover.url : defaultCover;

  function uploadCoverHandler(event: ChangeEvent<HTMLInputElement>) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 1024 * 1024;

    const file = event.target.files?.length && event.target.files[0];

    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      toast('Only JPEG, PNG or GIF images are allowed', { theme: 'colored', type: 'error' });
      return;
    }

    if (file.size > maxSize) {
      toast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`, {
        theme: 'colored',
        type: 'error',
      });
      return;
    }

    uploadPlaylistCover({ playlistId, file: file });
  }
  function deleteCoverHandler(playlistId: string) {
    deletePlaylistCover({ playlistId });
  }

  return (
    <>
      <img src={src} alt="'cover" className={s.cover} />
      <input
        type={'file'}
        accept={'image/jpeg,image/png,image/gif'}
        onChange={uploadCoverHandler}
      />
      {originalCover && (
        <button onClick={() => deleteCoverHandler(playlistId)}>Delete cover</button>
      )}
    </>
  );
};
