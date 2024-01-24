import { Icon } from './Icon';
import icons from './iconPaths';
import './Icon.module.css';

export default {
  title: 'UI/Icons/NavigationIcons',
  component: Icon,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    layout: 'centered',
  },
};

export const Account = {
  args: {
    src: icons.account,
    alt: 'account',
    iconColor: 'white',
  },
};

export const Appointments = {
  args: {
    src: icons.appointments,
    alt: 'appointments',
    iconColor: 'white',
  },
};

export const Chats = {
  args: {
    src: icons.chats,
    alt: 'chats',
    iconColor: 'white',
  },
};

export const Dashboard = {
  args: {
    src: icons.dashboard,
    alt: 'dashboard',
    iconColor: 'white',
  },
};

export const Date = {
  args: {
    src: icons.date,
    alt: 'date',
    iconColor: 'white',
  },
};

export const Doctors = {
  args: {
    src: icons.doctors,
    alt: 'doctors',
    iconColor: 'white',
  },
};

export const Logout = {
  args: {
    src: icons.logout,
    alt: 'logout',
    iconColor: 'white',
  },
};

export const Settings = {
  args: {
    src: icons.settings,
    alt: 'settings',
    iconColor: 'white',
  },
};
