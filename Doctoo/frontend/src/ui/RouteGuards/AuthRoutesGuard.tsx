import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from 'src/utils/routes';

export const AuthRoutesGuard: FC<{ isAuth: boolean }> = ({ isAuth }) => {
  return isAuth ? <Navigate to={ROUTES.DASHBOARD} /> : <Outlet />;
};
