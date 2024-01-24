import { FC, useEffect, useState } from 'react';
import NavItem, { NavItemProps } from './components/NavItem/NavItem';
import icons from '../common/Icon/iconPaths';
import MainLogo from './components/MainLogo/MainLogo';
import styles from './Navigation.module.css';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks/redux';
import { logoutThunk } from 'src/store/slices/auth/auth.thunk';
import { ROUTES } from 'src/utils/routes';
import { useAppSelector } from 'src/hooks/redux';

const Navigation: FC = () => {
  const [reduced, setReduced] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.auth.currentUser);

  const checkScreenWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setReduced(true);
    } else {
      setReduced(false);
    }
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    if (location.pathname.endsWith('calendar')) {
      setReduced(true);
    } else {
      checkScreenWidth();
    }
  }, [location.pathname]);

  const patientNavItems: Omit<NavItemProps, 'reduced'>[] = [
    {
      icon: icons.dashboard,
      label: 'Dashboard',
      link: '/dashboard',
    },
    {
      icon: icons.appointments,
      label: 'Appointments',
      link: '/appointments',
    },
    {
      icon: icons.doctors,
      label: 'My doctors',
      link: '/my-doctors',
    },
    {
      icon: icons.chats,
      label: 'Chats',
      link: '/chats',
    },
    {
      icon: icons.date,
      label: 'Calendar',
      link: '/calendar',
    },
    {
      icon: icons.settings,
      label: 'Settings',
      link: '/settings',
    },
    {
      icon: icons.chats,
      label: 'Doctors Chat',
      link: '/doctorchat',
    },
    {
      icon: icons.account,
      label: 'Profile',
      link: `/profile`,
    },
    {
      icon: icons.logout,
      label: 'Logout',
      link: '',
      action: () => dispatch(logoutThunk()),
    },
  ];

  const doctorNavItems: Omit<NavItemProps, 'reduced'>[] = [
    {
      icon: icons.dashboard,
      label: 'Dashboard',
      link: '/dashboard',
    },
    {
      icon: icons.chats,
      label: 'Chats',
      link: '/doctorchat',
    },
    {
      icon: icons.file,
      label: 'Transcript',
      link: '/transcript',
    },
  ];

  const additionalNavItems: Omit<NavItemProps, 'reduced'>[] = [
    {
      icon: icons.account,
      label: 'Profile',
      link: `/profile`,
    },
    {
      icon: icons.logout,
      label: 'Logout',
      link: ROUTES.HOME,
      action: () => dispatch(logoutThunk()),
    },
  ];

  const currentNavItems = user?.role_cd === 'doctor' ? doctorNavItems : patientNavItems;

  return (
    <div className='bg-main'>
      <div
        className={`h-[100vh] transition-all duration-300 ${
          reduced ? 'w-20 px-3 items-center' : 'w-72 px-8'
        }  py-12 bg-main text-white flex flex-col gap-8 shrink-0`}
      >
        <MainLogo reduced={reduced} />
        <div className='flex h-full flex-col justify-between'>
          <div className={styles.itemFlex}>
            {currentNavItems.slice(0, 6).map((el, index) => (
              <NavItem {...{ ...el, reduced }} key={index} />
            ))}
          </div>
          <div className={styles.itemFlex}>
            {additionalNavItems.map((el, index) => (
              <NavItem {...{ ...el, reduced }} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
