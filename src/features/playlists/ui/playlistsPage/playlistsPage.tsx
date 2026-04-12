import s from './playlistsPage.module.scss';
import { CreatePlaylistForm } from './createPlaylistForm';
import type { PlaylistData, UpdatePlaylistArgs } from '@/features/playlists/api';
import { useFetchPlaylistsQuery } from '@/features/playlists/api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { PlaylistItem } from '@/features/playlists/ui/playlistsPage/playlistItem';
import { EditPlaylistForm } from '@/features/playlists/ui/playlistsPage/editPlaylistForm';
import { useDebounceValue } from '@/common/hooks';
import { Pagination } from '@/common/components/pagination';

export const PlaylistsPage = () => {
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const debounceSearch = useDebounceValue(search);
  const { data, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber,
    pageSize,
  });

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

  function changePageSizeHandler(pageSize: number) {
    setPageNumber(1);
    setPageSize(pageSize);
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
      <Pagination
        currentPage={pageNumber}
        setCurrentPage={setPageNumber}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  );
};
