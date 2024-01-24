import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/hooks/redux';
import { updatePatientThunk } from 'src/store/slices/patient';
import { Button } from 'src/ui/common';
import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';

interface PatientDataProps {
  title: string;
  icon: string;
  param: string | number;
  fieldName: PatientDataFields;
}

type PatientDataFields = 'height' | 'weight' | 'bloodtype';

export function PatientData({ title, icon, param, fieldName }: PatientDataProps) {
  const [isInputShown, setIsInputShown] = useState(false);
  const [paramValue, setParamValue] = useState(param);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ [key: string]: any }>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<{ [key: string]: any }> = data => {
    setIsInputShown(false);
    if (param.toString() !== data[`${fieldName}`]) {
      if (data.hasOwnProperty('height') || data.hasOwnProperty('weight')) {
        data[`${fieldName}`] = +data[`${fieldName}`] || null;
      }
      dispatch(updatePatientThunk(data));
    }
  };

  const patientDataValidation = {
    height: {
      pattern: {
        value: /^[1-9][0-9]([0-9]?)([.][0-9])?$/,
        message: 'Provide two or three-digit number or decimal',
      },
    },
    weight: {
      pattern: /^[1-9]([0-9]?)([0-9]?)([.][0-9])?$/,
    },
    bloodtype: {
      pattern: /^(A|B|AB|O)( )?[+-]$/,
    },
  };

  return (
    <li className='flex gap-2 p-6 pb-4 bg-white  justify-between group rounded-lg md:max-w-[196px]'>
      <div className='flex flex-col gap-2 leading-6 '>
        <p className='text-grey-1'>{title}</p>

        {isInputShown ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              value={paramValue}
              type='text'
              autoFocus
              className='max-w-[40px] outline-none font-medium text-black-1'
              maxLength={6}
              {...register(`${fieldName}`, {
                onBlur: handleSubmit(onSubmit),
                onChange: e => setParamValue(e.target.value),
                ...patientDataValidation[`${fieldName}`],
              })}
            />
            {errors[`${fieldName}`] ? (
              <Icon alt='warning' src={icons.warning} iconColor='fill-red' />
            ) : null}
          </form>
        ) : (
          <div className='flex items-center gap-2'>
            <p className='font-medium text-black-1'>{paramValue || '—'}</p>
            <div className='invisible group-hover:visible'>
              <Button
                variant='flat'
                icon={icons.edit}
                onClick={() => setIsInputShown(true)}
                additionalStyle='hidden hover:display-block'
              ></Button>
            </div>
          </div>
        )}
      </div>
      <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-bg'>
        <Icon src={icon} alt={title} width={24} height={24} />
      </div>
    </li>
  );
}
