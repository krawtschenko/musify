import { NavLink } from 'react-router';
import s from './header.module.scss';
import { Path } from '@/common/routing';
import { useGetMeQuery, useLogoutMutation } from '@/features/auth/api';
import { Login } from '@/features/auth/ui/login';

const navItems = [
  { to: Path.Main, label: 'Main' },
  { to: Path.Playlists, label: 'Playlists' },
  { to: Path.Tracks, label: 'Tracks' },
  { to: Path.Profile, label: 'Profile' },
];

export const Header = () => {
  const { data } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  return (
    <header className={s.container}>
      <nav>
        <ul className={s.list}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `link ${isActive ? s.activeLink : ''}`}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {data && data.login}
      {data && (
        <div className={s.loginContainer}>
          <p>{data.login}</p>
          <button onClick={() => logout()}>logout</button>
        </div>
      )}
      {!data && <Login />}
    </header>
  );
};
