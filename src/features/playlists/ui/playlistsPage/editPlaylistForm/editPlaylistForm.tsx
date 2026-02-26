import { type UpdatePlaylistArgs, useUpdatePlaylistMutation } from '@/features/playlists/api';
import type { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

type Props = {
  playlistId: string;
  register: UseFormRegister<UpdatePlaylistArgs>;
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>;
  editPlaylist: (playlist: null) => void;
  setPlaylistId: (playlistId: null) => void;
};

export const EditPlaylistForm = ({
  playlistId,
  handleSubmit,
  register,
  editPlaylist,
  setPlaylistId,
}: Props) => {
  const [updatePlaylist] = useUpdatePlaylistMutation();

  function onSubmit(data: UpdatePlaylistArgs) {
    if (!playlistId) return;

    updatePlaylist({ playlistId, body: data }).then(() => {
      setPlaylistId(null);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('data.attributes.title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('data.attributes.description')} placeholder={'description'} />
      </div>
      <button type={'submit'}>save</button>
      <button type={'button'} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  );
};
