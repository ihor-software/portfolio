import { FC, useEffect, useState } from 'react';
import styles from './Toggle.module.css';

type TogglePropsType = {
  isActive?: boolean;
  onToggle: () => void;
};

const Toggle: FC<TogglePropsType> = ({ isActive = false, onToggle }) => {
  const [toggled, setToggled] = useState<boolean>(isActive);

  useEffect(() => {
    setToggled(isActive);
  }, [isActive, setToggled]);

  const handleClick = (): void => {
    setToggled(prev => !prev);
    onToggle();
  };

  return (
    <div
      className={`${styles.mask} ${toggled ? styles['mask-toggled'] : ''}`}
      onClick={handleClick}
    >
      <span className={`${styles.knob} ${toggled ? styles['knob-toggled'] : ''}`}></span>
    </div>
  );
};

export default Toggle;
