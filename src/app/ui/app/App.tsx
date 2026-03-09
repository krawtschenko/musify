import { Routing } from '@/common/routing';
import { Header } from '@/common/components/header';
import s from './app.module.scss';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  );
};
