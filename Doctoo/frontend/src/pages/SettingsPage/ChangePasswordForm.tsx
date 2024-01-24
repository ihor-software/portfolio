import { Button } from 'src/ui/common/Button';
import { Input } from 'src/ui/common/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerValidation } from 'src/ui/RegForm/validation';

interface ChangePasswordFormProps {
  onCancel: () => void;
}

interface ChangePasswordFormInputs {
  oldPassword: string;
  newPassword: string;
}

export function ChangePasswordForm({ onCancel }: ChangePasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormInputs>();

  const handleReset = () => {
    onCancel();
  };
  const onSubmit: SubmitHandler<ChangePasswordFormInputs> = data => {
    alert(`data.oldPassword: ${data.oldPassword},\ndata.oldPassword: ${data.newPassword}`);
  };

  return (
    <form className='flex flex-col gap-6 ' onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
      <h2 className='text-2xl font-medium leading-9'>Change password</h2>

      <Input
        label='Old password'
        placeholder='Password'
        value=''
        password
        {...register('oldPassword', registerValidation.password)}
        error={Boolean(errors.oldPassword)}
        helperText='Password does not match requirements below'
      />

      <Input
        label='Create a new password'
        placeholder='Create password'
        value=''
        password
        {...register('newPassword', registerValidation.password)}
        error={Boolean(errors.newPassword)}
        helperText='Password does not match requirements below'
      />

      <ul className='pl-5 mb-2 text-sm leading-5 list-disc text-main'>
        <li>Password must be at least 8 characters long</li>
        <li>English keyboard type</li>
        <li>Uppercase and lowercase letters</li>
        <li>Password must include at least 1 number</li>
      </ul>

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
