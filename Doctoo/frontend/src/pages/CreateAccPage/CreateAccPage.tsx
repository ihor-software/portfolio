import { FC } from 'react';
import RegForm from 'src/ui/RegForm/RegForm';
import { AuthenticationPageTemplate } from 'src/pages/AuthenticationPageTemplate';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import styles from './CreateAccPage.module.css';
import { registerSliceActions } from 'src/store/slices/registerSlice';

const CreateAccLoginPage: FC = () => {
  const open = useAppSelector(store => store.registerReducer.open);
  const dispatch = useAppDispatch();
  const { closeModal } = registerSliceActions;

  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${
          open ? 'block' : 'hidden'
        }`}
      >
        <div className={styles.modal}>
          <span onClick={() => dispatch(closeModal())} className='cursor-pointer'>
            <Icon src={icons.close} alt='close' />
          </span>
          <div className={styles['text-container']}>
            <span className={styles.title}>Confirm your account</span>
            <span className={styles.subtext}>
              The confirmation letter has been sent to your email. Please, check your email and
              confirm your account
            </span>
          </div>
        </div>
      </div>
      <AuthenticationPageTemplate>
        <RegForm />
      </AuthenticationPageTemplate>
    </>
  );
};

export default CreateAccLoginPage;
