import { FC } from 'react';
import { Icon } from 'src/ui/common/Icon/Icon';
import icons from 'src/ui/common/Icon/iconPaths';

type MainLogoProps = {
  variant?: 'main';
  reduced?: boolean;
};

const MainLogo: FC<MainLogoProps> = ({ variant, reduced = false }) => {
  return (
    <div className='flex gap-2 items-center'>
      <Icon src={icons.logo} alt='logo' />
      {!reduced && <h1 className={`${variant ? 'text-main' : 'text-white'} font-logo`}>DOCTOO</h1>}
    </div>
  );
};

export default MainLogo;
