import s from './playlistsPage.module.scss';
import { CreatePlaylistForm } from './createPlaylistForm';
import { useFetchPlaylistsQuery } from '@/features/playlists/api';
import { useState, type ChangeEvent } from 'react';
import { useDebounceValue } from '@/common/hooks';
import { Pagination } from '@/common/components/pagination';
import { PlaylistsList } from '@/features/playlists/ui/playlistsPage/playlistsList';

export const PlaylistsPage = () => {
  const [search, setSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const debounceSearch = useDebounceValue(search);
  const { data, isLoading, error } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber,
    pageSize,
  });

  function changePageSizeHandler(pageSize: number) {
    setPageNumber(1);
    setPageSize(pageSize);
  }

  function searchPlaylistHandler(e: ChangeEvent<HTMLInputElement>) {
    setPageNumber(1);
    setSearch(e.currentTarget.value);
  }

  if (isLoading) {
    return <h1>Skeleton loader...</h1>;
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>

      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={'Search playlist by title'}
        onChange={(e) => searchPlaylistHandler(e)}
      />
      <PlaylistsList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
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
