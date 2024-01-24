import { FC, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navigation from './ui/Navigation/Navigation';
import AppointmentsPage from './pages/AppointmentsPage/AppointmentsPage';
import DashboardDoctorPage from './pages/DashboardPage/DashboardDoctorPage';
import ConferencePage from './pages/ConferencePage/ConferencePage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ChatsPage from 'src/pages/ChatsPage/ChatsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import CreateAccLoginPage from './pages/CreateAccPage/CreateAccPage';
import MyDoctors from './pages/MyDoctorsPage/MyDoctors';
import { VerifyRegistrationPage } from './pages/VerifyRegistrationPage';
import { SuccessfullRegistrationPage } from './pages/SuccessfullRegistrationPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ROUTES } from './utils/routes';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { ResetPasswordPage } from './pages/ResetPassword';
import { DefaultRoutesGuard } from './ui/RouteGuards/DefaultRoutesGuard';
import { AuthRoutesGuard } from './ui/RouteGuards/AuthRoutesGuard';
import { PaymentPage } from './pages/PaymentPage';
import PassportPage from 'src/pages/PassportPage/PassportPage';
import TwoFactorAuthPage from './pages/TwoFactorAuthPage/TwoFactorAuthPage';
import { deleteMessage, getMessage, setMessage } from './store/slices/systemMessage.slice';
import Alert from './ui/common/Alert/Alert';
import SearchPage from './pages/SearchPage/SearchPage';
import SummarizationClinicalNotesPage from './pages/SummarizationClinicalNotesPage/SummarizationClinicalNotesPage';
import DoctorChatPage from 'src/pages/DoctorChatPage/DoctorChatPage';
import { useEpic } from './hooks/useEPIC';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getIsAuth, setCurrentUser } from './store/slices/auth';
import SpinnerComponent from './ui/common/SpinnerComponent/SpinnerComponent';
import { getUser } from './store/services/auth.service';
import { useSelector } from 'react-redux';

import { selectIsNavbarShown } from './store/slices/navbar/navbar.selector';
import TranscriptTab from './pages/ChatsPage/Components/TranscriptTab';

const App: FC = () => {
  const user = useAppSelector(state => state.auth.currentUser);
  const systemMessage = useSelector(getMessage);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useSelector(getIsAuth);

  const isNavbarShown = useAppSelector(selectIsNavbarShown);

  const handleClearMessage = () => {
    dispatch(deleteMessage());
  };

  const fetchUser = async () => {
    try {
      const { data, status } = await getUser();
      if (status === 200) {
        dispatch(setCurrentUser({ user: data.user, userSettings: data.settings }));
      }
    } catch (err: any) {
      dispatch(
        setMessage({ message: err.message || 'Oops, some error occurred!', status: 'error' }),
      );
    }
    setIsLoading(false);
  };

  useEpic();

  useEffect(() => {
    fetchUser();
  }, []);

  const patientRoutes = (
    <>
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path={ROUTES.APPOINTMENTS} element={<AppointmentsPage />} />
      <Route path={ROUTES.MY_DOCTORS} element={<MyDoctors />} />
      <Route path={ROUTES.CHATS} element={<ChatsPage />} />
      <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
      <Route path={ROUTES.PAYMENT} element={<PaymentPage />} />
      <Route path={ROUTES.SEARCH} element={<SearchPage />} />
      <Route path={ROUTES.CONFERENCE} element={<ConferencePage />} />
      <Route path={ROUTES.PASSPORT} element={<PassportPage />} />
    </>
  );

  const doctorRoutes = (
    <>
      <Route path={ROUTES.DASHBOARD} element={<DashboardDoctorPage />} />
      <Route path={ROUTES.CONFERENCE} element={<ConferencePage />} />
      <Route path={ROUTES.DOCTORCHAT} element={<DoctorChatPage />} />
      <Route path={ROUTES.TRANSCRIPT} element={<TranscriptTab />} />
    </>
  );

  return (
    <GoogleOAuthProvider
      clientId={'296889536498-63dlvj3gtomf2n53j9ggoconqks6qg3s.apps.googleusercontent.com'}
    >
      <BrowserRouter>
        <div className='flex bg-bg'>
          {isLoading ? (
            <div className='w-full h-[100vh] flex justify-center items-center'>
              <SpinnerComponent />
            </div>
          ) : (
            <>
              {user && isNavbarShown && <Navigation />}
              <div className='max-h-[100vh] w-full overflow-y-scroll'>
                <Routes>
                  <Route element={<AuthRoutesGuard isAuth={isAuth} />}>
                    <Route path={ROUTES.SIGNUP} element={<CreateAccLoginPage />} />
                    <Route path={ROUTES.VERIFY_REGISTER} element={<VerifyRegistrationPage />} />
                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                    <Route
                      path={ROUTES.REGISTER_SUCCESS}
                      element={<SuccessfullRegistrationPage />}
                    />
                    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                    <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
                  </Route>
                  <Route element={<DefaultRoutesGuard user={user} isAuth={isAuth} />}>
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                    <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
                    {user?.role_cd === 'patient' ? patientRoutes : doctorRoutes}
                  </Route>
                  <Route path={ROUTES.TWO_FA} element={<TwoFactorAuthPage />} />
                  <Route path={ROUTES.SUMMARIZATION} element={<SummarizationClinicalNotesPage />} />
                </Routes>
                {systemMessage.message && systemMessage.status && (
                  <Alert
                    label={systemMessage.message}
                    option={systemMessage.status}
                    open={Boolean(systemMessage.message)}
                    setOpen={handleClearMessage}
                    autoClose
                  />
                )}
              </div>
            </>
          )}
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

const Home: FC = () => {
  return (
    <div className='App'>
      <Navigate to={ROUTES.DASHBOARD} />
    </div>
  );
};

export default App;
