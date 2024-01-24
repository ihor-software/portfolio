import { useState, useEffect } from 'react';
import { Icon } from 'src/ui/common/Icon/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import { Modal } from 'src/ui/common/Modal';
import Toggle from 'src/ui/common/Toggle/Toggle';
import { ChangePasswordForm } from './ChangePasswordForm';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../store/services/api/userAPI';
import { useSelector } from 'react-redux';
import { getUser } from 'src/store/slices/auth/auth.slice';
import { UserSettings } from '../../types/user.types';
import { Button, Input } from 'src/ui/common';

export function SettingsPage() {
  const [isPasswordFormOpened, setIsPasswordFormOpened] = useState(false);
  const [isTwoFactorToggled, setIsTwoFActorToggled] = useState(false);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [userPass, setUserPass] = useState('');
  const isTwoFactor = userSettings?.isTwoFactor ? 'off' : 'on';

  const navigate = useNavigate();
  const user = useSelector(getUser);

  const toggle2FA = () => {
    if (!user) return;
    navigate('/two-fa/verify', { state: { enable: true, email: user.email, password: userPass } });
  };

  useEffect(() => {
    const getUserSettings = async () => {
      if (!user) return;
      const { data } = await userAPI.getUserSettings(user?.id);
      data && setUserSettings(data);
    };

    getUserSettings();
  }, []);

  return (
    <div className='w-full h-full p-8 font-medium bg-bg'>
      <div className='flex items-center gap-3 mb-6'>
        <Icon src={icons.settings} alt='settings' iconColor='main' />
        <h1 className='text-2xl leading-9 text-black-1'>Settings</h1>
      </div>
      <div className='flex justify-between p-8 mb-4 text-base bg-white rounded-2xl'>
        <p>Password</p>
        <button
          className='bg-transparent border-0 text-main'
          onClick={() => setIsPasswordFormOpened(true)}
        >
          Change password
        </button>
      </div>
      <ul className='flex flex-col px-8 py-3 mb-4 text-base bg-white divide-y divide-grey-5 rounded-2xl'>
        <li className='flex items-center justify-between gap-1 py-4 text-base bg-white '>
          <span>Send e-mail notifications</span>
          <div className='shrink-0'>
            <Toggle isActive={userSettings?.isEmailNotification} onToggle={() => undefined} />
          </div>
        </li>
        <li className='flex items-center justify-between gap-1 py-4 text-base bg-white '>
          <span>Turn {isTwoFactor} two-factor authentication</span>
          <div className='shrink-0 flex flex-col gap-5 items-end transition-all duration-100'>
            <Toggle
              isActive={userSettings?.isTwoFactor}
              onToggle={() => setIsTwoFActorToggled(!isTwoFactorToggled)}
            />
            {isTwoFactorToggled && (
              <div className='flex flex-col gap-5 items-end'>
                <Input
                  label=''
                  placeholder='Enter your password'
                  value=''
                  password
                  onChange={e => setUserPass(e.target.value)}
                />
                <Button onClick={toggle2FA}>Turn {isTwoFactor} 2FA</Button>
              </div>
            )}
          </div>
        </li>
        <li className='flex items-center justify-between gap-1 py-4 text-base bg-white '>
          <span>Request approval for bill payment</span>
          <div className='shrink-0'>
            <Toggle isActive={userSettings?.isRequiredBillApproval} onToggle={() => undefined} />
          </div>
        </li>
      </ul>
      {isPasswordFormOpened && (
        <Modal onClose={() => setIsPasswordFormOpened(false)}>
          <ChangePasswordForm onCancel={() => setIsPasswordFormOpened(false)} />
        </Modal>
      )}
    </div>
  );
}
