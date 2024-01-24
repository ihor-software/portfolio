import { Icon } from './Icon';
import icons from './iconPaths';
import './Icon.module.css';

export default {
  title: 'UI/Icons',
  component: Icon,
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    layout: 'centered',
  },
};

export const Favicon = {
  args: {
    src: icons.logo,
    alt: 'logo',
  },
};

export const Blood = {
  args: {
    src: icons.blood,
    alt: 'blood',
  },
};

export const Body = {
  args: {
    src: icons.body,
    alt: 'body',
  },
};

export const Empty = {
  args: {
    src: icons.emptyIcon,
    alt: 'empty',
  },
};

export const Gender = {
  args: {
    src: icons.gender,
    alt: 'gender',
  },
};

export const Healthcare = {
  args: {
    src: icons.healthcare,
    alt: 'healthcare',
  },
};

export const Help = {
  args: {
    src: icons.help,
    alt: 'help',
  },
};

export const Target = {
  args: {
    src: icons.target,
    alt: 'target',
  },
};

export const Timer = {
  args: {
    src: icons.timer,
    alt: 'timer',
  },
};

export const Valid = {
  args: {
    src: icons.valid,
    alt: 'valid',
  },
};

export const Warning = {
  args: {
    src: icons.warning,
    alt: 'warning',
  },
};

export const Weight = {
  args: {
    src: icons.weight,
    alt: 'weight',
  },
};
