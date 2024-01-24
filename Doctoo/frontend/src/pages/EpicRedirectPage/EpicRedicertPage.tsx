import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'src/utils/routes';

const EpicRedirectPage: FC = () => {
  return (
    <p>
      Success! Go to <NavLink to={'/dashboard'}>dashboard</NavLink>
    </p>
  );
};

export default EpicRedirectPage;
