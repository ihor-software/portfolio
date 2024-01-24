import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../common/Input/Input';
import { Button } from '../common/Button';
import { registerValidation } from './validation';
import styles from './FindDoctorForm.module.css';
import { SearchIcon } from '../common/Icons/Icons';

export type FindDoctorFormFields = {
  doctorOrSymptom: string;
};

export type FindDoctorFormProps = {
  onSubmit: SubmitHandler<FindDoctorFormFields>;
};

const FindDoctorForm: FC<FindDoctorFormProps> = ({ onSubmit }) => {
  const { handleSubmit, register } = useForm<FindDoctorFormFields>({ mode: 'onSubmit' });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['find-doctor-form']}>
      <SearchIcon />
      <Input
        label=''
        value=''
        placeholder='Search by doctor, symptom'
        {...register('doctorOrSymptom', registerValidation.doctorOrSymptom)}
      />
      <Button type='submit'>Find a doctor</Button>
    </form>
  );
};

export default FindDoctorForm;
