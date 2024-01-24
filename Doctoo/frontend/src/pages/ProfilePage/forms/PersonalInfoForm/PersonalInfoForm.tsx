import { useForm, SubmitHandler, useController } from 'react-hook-form';
import { Avatar } from '../../Avatar';
import { InputFile } from './InputFile';
import { Input } from 'src/ui/common/Input';
import { Button } from 'src/ui/common/Button';
import { PhoneInput } from './PhoneInput';
import { registerValidation } from 'src/ui/RegForm/validation';
import { useState } from 'react';
import { patchUserThunk } from 'src/store/slices/auth/auth.thunk';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { deleteFile, updateAvatar } from 'src/store/services/files.service';
import PassportScanner from 'src/pages/ProfilePage/PassportScanner';
import icons from 'src/ui/common/Icon/iconPaths';

interface PersonalInfoFormProps {
  closeModal: () => void;
}

interface PersonalInfoFormInputs {
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
}

type PersonalInfoFormState = {
  userAvatar?: string;
  userAvatarError?: string;
};

export function PersonalInfoForm({ closeModal }: PersonalInfoFormProps) {
  const user = useAppSelector(state => state.auth.currentUser)!;
  const dispatch = useAppDispatch();
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatar);
  const [state, setState] = useState<PersonalInfoFormState>({ userAvatar: avatarUrl });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<PersonalInfoFormInputs>({
    defaultValues: {
      avatar: user.avatar,
      fullName: `${user.first_name} ${user.last_name}`,
      email: user.email,
      phone: user.phone_number,
    },
  });

  const phoneController = useController({
    name: 'phone',
    control,
    rules: {
      required: true,
      pattern: {
        value: /^\+\d{12}$/,
        message: 'Please, enter a correct phone number',
      },
    },
  });

  const handleReset = () => {
    closeModal();
  };

  const handleDeleteAvatar = () => {
    setAvatarFile(undefined);
    setState({ ...state, userAvatar: undefined, userAvatarError: undefined });
    setAvatarUrl(process.env.REACT_APP_USER_DEFAULT_AVATAR!);
  };

  const handleChooseAvatar = (file?: File) => {
    if (
      !file ||
      file.size <= 0 ||
      file.size > 2 * 1024 * 1024 ||
      ![
        'image/jpg',
        'image/png',
        'image/jpeg',
        'image/x-icon',
        'image/svg',
        'image/gif',
        'image/webp',
      ].includes(file.type)
    ) {
      setState({
        ...state,
        userAvatarError:
          'User avatar must be an image and cannot be empty or have size more than 2MB!',
      });
      return;
    }

    setAvatarFile(file);

    if (!file) {
      return;
    }
    const avatarUrl = URL.createObjectURL(file);

    setAvatarUrl(avatarUrl);
    setState({ ...state, userAvatar: avatarUrl, userAvatarError: undefined });
  };

  const onSubmit: SubmitHandler<PersonalInfoFormInputs> = async data => {
    const [first_name, last_name] = data.fullName.split(' ');
    if (avatarFile) {
      if (!user.isRegisteredWithGoogle) {
        deleteFile(user.avatar);
      }

      const { data: newAvatarPath } = await updateAvatar(avatarFile);
      data.avatar = newAvatarPath;
    } else if (avatarUrl === process.env.REACT_APP_USER_DEFAULT_AVATAR! && !avatarFile) {
      if (!user.isRegisteredWithGoogle) {
        deleteFile(user.avatar);
      }

      data.avatar = state.userAvatar ?? avatarUrl ?? '';
    }
    const updateDto = {
      first_name,
      last_name,
      email: data.email,
      phone_number: data.phone,
      avatar: data.avatar,
    };
    dispatch(patchUserThunk(updateDto));
    closeModal();
  };

  return (
    <form className='flex flex-col gap-6 ' onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
      <h2 className='text-2xl font-medium leading-9'>Personal info</h2>
      <div className='flex items-center gap-6'>
        <Avatar
          src={state.userAvatar ?? icons.account}
          className={!state.userAvatar ? 'w-[64px] h-[64px]' : ''}
          onError={() => setState({ ...state, userAvatar: undefined })}
        />
        <InputFile
          isPhoto={avatarUrl !== process.env.REACT_APP_USER_DEFAULT_AVATAR}
          onChange={handleChooseAvatar}
          onDelete={handleDeleteAvatar}
        />
      </div>
      {state.userAvatarError && <span className='text-red text-sm'>{state.userAvatarError}</span>}
      <Input
        label='Name and Surname'
        value={getValues('fullName')}
        error={Boolean(errors.fullName)}
        helperText={errors.fullName?.message}
        {...register('fullName', registerValidation.first_name)}
      />
      <Input
        label='Email'
        value={getValues('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        {...register('email', registerValidation.email)}
      />
      <PhoneInput
        value={phoneController.field.value}
        onChange={phoneController.field.onChange}
        error={phoneController.fieldState.invalid}
        helperText={
          phoneController.fieldState.invalid ? 'Please, enter a correct phone number' : undefined
        }
      />
      <PassportScanner />
      <div className='flex gap-4'>
        <Button type='reset' variant='secondary' additionalStyle='w-1/2 '>
          Cancel
        </Button>
        <Button variant='main' type='submit' additionalStyle='w-1/2 '>
          Save
        </Button>
      </div>
    </form>
  );
}
