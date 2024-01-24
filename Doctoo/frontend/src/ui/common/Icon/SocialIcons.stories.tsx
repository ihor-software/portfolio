import { Icon } from './Icon';
import icons from './iconPaths';
import './Icon.module.css';

export default {
  title: 'UI/Icons/SocialIcons',
  component: Icon,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    layout: 'centered',
  },
};

export const Google = {
  args: {
    src: icons.google,
    alt: 'google',
  },
};

export const Facebook = {
  args: {
    src: icons.facebook,
    alt: 'facevook',
  },
};
