import { Routing } from '@/common/routing';
import { Header } from '@/common/components/header';
import s from './app.module.scss';
import { ToastContainer } from 'react-toastify';
import { useGlobalLoading } from '@/common/hooks';
import { LinearProgress } from '@/common/components/linearProgress';

export const App = () => {
  const isGlobalLoading = useGlobalLoading();

  return (
    <>
      <Header />
      {isGlobalLoading && <LinearProgress />}
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  );
};
