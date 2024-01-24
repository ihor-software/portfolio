import { FC, useEffect, useState } from 'react';
import Button from 'src/ui/common/Button/Button';
import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import styles from './HeaderPage.module.css';
import { useAppSelector } from 'src/hooks/redux';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllAppointments, getAllAppointments } from 'src/store/slices/appointment.slice';
import { Doctor } from 'src/types/doctor.types';
import { getUniqueDoctors } from 'src/utils/appointmentSlice';
import { ROUTES } from 'src/utils/routes';
import { searchSliceActions } from 'src/store/slices/searchSlice';
import { useNavigate } from 'react-router-dom';

type HeaderPageProps = {
  title: string;
  icon: string;
};

const HeaderPage: FC<HeaderPageProps> = ({ title, icon }) => {
  const navigate = useNavigate();
  const search = useAppSelector(state => state.searchReducer.search);
  const dispatch = useDispatch();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const url = `/search`;

      navigate(url);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.titlesection}>
          <Icon src={icon} alt='dashboard' iconColor='main' />
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className='flex gap-x-4 flex-col sm:flex-row'>
          <div className='flex bg-white lg:w-[392px] h-10 rounded-lg'>
            <Icon src={icons.search} alt='search' iconColor='search' />
            <input
              className={styles.search}
              placeholder={'Search by doctor'}
              value={search}
              onKeyPress={handleKeyPress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(searchSliceActions.setSearch(e.target.value))
              }
            />
          </div>

          <Button variant='main' onClick={() => {}}>
            <NavLink to={ROUTES.SEARCH}>Find a doctor</NavLink>
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
