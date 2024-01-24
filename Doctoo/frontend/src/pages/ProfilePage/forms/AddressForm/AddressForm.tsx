import { Input } from 'src/ui/common/Input';
import { Button } from 'src/ui/common/Button';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import Select from 'src/ui/common/Select/Select';
import { useCountries } from '../PersonalInfoForm/useCountries';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'src/hooks/redux';
import { getUser } from 'src/store/slices/auth';
import { selectEditingAddress, editAddress, createAddress } from 'src/store/slices/address';

interface AddressFormProps {
  closeModal: () => void;
}

interface AddressFormInputs {
  country: string;
  city: string;
  street: string;
  appartment: string;
  zipcode: string;
}

export function AddressForm({ closeModal }: AddressFormProps) {
  const { countries, countryNames } = useCountries();
  const user = useSelector(getUser);
  const address = useSelector(selectEditingAddress);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddressFormInputs>({
    defaultValues: {
      country: address?.country.name ?? 'Ukraine',
      city: address?.city ?? '',
      street: address?.street ?? '',
      appartment: address?.appartment ?? '',
      zipcode: address?.zip_code ?? '',
    },
  });

  const countryController = useController({
    name: 'country',
    control,
    rules: {
      required: true,
    },
  });

  const handleReset = () => {
    closeModal();
  };
  const onSubmit: SubmitHandler<AddressFormInputs> = async data => {
    if (!user) return;
    const country = countries.find(country => country.name === data.country);

    const dto = {
      country_code: country?.code ?? 'UA',
      city: data.city,
      street: data.street,
      zip_code: data.zipcode,
      appartment: data.appartment,
      user_id: user.id,
    };

    if (address) {
      dispatch(editAddress({ ...dto, id: address.id }))
        .unwrap()
        .then(closeModal);
    } else {
      dispatch(createAddress(dto)).unwrap().then(closeModal);
    }
  };

  return (
    <form className='flex flex-col gap-6 ' onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
      <h2 className='text-2xl font-medium leading-9'>
        {address ? 'Edit address' : 'Add a new address'}
      </h2>

      <Select
        className='w-full'
        label='Country'
        options={countryNames}
        value={countryController.field.value}
        onChange={countryController.field.onChange}
        error={countryController.fieldState.invalid}
      />

      <Input
        label='City'
        helperText={errors.city?.message}
        error={Boolean(errors.city)}
        {...register('city', {
          required: 'City name is required',
          pattern: {
            value: /^[a-zA-Z ]+$/,
            message: 'City name must contain only latin letters',
          },
        })}
      />

      <Input
        label='Street'
        error={Boolean(errors.street)}
        helperText={errors.street?.message}
        {...register('street', {
          required: 'Street name is required',
          pattern: {
            value: /^[a-zA-Z0-9 ]+$/,
            message: 'Street name must contain only latin letters and numbers',
          },
        })}
      />

      <div className='flex items-start gap-6'>
        <Input
          label='Appartment (optional)'
          {...register('appartment', {
            pattern: { value: /^\d*$/, message: 'Appartment must be a number' },
          })}
          helperText={errors.appartment?.message}
          error={Boolean(errors.appartment)}
        />
        <Input
          label='Zip Code'
          error={Boolean(errors.zipcode)}
          helperText={errors.zipcode?.message}
          {...register('zipcode', {
            required: 'Zipcode is required',
            pattern: {
              value: /^\d{5,}$/,
              message: 'Zipcode must contain only numbers (at least 5)',
            },
          })}
        />
      </div>

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
