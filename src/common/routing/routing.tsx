import { Route, Routes } from 'react-router';
import { MainPage } from '@/app/ui/mainPage';
import { PageNotFound } from '@/common/components/pageNotFound';
import { PlaylistsPage } from '@/features/playlists/ui/playlistsPage';
import { TracksPage } from '@/features/tracks/ui/tracksPage';
import { ProfilePage } from '@/features/auth/ui/profilePage';

export const Path = {
  Main: '/',
  Playlists: '/playlists',
  Tracks: '/tracks',
  Profile: '/profile',
  NotFound: '*',
} as const;

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Playlists} element={<PlaylistsPage />} />
    <Route path={Path.Tracks} element={<TracksPage />} />
    <Route path={Path.Profile} element={<ProfilePage />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
);
