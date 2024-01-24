import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import EpicRedirectPage from 'src/pages/EpicRedirectPage/EpicRedicertPage';
import { User } from 'src/types/user.types';
import { ROUTES } from 'src/utils/routes';

export const DefaultRoutesGuard: FC<{ user: User | null; isAuth: boolean }> = ({
  user,
  isAuth,
}) => {
  const queryCode = new URLSearchParams(window.location.search).get('code');
  if (queryCode && !user) {
    return <EpicRedirectPage />;
  }
  return !isAuth ? <Navigate to={ROUTES.LOGIN} /> : <Outlet />;
};
