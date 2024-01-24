import icons from 'src/ui/common/Icon/iconPaths';
import { Avatar } from '../Avatar';
import { Button } from 'src/ui/common/Button';
import { getUser as selectUser } from 'src/store/slices/auth/auth.slice';
import { Icon } from 'src/ui/common';
import { User } from 'src/types/user.types';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/hooks/redux';

interface PersonalInfoProps {
  onEdit: () => void;
}

type PersonalInfoState = {
  userAvatar?: string;
};

export function PersonalInfo({ onEdit }: PersonalInfoProps) {
  const user = useAppSelector(selectUser)! as User;
  const [state, setState] = useState<PersonalInfoState>({ userAvatar: user.avatar });

  useEffect(() => {
    setState({ ...state, userAvatar: user.avatar });
  }, [user]);

  return (
    <div className='flex flex-col items-start gap-4 p-8 bg-white md:flex-row rounded-2xl'>
      <Avatar
        src={state.userAvatar ?? icons.account}
        className={!state.userAvatar ? 'w-[64px] h-[64px] object-cover' : ''}
        onError={() => setState({ ...state, userAvatar: undefined })}
      />

      <div className='flex flex-col flex-grow gap-1'>
        <h2 className='text-2xl leading-9 '>
          {user.first_name} {user.last_name}
        </h2>
        <p className='text-base font-normal leading-6 text-grey-1'>{user.email}</p>
        {!user.isRegisteredWithGoogle && (
          <p className='text-base font-normal leading-6 text-grey-1'>{user.phone_number}</p>
        )}
      </div>

      <Button variant='flat' icon={icons.edit} onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}
