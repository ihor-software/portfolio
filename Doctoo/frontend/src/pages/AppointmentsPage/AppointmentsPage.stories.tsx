import { Meta, StoryObj } from '@storybook/react';
import AppointmentsPage from './AppointmentsPage';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import Navigation from 'src/ui/Navigation/Navigation';
import { fetchAllAppointments } from 'src/store/slices/appointment.slice';

const meta: Meta<typeof AppointmentsPage> = {
  title: 'Pages/AppointmentsPage',
  component: AppointmentsPage,
};

export default meta;

export const Primary: StoryObj<typeof AppointmentsPage> = {
  render: () => {
    // BrowserRouter is used to avoid errors when AppointmentsPage uses Navigation component, which calls useNavigation
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchAllAppointments());
    }, []);

    return (
      <div className='flex bg-bg'>
        <Navigation />
        <Routes>
          <Route path='*' element={<AppointmentsPage />} />
        </Routes>
      </div>
    );
  },
};
