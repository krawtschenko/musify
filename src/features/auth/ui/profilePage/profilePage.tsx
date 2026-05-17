import { useGetMeQuery } from '@/features/auth/api';
import { useFetchPlaylistsQuery } from '@/features/playlists/api';
import { CreatePlaylistForm } from '@/features/playlists/ui/playlistsPage/createPlaylistForm';
import { PlaylistsList } from '@/features/playlists/ui/playlistsPage/playlistsList';
import s from './profilePage.module.css';
import { Navigate } from 'react-router';
import { Path } from '@/common/routing/routing';

export const ProfilePage = () => {
  const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery();
  const { data: playlistsResponse, isLoading } = useFetchPlaylistsQuery(
    {
      userId: meResponse?.userId,
    },
    {
      skip: !meResponse?.userId,
    },
  );

  if (isLoading || isMeLoading) return <h1>Skeleton loader...</h1>;
  if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />;

  return (
    <div>
      <h1>{meResponse?.login}</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistsList
          playlists={playlistsResponse?.data || []}
          isPlaylistsLoading={isLoading || isMeLoading}
        />
      </div>
    </div>
  );
};
