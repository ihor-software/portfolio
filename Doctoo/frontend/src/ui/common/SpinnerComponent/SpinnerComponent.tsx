import { FC } from 'react';
import icons from '../Icon/iconPaths';

type SpinnerProps = {
  additionalClass?: string;
};

const SpinnerComponent: FC<SpinnerProps> = ({ additionalClass }) => {
  return <img src={icons.spinner} alt='spinner' className={`animate-spin ${additionalClass}`} />;
};

export default SpinnerComponent;
