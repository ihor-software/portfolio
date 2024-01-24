import { FC, useEffect } from 'react';
import { Icon } from '../Icon';
import icons from '../Icon/iconPaths';
import styles from './Alert.module.css';

export type AlertTypes = {
  label: string;
  option?: 'error' | 'success' | 'info';
  open: boolean;
  setOpen: (open: boolean) => void;
  autoClose?: boolean;
};

const alertIcons = [
  { option: 'error', icon: <Icon src={icons.warning} alt='error' /> },
  { option: 'success', icon: <Icon src={icons.valid} alt='success' /> },
  { option: 'info', icon: <Icon src={icons.help} alt='info' /> },
];

const Alert: FC<AlertTypes> = ({ label, open, setOpen, option = 'info', autoClose = false }) => {
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (autoClose) {
      timerId = setTimeout(() => setOpen(false), 5000);
    }

    return () => (timerId ? clearTimeout(timerId) : undefined);
  }, [setOpen]);
  return (
    <>
      {open && (
        <div className={` ${styles.alert} ${styles[option]}`}>
          {alertIcons.find(el => el.option === option)?.icon}
          {label}
          <span onClick={() => setOpen(false)} className='w-[24px]'>
            <Icon
              src={icons.close}
              alt='Close'
              className={styles[`${option}Cross`]}
              iconColor={option === 'info' ? 'main' : ''}
            />
          </span>
        </div>
      )}
    </>
  );
};

export default Alert;
