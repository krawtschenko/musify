import s from './app.module.scss';
import { Routing } from '@/common/routing';
import { Header } from '@/common/components/header';

export const App = () => {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <Routing />
      </div>
    </>
  );
};
